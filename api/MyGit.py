from git import Repo

import time


def convert_time(seconds_epoch):
    return time.strftime("%d %b %Y %H:%M", time.gmtime(seconds_epoch))


class MyGit:
    def __init__(self, repo_path) -> None:
        self.repo = Repo(repo_path)

    @staticmethod
    def build_commit_object(commit):
        return {
            "message": commit.message,
            "author_name": commit.author.name,
            "date": convert_time(commit.committed_date),
            "no_files_changed": len(commit.stats.files),
            "author_email": commit.author.email,
            'hexsha': commit.hexsha,
        }

    def get_commit(self, hexsha):
        commit = self.repo.commit(hexsha)
        return self.build_commit_object(commit) if commit else None

    def get_all_branches(self):
        return [
            {"name": h.name, "commits": self.get_commits(h.name)}
            for h in self.repo.heads
        ]

    def get_branch(self, branch_name):
        return list(filter(lambda x: x.get('name') == branch_name, self.get_all_branches()))

    def get_commits(self, ref_name):
        return [
            self.build_commit_object(c)
            for c in self.repo.iter_commits(rev=ref_name)
        ]

    def merge(self, org_branch, dest_branch):
        self.repo.git.checkout(dest_branch)
        dest_branch_obj = self.repo.branches[dest_branch]
        org_branch_obj = self.repo.branches[org_branch]
        root = self.repo.merge_base(org_branch, dest_branch)
        self.repo.index.merge_tree(org_branch, base=root)
        self.repo.index.commit(f'merging {org_branch} into current {dest_branch} branch', parent_commits=(org_branch_obj.commit, dest_branch_obj.commit))
        dest_branch_obj.checkout(force=True)
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from unittest.mock import patch, MagicMock

from gitelements.models import PR

TEST_BRANCHES = [
    {
        "name": "master",
        "commits": [
            {
                "message": "test",
                "author_name": "test",
                "date": "2022-12-12",
                "no_files_changed": "1",
                "author_email": "test",
                "hexsha": "jksd89sdhjksd0",
            },
            {
                "message": "test 2",
                "author_name": "test",
                "date": "2022-12-12",
                "no_files_changed": "5",
                "author_email": "test",
                "hexsha": "dsd2dsdsd",
            },
        ],
    },
    {"name": "dev", "commits": []},
    {"name": "feature", "commits": []},
]


class GutElementsTests(APITestCase):
    @patch("gitelements.views.MyGit")
    def test_list_branches(self, my_git_patch):
        """
        Ensure we can list branches.
        """
        my_git_patch_instance = MagicMock()
        my_git_patch_instance.get_all_branches.return_value = TEST_BRANCHES
        my_git_patch.return_value = my_git_patch_instance

        url = reverse("get-branches")
        response = self.client.get(url)
        self.assertEqual(len(response.json()), 3)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch("gitelements.views.MyGit")
    def test_branch_detail(self, my_git_patch):
        """
        Ensure we can get branch detail.
        """
        my_git_patch_instance = MagicMock()
        my_git_patch_instance.get_branch.return_value = [TEST_BRANCHES[0]]
        my_git_patch.return_value = my_git_patch_instance

        url = reverse("get-branch", kwargs={"name": "master"})
        response = self.client.get(url)
        self.assertEqual(len(response.json().get("commits")), 2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch("gitelements.views.MyGit")
    def test_commit_detail(self, my_git_patch):
        """
        Ensure we can get commit detail.
        """
        my_git_patch_instance = MagicMock()
        my_git_patch_instance.get_commit.return_value = TEST_BRANCHES[0].get("commits")[
            0
        ]
        my_git_patch.return_value = my_git_patch_instance

        url = reverse("get-commit", kwargs={"hexsha": "jksd89sdhjksd0"})
        response = self.client.get(url)
        self.assertEqual(response.json().get("hexsha"), "jksd89sdhjksd0")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_pr(self):
        """
        Ensure we can list prs.
        """
        PR.objects.bulk_create(
            [
                PR(
                    title="Test title 1",
                    description="Test description 1",
                    author="John",
                    org_branch="master",
                    dest_branch="dev",
                    status=1,
                ),
                PR(
                    title="Test title 2",
                    description="Test description 2",
                    author="John",
                    org_branch="feat",
                    dest_branch="dev",
                    status=2,
                ),
                PR(
                    title="Test title 3",
                    description="Test description 3",
                    author="John",
                    org_branch="master",
                    dest_branch="dev",
                    status=3,
                ),
            ]
        )

        url = reverse("pr-list")
        response = self.client.get(url)
        self.assertEqual(len(response.json()), 3)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_create_pr(self):
        """
        Ensure we can create a new pr.
        """
        url = reverse('pr-list')
        data = {'title': 'test name', 'description': 'test description', 'author': 'Test',
                'org_branch': 'master', 'dest_branch': 'dev', 'status': 3}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(PR.objects.count(), 1)
        self.assertEqual(PR.objects.get().title, 'test name')
        self.assertEqual(PR.objects.get().description, 'test description')

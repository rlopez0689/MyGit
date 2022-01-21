# My Git

My git is an API wrapper around the git information of one git repo. In this case is for https://github.com/rlopez0689/fullstack-interview-test, but can be easily change to point to another one.

It includes:

- A view where we can see the existing local branches
- A branch detail view where we can see all the commits to one specific local branch, with commit messages, authors and timestamps.
- A commit detail view where we can see the commit message, timestamp, number of files changed and author names / emails.
- A "PR" create view, where we can choose two branches (base and compare), and merge them together, just like Pull Requests work in Github.
- A "PR" list view, where we see all created PRs and the following info: Author, Title, Description and Status (Open, Closed, Merged). If the status is Open, there should be a button that allows us to mark it as Closed.

## How does it work

When building the docker images it will clone the repository https://github.com/rlopez0689/fullstack-interview-test into the directory ./repo(gitignored) of the proyect. From there we can create, delete, merge branches locally and they will be reflected inmediatly into MyGit.

- Front end created with React(javascript)
- Back end created with Django Rest Framework(python)
- Relational Database (Postgres)

## Installation

You can install and run the web app with docker.

```bash
docker-compose up
```

## Usage

After spinning up the container with docker you will have:

- Front end -> http://localhost:3000
- Back end(Api) -> http://localhost:8000
- Django Admin -> http://localhost:8000/admin/
- DRF Api Branches View -> http://localhost:8000/api/branches/
- DRF Api Branch View -> http://localhost:8000/api/branches/<str:name>
- DRF Api Commits View -> http://localhost:8000/api/commits/<str:hexsha>
- DRF Api PRS View -> http://localhost:8000/api/prs/

## Running Tests

- Back End

```bash
docker exec -it mygit_web_1 python manage.py test
```

- Front End

```bash
docker exec -it mygit_front_1 npm test
```

## Create Djando Admin User

```bash
docker exec -it mygit_web_1 python manage.py createsuperuser
```

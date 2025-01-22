# Bloggers 🤳🏻

## Overview

A space for bloggers to share their knowledge and ideas.

## Table of Contents

- [Bloggers 🤳🏻](#bloggers-)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Technologies](#technologies)
  - [Project Logic](#project-logic)
  - [Installation \& Running](#installation--running)
  - [End-Points](#end-points)
    - [Auth 🛑](#auth-)
    - [Blogs 📃](#blogs-)
    - [Users 🧑🏻](#users-)
    - [DOCS (Swagger) 📰](#docs-swagger-)
  - [Bonuses](#bonuses)
    - [From Task](#from-task)
    - [From Me](#from-me)

## Technologies

- Express.js
- MongoDB & Mongoose
- TS
- Swagger
- Logger by (Winston)

## Project Logic

1- User 🧑🏻

- Register as admin by the email (<admin@gmail.com>)
- Register as user by any email
- Log in to get a token
- Admins can promote a normal user to an admin

2- Blog 📃

- Create a blog by an authorized user
- Get Blog(s)
- Update a Blog by the owner
- Delete a Blog by an admin

## Installation & Running

1. Install MongoDB From [Here](https://www.mongodb.com/try/download/community) (in case you don't have it)

2. Clone the Repository:

```bash
 git clone https://github.com/ALAATARAB/bloggers-task.git
```

3. Install the Dependencies:

```bash
 npm install
```

4. Build and Run:

```bash
 # build
 npm run build

 # run as production
 npm start

 # run as development
 npm run start:dev

```

## End-Points

### Auth 🛑

| HTTP Verbs | Endpoints | Action |
| ---------- | --------- | ------ |
| POST | /api/auth/signup | To create a user OR an admin by (<admin@gmail.com>) |
| POST | /api/auth/login | To log with the email and get a token (in the body "*For Simplicity*") |

### Blogs 📃

| HTTP Verbs | Endpoints | Action |
| ---------- | --------- | ------ |
| POST | /api/blogs | To create a blog by an authorized user |
| GET | /api/blogs | To retrieve blogs |
| PATCH | /api/blogs/:id | To update a blog by the owner |
| DELETE | /api/blogs/:id | To delete a blog by admins only |

### Users 🧑🏻

| HTTP Verbs | Endpoints | Action |
| ---------- | --------- | ------ |
| POST | /api/users/promote | To promote a normal user to an admin by ***admins*** |

### DOCS (Swagger) 📰

| HTTP Verbs | Endpoints | Action |
| ---------- | --------- | ------ |
| GET | /api/docs | To get the full docs about the api end-points |
| GET | /api/docs.json | To get the full data about the api end-points |

## Bonuses

### From Task

1. Add Swagger documentation for the API ✅

2. Implement pagination for GET /blogs. ✅

### From Me

1. Logging to Database ✅

2. Add some extra End-Points ✅

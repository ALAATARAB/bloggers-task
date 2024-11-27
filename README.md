# 🚀 Magic Transporters 🚀

## Overview

In the world of Magic Transporters, there are special people known as Magic
Movers. They use nifty gadgets to move important things. Fueled by virtual magic, these
Movers go on quick missions to carry items around.

## Table of Contents

- [🚀 Magic Transporters 🚀](#-magic-transporters-)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Technologies](#technologies)
  - [Project Logic](#project-logic)
  - [Installation \& Running](#installation--running)
  - [End-Points](#end-points)
    - [Magic Movers 🦸‍♂️](#magic-movers-️)
    - [Magic Items 🎁](#magic-items-)
    - [DOCS (Swagger) 📰](#docs-swagger-)
  - [Bonuses](#bonuses)

## Technologies

- Express.js
- MongoDB & Mongoose
- TS
- Swagger
- Logger by (Winston)
- DI by (tsyringe)

## Project Logic

1- Create Magic Item(s) 🎁

2- Create Magic Mover(s) 🦸‍♂️

- Magic Mover in the (Resting state)

- Load Magic Mover with Magic Items (Loading state)

- Start a Mission (On_Mission state)

- End the Mission (Resting state)

## Installation & Running

1. Install MongoDB From [Here](https://www.mongodb.com/try/download/community) (in case you don't have it)

2. Clone the Repository:

```bash
 git clone https://github.com/ALAATARAB/magic-transporters.git
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

### Magic Movers 🦸‍♂️

| HTTP Verbs | Endpoints | Action |
| ---------- | --------- | ------ |
| POST | /api/magic-movers | To create a magic mover |
| POST | /api/magic-movers/load | To load a magic mover with magic item(s) |
| POST | /api/magic-movers/start-mission/:id | To start a mission with a magic mover |
| POST | /api/magic-movers/end-mission/:id | To end the mission with a magic mover |
| GET | /api/magic-movers/most-completed-missions | To retrieve all magic movers sorted by completed missions (desc) |
| GET | /api/magic-movers/:id | To retrieve a magic mover |

### Magic Items 🎁

| HTTP Verbs | Endpoints | Action |
| ---------- | --------- | ------ |
| POST | /api/magic-items | To create a magic item |
| GET | /api/magic-items/load | To retrieve a magic item |
| PATCH | /api/magic-items/start-mission/:id | To update a magic item |
| DELETE | /api/magic-items/end-mission/:id | To delete a magic item |

### DOCS (Swagger) 📰

| HTTP Verbs | Endpoints | Action |
| ---------- | --------- | ------ |
| GET | /api/docs | To get the full docs about the api end-points |
| GET | /api/docs.json | To get the full data about the api end-points |

## Bonuses

1. Good Readme file ✅

2. Good comments using JSDoc ✅

3. Live documentation using Swagger ✅

4. DI using tsyringe ✅

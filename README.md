# A TODO challenge with Node JS and React

## Requirements
* Node v12.18.4 or later
* Git
* Docker

## Instalation
* Run `git clone https://github.com/daviddguedes/todo-fullstack.git`
* `cd todo-fullstack/`

### Backend
* `cd backend/`
* Run `npm install`
* Run `docker run -it -d --name todo-challenge -p 27017:27017 mongo`
* Create a file .env in backend root folder and set the variables

### Frontend
* `cd frontend/`
* Run `npm install`
* Run `npm start` or `npm build` to production
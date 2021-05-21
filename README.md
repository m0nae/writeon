<h1 align="center">✏️ WriteOn ✏️</h1>
<p align="center">
<img src="https://api.netlify.com/api/v1/badges/708e4652-e7ee-4240-9c82-81c67a52478d/deploy-status?style=for-the-badge" />
</p>

<p align="center">A website for writers.</p>

## ✨ Features
* Create and save notes
* Set a word count goal
* Set a time limit while writing
* Randomly generate words for inspiration

## 💻 Tech Stack
### Frontend
* React/React Hooks
* React Router
* Context API
* CSS Modules
* Apollo Client
### Backend
* GraphQL
* NodeJS
* Express

## 💭 Reflections

Boy oh boy. Developing WriteOn has been quite the learning experience. Despite its minimal exterior, WriteOn has opened my eyes to the true complexity of websites and how the pieces are supposed to fit together. On many occasions, things got a little overwhelming and I couldn’t possibly see myself completing it in its entirety. I figured I'd get bored with it and hop to the next thing. But I’m glad to say that I’ve proven myself wrong, and that it’s now finished! I use the word “finished” lightly here because there will always be features that I want to add to it, or weird little bugs that I’ll catch. But woo hoo, this is something for me to celebrate 🥳

## :house: Local Setup
1. Clone this repo.
2. Navigate to the server folder and install the npm packages: <br />
    ````bash
    cd server && npm i
    ````
3. Create a `.env` file with the following environment variables:
      * `MONGO_USER` for your MongoDB username (you will need a MongoDB database)
      * `MONGO_PASSWORD` for your MongoDB password
      * `CLIENT_DOMAIN` for the domain of the frontend, which should be `localhost:3000`
      * `SECRET_JWT_KEY` for the JWT
      * `PORT` for the port in which the server will run
4. Go to `config/db.js` and change the connect string to your own database's connect string
5. Start the server
    ````bash
    npm start
    ````
6. Open another terminal, navigate to the client folder, and install the npm packages:
    ````bash
    npm i
    ````
7. After the packages are done installing, fire it up. The following environment variables are needed:
    * `REACT_APP_SERVER_DOMAIN` which is the URL of the server you just started
    * `REACT_APP_CLIENT_DOMAIN` which is the URL of the client, which should be `localhost:3000`
    ````bash
    REACT_APP_SERVER_DOMAIN=SERVERDOMAINHERE REACT_APP_CLIENT_DOMAIN=http://localhost:3000 npm start
    ````
8. Open up the website at `http://localhost:3000`

## ⚖️ License
![GitHub](https://img.shields.io/github/license/m0nae/writeon?logo=RTEsfdT&style=for-the-badge)

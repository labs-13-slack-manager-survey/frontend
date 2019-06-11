# Stand-Em-Ups
## Contributors

|                                      [Ben Tsao](https://github.com/cbtsao47)                                     |                                           [Erica Chen](https://github.com/erica-y-chen)                                             |                                          [Mckay Wrigley](https://github.com/mckaywrigley45)                                              |                                      [Curtis Hubbard](https://github.com/chubbard022)                                         |     [Taylor Blount](https://github.com/thirdeyeclub)    |
| :-----------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: | :---: |
|  [<img src="https://avatars2.githubusercontent.com/u/16598376?s=400&v=4" width = "200" />](github.com/cbtsao47)  |          [<img src="https://avatars0.githubusercontent.com/u/47537927?s=400&v=4" width = "200" />](https://github.com/erica-y-chen)          |              [<img src="https://avatars3.githubusercontent.com/u/29221284?s=400&v=4" width = "200" />](https://github.com/mckaywrigley45)               |  [<img src="https://avatars2.githubusercontent.com/u/16605573?s=460&v=4" width = "200" />](https://github.com/chubbard022)  |[<img src="https://avatars2.githubusercontent.com/u/45549491?s=400&v=4" width="200"/>](https://github.com/thirdeyeclub)
|                  [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/cbtsao47)                   |                          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/erica-y-chen)                           |                        [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/mckaywrigley45)                        |                   [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/chubbard022)                   |[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/thirdeyeclub)
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/cbtsao/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/eyufanchen/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/mckay-wrigley-05b496166/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/curtis-hubbard-945764158/) |

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![React](https://img.shields.io/badge/react-v16.7.0--alpha.2-blue.svg)
![Netlify Status](https://api.netlify.com/api/v1/badges/b5c4db1c-b10d-42c3-b157-3746edd9e81d/deploy-status)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Project Overview
Stand-Em-Ups is an application that helps managers run their daily standup reports asynchronously to help maximize efficiency and let team members submit their reports any time during the day. Our application will help the whole team and best of all, it is completely free to start!

You can find the project at [https://stand-em-ups.netlify.com](https://stand-em-ups.netlify.com).
### Key Features
    * Create teams and have admin controls
    * Sending out Daily Standup reports to team members
    * Connecting your team with slack
    * Asynchronous Stand reports
## Tech Stack
### Front end built using:
    * @blueprintjs/core
    * @date-io/date-fns
    * @firebase/app
    * @firebase/auth
    * @fortawesome/fontawesome-svg-core
    * @fortawesome/free-brands-svg-icons
    * @fortawesome/react-fontawesome
    * @material-ui/core
    * @material-ui/icons
    * @material-ui/pickers
    * axios
    * date-fns
    * firebase
    * intro.js
    * intro.js-react
    * jstz
    * jwt-decode
    * material-ui-chip-input
    * material-ui-pickers
    * moment
    * moment-timezone
    * react
    * react-dates
    * react-dom
    * react-firebaseui
    * react-router-dom
    * react-scripts
    * react-scroll
    * styled-components

#### Front end deployed to `Netlify`
### [Back end](https://github.com/labs12-slack-standup/labs12-slack-standup-BE) built using:
    * @sendgrid/mail
    * @sentry/node
    * axios
    * bcryptjs
    * body-parser
    * cors
    * date-fns
    * dotenv
    * express
    * faker
    * firebase-admin
    * helmet
    * jsonwebtoken
    * jstz
    * knex
    * knex-cleaner
    * moment
    * moment-timezone
    * morgan
    * node-cron
    * pg
    * qs
    * sqlite3
    * tsscmp
    * uuidv4

# APIs
## Firebase Auth
Stand-Em-Ups is using Firebase Auth for our OAuth implementation. There is no native login/signup method in our application.
## Slack API
Stand-Em-Ups is using the Slack API for OAuth to connect the team to the workspace so that our application can send the reports as a DM. To send the DM we are using webhooks made available from the Slack Interactive Components website.

# Environment Variables
In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

    *  REACT_APP_API_KEY - this is your Google API key, which can be generated in the Google Cloud Console
    *  REACT_APP_AUTH_DOMAIN - when you set up your Firebase project, this information will be in the dashboard
    *  REACT_APP_BASE_URL - in the Firebase dashboard
    *  REACT_APP_SLACK_URL - this is the url/api/slack endpoint
   
# Installation Instructions
Install all dependencies by running `yarn install`

## Other Scripts

    * build - `yarn build`
    * start - `yarn start`

# Contributing
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.
Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.
## Issue/Bug Request
    * If you are having an issue with the existing project code, please submit a bug report under the following guidelines:
    * Check first to see if your issue has already been reported.
    * Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
    * Create a live example of the problem.
    * Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.
## Feature Requests
We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.
## Pull Requests
If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.
Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.
### Pull Request Guidelines
    * Ensure any install or build dependencies are removed before the end of the layer when doing a build.
    * Update the README.md with details of changes to the interface, including new environment variables, exposed ports, useful file locations and container parameters.
    * Ensure that your code conforms to our existing code conventions and test coverage.
    * Include the relevant issue number, if applicable.
    * You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.
### Attribution
These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).
## Documentation
See [Backend Documentation](https://github.com/labs12-slack-standup/labs12-slack-standup-BE) for details on the backend of our project.



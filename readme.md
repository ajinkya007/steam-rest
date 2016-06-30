About this project
==================

This project contains a set of examples and tests for the RESTful API for the sTeam server.

The code is written in coffeescript and needs node.js only for coffeescript translation.  
Deployment can be done as static javascript files, and does not need any kind of dynamic server for the front-end.

The back-end is a RESTful API written for the sTeam server as used by techgrind.asia


Development instructions
========================

step 1: install node.js

    http://nodejs.org/download/


step 2: clone the repo

    git clone https://github.com/societyserver/steam-rest


step 3: install node packages:

    npm install

This installs all dependencies (including coffee) for our project into  the project's node_modules directory based on the 'package.json' file

Install angular.js and other angular packages.

    bower install angular
    bower install angular-ui-router
    bower install angular-bootstrap
    bower install bootstrap    

step 4: start the server

    node_modules/.bin/coffee scripts/server.coffee


but for convenience we can install coffee in the global node environment:

    npm install -g coffee-script


so we can just say

    coffee scripts/server.coffee

If the server is working you'll see:

    Listening on port 7000


How to contribute your changes
==============================

Fork the project on github

Clone the forked project to your computer

    git clone https://github.com/<your name>/steam-rest

Follow the instructions above to set up your environment

When you are properly set up you should be able to load http://localhost:8000/ in your browser

each example should be a standalone application, so copy one example, and modify it.

Push changes to your repo frequently.

When ready please file a merge request or notify the project developers about your contribution


=======
Testing
=======

[FrisbyJS](http://frisbyjs.com/) is used to test the API. It is run through [Jasmine](http://jasmine.github.io/) and is based on [nodejs](http://nodejs.org/).

Once you have nodejs installed, run the following statement to install Frisby and Jasmine:

```
npm install jasmine-node frisby
```

Then execute the test by:

```
cd project/directory
jasmine-node test/
```

# Chatr
The first CSC Project Series project. A Chat program to teach the basics of networking

Now with Slack integration

# Proposed file structure

```
routes // This will contain route files for the app.
views // This will contain our react views.
node_modules // installed packages for node. do not touch.
package.json // for heroku and node dependency management.
server.js //This file starts the app. It is the entry point.
```
# Stack
Node + Express as the backend.

React.js for the views layer.

MongoDB instance running on MongoLab as the database.

# Usage
Our app should be deployed on Heroku.

For local deployment, in your terminal:

```sh
$ git clone https://github.com/BrockCSC/Chatr
$ cd Chatr
$ npm install
$ npm start
```

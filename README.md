## Voucherify React Demo Store - "Hot Beans"

![Heroku](https://heroku-badge.herokuapp.com/?app=voucherify-hot-beans)

for production mode you should run in the project directory

Add your `Application ID` and `Application Secret Key` to your environment variables. We're using Heroku Redis to set up client sessions. Provide `REDIS_URL` to your environment settings.

if you're using Heroku set add Redis extension and set up variables:

PORT=3000
REACT_APP_APPLICATION_ID="YOUR APPLICATION ID"
REACT_APP_CLIENT_SECRET_KEY="YOUR SECRET KEY"
REACT_APP_API_URL="YOUR APP URL"

Then run `npm install` to set up the Application. After that, run `npm run setup` to create Campaigns, Products Validation Rules, and Validation Rules assignment.

Validation rules based on the customer segment are created when a new user enters the site.

Remember to add `Your website URL` or `*` to Client-side Settings of your project.

After setting up run:

`npm start`

and the entire app is served from port 3000

for development mode you now need to run two processes (i.e. 2 terminal tabs):

`npm run dev-server`

this will start your server at localhost:3000 (it'll restart automatically upon any changes in server.js)

`npm run dev`

this will start react-scripts server at localhost:3001 => which is how you open up the app in the browser

# Voucherify React Demo Store - "Hot Beans" [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Simple react demo store for showcasing Voucherify abilities. 

* Store is connected directly to your Voucherify account
* Setup script sets up dummy products, validation rules, vouchers and campaigns
* Each new visit creates three customers based on preset
* You can track your demo store orders directly in Voucherify dashboard

## Heroku installation

Add your Voucherify `Application ID` and `Application Secret Key` for both your Application Keys and Client-side Keys to your environment variables. We're using Heroku Redis to store client sessions - provide 
`REDIS_URL` to your environment variables or use another method to store session data.

Your environment variables should look like this:

* REDIS_URL="YOUR REDIS URL"
* REACT_APP_BACKEND_APPLICATION_ID="YOUR 'Application Keys' APPLICATION ID"
* REACT_APP_BACKEND_CLIENT_SECRET_KEY="YOUR 'Application Keys' SECRET KEY"
* REACT_APP_FRONTEND_APPLICATION_ID="YOUR 'Client-side Keys' APPLICATION ID"
* REACT_APP_FRONTEND_CLIENT_SECRET_KEY="YOUR 'Client-side Keys' SECRET KEY"


The fastest way to install the demo store is to clone this project, set up a Heroku web application, add Heroku Redis extension, and then configure environment variables. After that, you can deploy this cloned store directly into your Heroku web application.

After deployment, the script runs post-install where it populates your Voucherify account with custom products, validation rules, campaigns, and vouchers.

## Local installation

In the project folder run, `npm install` to set up the Application. After that, the app runs postinstall script to create Campaigns, Products Validation Rules, and Validation Rules assignment.

After setting up run `npm start` to serve the entire application from port 3000

## Local development mode

for development mode you now need to run two processes (i.e. 2 terminal tabs):

* `npm run dev-server` - this will start your server at localhost:3000 (it will restart automatically upon any changes in server.js)
* `npm run dev` - this will start the react-scripts server at localhost:3001 (which is how you open up the app in the browser)

## Usage

* Select customer and try out some of the validation rules
* Check out your Voucherify dashboard to track your costumer's orders
* Check out `src/components/Context.js`, `src/components/CustomerContext.js` and `server.js` to learn more about how we use Voucherify API to validate and redeem coupons and process payments.

## Important information

Remember to add `Your website URL` or `*` to Client-side Settings of your project in Voucherify.

## Errors

Feel free to contact me regarding any demo store issues - piotr.gacek[at]voucherify.io
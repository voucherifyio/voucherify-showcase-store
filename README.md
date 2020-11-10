# Voucherify Showcase Store - "Hot Beans" [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/voucherifyio/voucherify-showcase-store/)

[Documentation](https://docs.voucherify.io/docs/welcome) | [API Reference](https://docs.voucherify.io/reference) | [Help Center](https://support.voucherify.io) | [Installation](#installation) | [Local installation](#local-installation) | [Local development](#local-development) | [Usage](#usage) | [Errors](#errors) | [Changelog](#changelog)

Simple react demo store for showcasing Voucherify abilities.

- Store is connected directly to your Voucherify account
- Setup script sets up dummy products, validation rules, vouchers, and campaigns
- Each new visit creates three customers based on preset
- You can track your demo store orders directly in the Voucherify dashboard
- Create coupons and campaigns in the dashboard and use them in the demo store

## Installation

In your Project Dashboard, navigate to your Project Settings.

![Navigate to Project Settings](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/ProjectSettings.png 'Project Settings')

Create new Webhook endpoint with target URL: `https://YOUR_APP_URL/webhooks`.

![Create new Webhook](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/CreateWebhook.png 'Webhook')

If you are using a local development server, set up tunneling of your app with [Ngrok](https://ngrok.com/) - use `./ngrok http localhost:3000` and then paste forwarded https address as `YOUR_APP_URL`.

![Ngrok forwarded address](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/Ngrok.png 'Ngrok')

Select webhook events: `voucher.published` and `customer.rewarded` and click `Create endpoint`.

![Prepared Webhook](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/PreparedWebhook.png 'Webhook')

Next, copy your Voucherify `Application ID` and `Application Secret Key` for both Application Keys and Client-side Keys to your environment variables:

![Getting Application Keys](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/ServerSide.png 'Application Keys')

![Getting Client-side Keys](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/ClientSide.png 'Client-side Keys')

Stay on the same page and scroll down to Client-side Settings section. Set `*` as Your Website URL.

![Setting Website URL](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/URL.png 'Setting Website URL')

We're using Heroku Redis to store client sessions - provide
`REDIS_URL` to your environment variables or use another method to store session data.

Your environment variables should look like this:

- `REDIS_URL`="Your REDIS url"
- `REACT_APP_BACKEND_APP_ID`="Your 'Application Keys' Application ID"
- `REACT_APP_BACKEND_KEY`="Your 'Application Keys' Secret Key"
- `REACT_APP_FRONTEND_APP_ID`="Your 'Client-side Keys' Application ID"
- `REACT_APP_FRONTEND_KEY`="Your 'Client-side Keys' Secret KEY"

The fastest way to install the demo store is to use the 'Deploy to Heroku' button and providing required environment variables.

After deployment, the script runs post-install, where it populates your Voucherify account with custom products, validation rules, campaigns, and vouchers.

If you want to use an integrated Referral Campaign, you need to create Reward Tiers. Learn more at [Enabling Referral Campaign](#enabling-referral-campaign)

## Local installation

In the project folder run, `npm install` to set up the application. After that, the app runs a postinstall script to create Campaigns, Products Validation Rules, and Validation Rules assignment.

After setting up, run `npm start` to serve the entire app from port 3000.

## Local development

You now need to run two processes (i.e., 2 terminal tabs):

- `npm run dev-server` - this will start your server at localhost:3000 (it will restart automatically upon any changes in server.js)
- `npm run dev` - this will start the react-scripts server at localhost:3001 (which is how you open up the app in the browser)

## Usage

- Select customer and try out some of the validation rules
- Check out your Voucherify dashboard to track your costumer's orders
- Check out `src/redux/actions/cartActions.js` and `server/server.js` to learn more about how we use Voucherify API to validate and redeem coupons and process payments.

### Creating own Vouchers and Campaigns

To see campaigns in the demo store, you need to add required and optional campaign metadata for the shop to operate without issues.

#### Validation rules

You need to manually create and assign validation rules to your campaigns to make them work in the demo store.

#### Voucher (Public codes)

Voucher settings:

- `Campaign Type`: DISCOUNT VOUCHERS
- `Category`: Hot Beans
- `Program Size`: STANDALONE CODE

Voucher metadata (optional):

| Key                | Type   | Description                                     |
| ------------------ | ------ | ----------------------------------------------- |
| `name`             | string | Name of your voucher                            |
| `description`      | string | Simple description of your voucher              |
| `redemption_steps` | string | Steps to validate this voucher Separated by `;` |

#### Campaign (Personal codes)

Campaign settings:

- `Campaign Type`: DISCOUNT VOUCHERS
- `Program Size`: BULK CODES

Campaign metadata (optional):

| Key                       | Type   | Description                                                                           |
| ------------------------- | ------ | ------------------------------------------------------------------------------------- |
| `description`             | string | Simple description of your voucher                                                    |
| `carousel_banner_img_url` | string | Image displayed as background in the main carousel.                                   |
| `img_url`                 | string | Image with description on the main carousel on the product page.                      |
| `promotion_product`       | string | Exact name of the product which should have the label "Promotion" on the main page.   |
| `discount_suffix`         | string | e.g: '1x Hard Beans' - displays name of product after discount amount in the Sidebar. |
| `redemption_steps`        | string | Steps to be able to validate this campaign properly.Separated by `;`                  |

#### Campaign - Cart Discounts (Cart discounts)

Campaign settings:

- `Campaign Type`: PROMOTION

Discount Level metadata:

| Key                  | Type   | Description                                                                                            |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------ |
| `qualification_name` | string | Name to be displayed in the Sidebar `Qualifications`. Otherwise, qualification will not display itself |
| `discount_suffix`    | string | e.g: '1x Hard Beans' - displays name of discounted product on the Sidebar                              |
| `redemption_steps`   | string | Steps to be able to validate this campaign properly.Separated by `;`                                   |

Campaign metadata:

| Key                       | Type   | Description                                                                         |
| ------------------------- | ------ | ----------------------------------------------------------------------------------- |
| `description`             | string | Simple description of your voucher                                                  |
| `carousel_banner_img_url` | string | Image displayed as background in the main carousel.                                 |
| `img_url`                 | string | Image with description on the main carousel on the product page.                    |
| `promotion_product`       | string | Exact name of the product which should have the label "Promotion" on the main page. |

## Enabling Referral Campaign

Creating a complete Referral Campaign with tier rewards & validation rules is not yet possible through API. That's why to use our predefined Referral Campaign, we need to set this up through the dashboard.

All other necessary elements for this first Referral Campaign - Rewards, Rewards Assignments, and Validation Rules - are created during the demo store setup. We need to create two Referral Campaigns Tiers and connect each tier with available rewards.

- Firstly, navigate to the Referral Campaign details and then select the Rewards tab. Click `Edit` on the Referrer reward section.

- Create New Tier

- Set `Numbers of referees who redeemed the referral code is` to 1 and `Total count of customer orders` to exactly 0.

- On the next page, select reward `Referral Campaign Tier 1 - Reward` and click `Add reward`.

- Then click `Done`.

Repeat this process one more time - this time selecting reward `Referral Campaign Tier 2 - Reward`. Remember to save changes to the campaign.

[Learn more how to create Referral Program](https://cookbook.voucherify.io/article/240-airbnb-referral-program)

## Errors

Feel free to contact me regarding any demo store issues - piotr.gacek[at]voucherify.io

## Changelog

Project changelog can be found [here](/CHANGELOG.md)

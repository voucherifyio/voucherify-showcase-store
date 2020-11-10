
# Voucherify Showcase Store - "Hot Beans" [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/voucherifyio/voucherify-showcase-store/)

[Documentation](https://docs.voucherify.io/docs/welcome) | [API Reference](https://docs.voucherify.io/reference) | [Help Center](https://support.voucherify.io) | [Installation](#installation) | [Local installation](#local-installation) | [Local development](#local-development) | [Usage](#usage) | [Errors](#errors) | [Changelog](#changelog)

Simple react demo store for showcasing Voucherify abilities.

- Store is connected directly to your Voucherify account
- Setup script sets up dummy products, validation rules, vouchers and campaigns
- Each new visit creates three customers based on preset
- You can track your demo store orders directly in Voucherify dashboard
- Create vouchers and campaigns in dashboard and use them in the demo store

## Installation

In your Project Dashboard navigate to your Project Settings.

![Navigate to Project Settings](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/ProjectSettings.png 'Project Settings')

Create new Webhook endpoint with target URL: `https://YOUR_APP_URL/webhooks`

![Create new Webhook](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/CreateWebhook.png 'Webhook')

If you are using local development server, set up tunelling of your app with [Ngrok](https://ngrok.com/) - use `./ngrok http localhost:3000` and then paste forwarded https address as `YOUR_APP_URL`.

![Ngrok forwarded address](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/Ngrok.png 'Ngrok')

Select webhook events: `voucher.published` and `customer.rewarded`

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

The fastest way to install the demo store is use 'Deploy to Heroku' button and providing requried enviroment variables.

After deployment, the script runs post-install where it populates your Voucherify account with custom products, validation rules, campaigns, and vouchers.

If you want to use integrated Referral Campaign, you need to create Reward Tiers. Learn more at [Enabling Referral Campaign](#enabling-referral-campaign)

## Local installation

In the project folder run, `npm install` to set up the Application. After that, the app runs postinstall script to create Campaigns, Products Validation Rules, and Validation Rules assignment.

After setting up run `npm start` to serve the entire application from port 3000

## Local development

You now need to run two processes (i.e. 2 terminal tabs):

- `npm run dev-server` - this will start your server at localhost:3000 (it will restart automatically upon any changes in server.js)
- `npm run dev` - this will start the react-scripts server at localhost:3001 (which is how you open up the app in the browser)

## Usage

- Select customer and try out some of the validation rules
- Check out your Voucherify dashboard to track your costumer's orders
- Check out `src/redux/actions/cartActions.js` and `server/server.js` to learn more about how we use Voucherify API to validate and redeem coupons and process payments.

### Creating own Vouchers and Campaings

To see campaings in the demo store you need to add required and optional campaing metadata - in order for shop to operate without issuess.

#### Validation rules

You need to manually create and assign validation rules to your campaings in order to make them work in the demo store.

#### Voucher (Public codes)

Voucher settings

- `Campaign Type`: DISCOUNT VOUCHERS
- `Category`: Hot Beans
- `Program Size`: STANDALONE CODE

Voucher metadata (optional)

| Key                | Type   | Description                                     |
| ------------------ | ------ | ----------------------------------------------- |
| `name`             | string | Name of your voucher                            |
| `description`      | string | Simple description of your voucher              |
| `redemption_steps` | string | Steps to validate this voucher Separated by `;` |

#### Campaign (Personal codes)

Campaign settings

- `Campaign Type`: DISCOUNT VOUCHERS
- `Program Size`: BULK CODES

Campaign metadata (optional)

| Key                       | Type   | Description                                                                                 |
| ------------------------- | ------ | ------------------------------------------------------------------------------------------- |
| `description`             | string | Simple description of your voucher                                                          |
| `carousel_banner_img_url` | string | Image which will be displayed as background in the main carousel.                           |
| `img_url`                 | string | Image which will be displayed with description on the main carousel on in the product page. |
| `promotion_product`       | string | Exact name of the product which should be labeled as "Promotion" on main page.              |
| `discount_suffix`         | string | e.g: '1x Hard Beans' - displays name of product after discount amount in the Sidebar.       |
| `redemption_steps`        | string | Steps to be able to properly validate this campaign Separated by `;`                        |

#### Campaign - Cart Discounts (Cart discounts)

Campaign settings

- `Campaign Type`: PROMOTION

Discount Level metadata

| Key                  | Type   | Description                                                                                        |
| -------------------- | ------ | -------------------------------------------------------------------------------------------------- |
| `qualification_name` | string | Name to be displayed in the Sidebar `Qualifcations`. Otherwise qualification will not be displayed |
| `discount_suffix`    | string | e.g: '1x Hard Beans' - displays name of discounted product on the Sidebar                          |
| `redemption_steps`   | string | Steps to be able to properly validate this campaign Separated by `;`                               |

Campaign metadata

| Key                       | Type   | Description                                                                                      |
| ------------------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `description`             | string | Simple description of your voucher                                                               |
| `carousel_banner_img_url` | string | Image which will be displayed as background in the main carousel.                                |
| `img_url`                 | string | Image which will be displayed together with description on main carousel on in the product page. |
| `promotion_product`       | string | Exact name of the product which should be labeled as "Promotion" on main page.                   |

## Enabling Referral Campaign

Creating complete Referral Campaign with tier rewards & validation rules is not yet possible through API. That's why to fully use our predefined Referral Campaign we need to set this up through dashboard.

All other necessary elements for this first Referral Campaign - Rewards, Rewards Assigments and Validation Rules - are created during demo store setup. We just need to create two Referral Campaigns Tiers and connect each tier with available reward.

This first Referral Campaign will be reflected in the Navigation bar.

Firstly, navigate to the Referral Campaign details and then to the Rewards tab. Click `Edit` on the Referrer reward section.

![Campaign Details](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/CampaignDetails.png 'Campaign Details')

Create New Tier

![Create New Tier](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/CreateNewTier.png 'Create New Tier')

Name it however you want. Set `Numbers of referees who redeemed the referral code is` to 1 and `Total count of customer orders` to exactly 0.

![Setup Tier](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/SetupTier.png 'Setup Tier')

On the next page select reward `Referral Campaign Tier 1 - Reward` and click `Add reward`.

![Add Reward](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/AddReward.png 'Add Reward')

On the next page click `Done`.

![Distribution](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/Distribution.png 'Distribution')

You have just created first Referral Campaign reward tier. You just need to create last one. Select `Create New Tier` once again.

![Second Tier](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/SecondTier.png 'Second Tier')

Name it however you want. Set `Numbers of referees who redeemed the referral code is` to 3 and `Total count of customer orders` to exactly 0.

![Setup Second Tier](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/SetupTier2.png 'Setup Second Tier')

On the next page select reward `Referral Campaign Tier 2 - Reward` and click `Add reward`.

![Add Second Reward](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/AddReward2.png 'Add Second Reward')

On the next page click `Done`.

![Distribution](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/Distribution2.png 'Distribution')

After all, remember to save your Referral Campaign.

![Save changes](https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/instructions/SaveCampaign.png 'Save changes')

## Errors

Feel free to contact me regarding any demo store issues - piotr.gacek[at]voucherify.io

## Changelog

Project changelog can be found [here](/CHANGELOG.md)

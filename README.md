<div style="display: flex;justify-content:center;">
    <img src="./docs/logo.png">
</div>

## Overview

This repository can give you a head start in creating your application with an as **low-code** experience as possible.

- An authentication and user management system using [Clerk](https://clerk.dev)
- A main data store with [Airtable](https://airtable.com/)
- A server-side RESTful API with authentication using [Next.js API routes](https://nextjs.org/docs/api-routes/introduction)
- Redirect payments using Stripe Checkout
- React shopping cart hooks courtesy of [use-shopping-cart](https://useshoppingcart.com/)

### More Technical Capabilities

- Fully customizable and themable interfaces using [Chakra-UI](https://chakra-ui.com/)
- SSR capabilities using [Next.js](https://nextjs.org/) as the base framework
- [TypeScript](https://typescriptlang.org) as the language of choice
- Typed resource forms with [react hook form](https://react-hook-form.com/)

## Implementation Details

This starter borrows heavily from the following two projects:

- [Next.js + Clerk + Airtable starter framework](https://github.com/clerkinc/starter-framework) by Clerk Inc
- [Next.js + Stripe example repo](https://github.com/vercel/next.js/tree/canary/examples/with-stripe-typescript) by Vercel

### Configuration

A number of environment variables need to be set for the app to function properly.

Locally, they can be set in your `.env.local` file, whereas for production please consult the documentation corresponding to your deployment platform.

#### For Clerk

|            variable            |                            usage                            |                              where to obtain                               |
| :----------------------------: | :---------------------------------------------------------: | :------------------------------------------------------------------------: |
| NEXT_PUBLIC_CLERK_FRONTEND_API | uniquely identifies your instance to the Clerk Frontend API | Navigate to Application > Instance > Instance configuration > Frontend API |
|         CLERK_API_KEY          |    enables authenticated access to the Clerk Server API     |          Navigate to Application > Instance > Settings > API keys          |

#### For Airtable

|     variable     |                      usage                       |                                   where to obtain                                    |
| :--------------: | :----------------------------------------------: | :----------------------------------------------------------------------------------: |
| AIRTABLE_API_KEY | enables authenticated access to the Airtable API |        Navigate to [your account](https://airtable.com/account), copy API key        |
| AIRTABLE_BASE_ID |    identifies a specific Airtable (data)base     | Navigate to workspace, copy `base_id` part of URL (`https://airtable.com/:base_id/`) |

#### For Stripe

|              variable              |                         usage                         |                                                                     where to obtain                                                                      |
| :--------------------------------: | :---------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------: |
|         STRIPE_API_VERSION         |    specify Stripe API version (e.g. `2020-08-27`)     | Navigate to the [test](https://dashboard.stripe.com/test/developers) or [production](https://dashboard.stripe.com/developers) developer overview section |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | uniquely identifies an app to the Stripe Frontend API |         Navigate to the [test](https://dashboard.stripe.com/test/apikeys) or [production](https://dashboard.stripe.com/apikeys) API key section          |
|         STRIPE_SECRET_KEY          | enables authenticated access to the Stripe Server API |         Navigate to the [test](https://dashboard.stripe.com/test/apikeys) or [production](https://dashboard.stripe.com/apikeys) API key section          |
|       STRIPE_WEBHOOK_SECRET        | used for verifying the signature of incoming webhooks |        Navigate to the [test](https://dashboard.stripe.com/test/webhooks) or [production](https://dashboard.stripe.com/webhooks) webhooks section        |

#### Miscellaneous ENV variables

|           variable            |  usage   |
| :---------------------------: | :------: |
|     NEXT_PUBLIC_CURRENCY      | e.g. USD |
| NEXT_PUBLIC_SUBSCRIPTION_COST | e.g. 20  |

### Routes

The following routes have been set up to provide the necessary functionality for this sample app.

#### Pages

|       route        |                                 usage                                 |            requires authentication?            |
| :----------------: | :-------------------------------------------------------------------: | :--------------------------------------------: |
|         /          |                               home page                               |                       no                       |
| /use-shopping-cart |                         shopping cart example                         | no, but to check out one needs to be signed in |
|   /subscription    |                         subscription example                          | no, but to check out one needs to be signed in |
|      /result       | diplays stripe checkout result after stripe redirects back to the app |                      yes                       |

#### API

|                  route                   |                                                           usage                                                           |       requires authentication?       |
| :--------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: | :----------------------------------: |
|     POST /api/checkout_sessions/cart     |                     creates a new checkout session for initiating a purchase using the shopping cart                      |                 yes                  |
| POST /api/checkout_sessions/subscription |                           creates a new checkout session for initiating a subscription purchase                           |                 yes                  |
|      GET /api/checkout_sessions/:id      | retrieves a stripe checkout session by id, useful for checking the payment status after Stripe redirects back to your app |                 yes                  |
|            GET /api/products             |                                                  retrieves product list                                                   |                  no                  |
|        POST /api/webhooks/stripe         |                                          handles incoming Stripe webhook events                                           | no (but verifies webhook signatures) |

### Airtable data setup

The provided shopping cart example requires one to create a `Products` resource in Airtable with the following fields:

- **Name** - Single text line
- **Description** - Single text line
- **SKU** - Single text line
- **Price** - Number
- **Images** - Attachment

You can of course customize this to your heart's content for your own use case.

Remember to adapt the corresponding views that render products accordingly so that your fields are displayed properly.

### Running locally

To install all dependencies:

```
yarn install
```

To run locally:

```
yarn dev
```

The application will be available on http://localhost:3000.

### Webhooks

Stripe needs to know which endpoint to notify for webhooks.

This can be configured on the [test](https://dashboard.stripe.com/test/webhooks) or [production](https://dashboard.stripe.com/webhooks) webhooks section.

Locally, for convenience, the stripe CLI can be used to register a webhook on demand and tunnel incoming webhooks to your local webhook endpoint.

```
stripe login
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

After running these commands the CLI will output a "webhook signing key".

This needs to be set to the `STRIPE_WEBHOOK_SECRET` environment variable.

### Customization

This starter app tries not to be too opinionated.

We look forward to seeing the great apps you can create based off this template.

Some ideas for extending this starter to build your own e-commerce / service app:

- define your products / subscriptions on Stripe & use that as a product catalog instead
- product variants
- product image galleries
- stock tracking
- orders
- order products (line items)
- order fulfilment after payment has been confirmed
- order progress notifications
- more subscription options
- refunds

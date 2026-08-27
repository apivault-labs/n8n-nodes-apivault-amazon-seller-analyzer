# n8n-nodes-apivault-amazon-seller-analyzer

An [n8n](https://n8n.io) community node for **Amazon Seller Analyzer**, powered by the [`apivault_labs/amazon-seller-revenue-strategy-analyzer` Apify Actor](https://apify.com/apivault_labs/amazon-seller-revenue-strategy-analyzer).

Amazon Seller Analyzer estimates competitor sales and revenue by day, month, and year. Run fast bulk seller analysis with no Amazon login or cookies required, product-level ranges, Buy Box signals, strategy tracking, JSON/CSV/Excel exports, and API access. $5/1K products plus $0.01/run.

The node is a thin connector: collection, analysis, retries and billing run in the hosted Actor. It contains no private scraper implementation or embedded credentials.

## Installation

1. Open **Settings → Community Nodes** in your n8n instance.
2. Select **Install**.
3. Enter `n8n-nodes-apivault-amazon-seller-analyzer` and confirm.

## Credentials

Create an **Apify API** credential in n8n and paste your personal token from [Apify Console → Integrations](https://console.apify.com/account/integrations). The token is sent to Apify as a bearer credential and is never bundled with this package.

## Usage

Add **Amazon Seller Analyzer** to a workflow, fill the public Actor inputs below, and execute the node. Every Dataset result becomes one n8n item, so it can flow into Sheets, databases, CRMs, alerts or your own code. The node respects n8n's **Continue On Fail** behavior.

| Input | Type | Description |
|---|---|---|
| `sellerUrls` | `array` | Add Amazon seller profile URLs that contain a seller parameter, for example an /sp?seller=... URL. |
| `sellerIds` | `array` | Add Amazon merchant IDs directly. A seller ID normally contains 13–14 uppercase letters and numbers. |
| `marketplace` | `string` | Choose the marketplace where the seller operates. This controls catalog discovery, local prices, and output currency. |
| `maxProductsPerSeller` | `integer` | Maximum number of unique products analyzed for each seller. Billing applies only to products successfully analyzed. |
| `includeOffers` | `boolean` | Inspect publicly visible offer and Buy Box information for better attribution of listing demand to the target seller. |
| `trackStrategy` | `boolean` | Save an observation baseline and compare visible price, rank, availability, promotion, and seller-position signals on later runs. |
| `maxConcurrency` | `integer` | Number of products processed in parallel. The load-tested value balances speed and marketplace reliability. |
| `proxyConfiguration` | `object` | Apify Residential Proxy is recommended for reliable marketplace access. Proxy traffic is billed by Apify as platform usage. |

## Pricing

The package is free. Actor runs are billed by Apify using the pricing shown on the [Actor page](https://apify.com/apivault_labs/amazon-seller-revenue-strategy-analyzer); platform usage may also apply.

## Resources

- [Actor and live input schema](https://apify.com/apivault_labs/amazon-seller-revenue-strategy-analyzer)
- [Source repository](https://github.com/apivault-labs/n8n-nodes-apivault-amazon-seller-analyzer)
- [n8n community-node documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

MIT. The hosted Actor is a separate paid service governed by Apify terms.

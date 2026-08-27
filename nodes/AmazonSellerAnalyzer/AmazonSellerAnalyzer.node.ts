import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
	IRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

const ACTOR_ID = 'apivault_labs~amazon-seller-revenue-strategy-analyzer';

export class AmazonSellerAnalyzer implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Amazon Seller Analyzer',
		name: 'amazonSellerAnalyzer',
		icon: 'file:amazonselleranalyzer.svg',
		group: ['transform'],
		version: 1,
		description: 'Amazon Seller Analyzer estimates competitor sales and revenue by day, month, and year. Run fast bulk seller analysis with no Amazon login or cookies required, product-level ranges, Buy Box signals, strategy tracking, JSON/CSV/Excel exports, and API access. $5/1K products plus $0.01/run.',
		defaults: { name: 'Amazon Seller Analyzer' },
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [{ name: 'apifyApi', required: true }],
		properties: [
   {
      "displayName": "Seller profile URLs",
      "name": "sellerUrls",
      "description": "Add Amazon seller profile URLs that contain a seller parameter, for example an /sp?seller=... URL. (comma or new-line separated)",
      "type": "string",
      "default": ""
   },
   {
      "displayName": "Seller IDs",
      "name": "sellerIds",
      "description": "Add Amazon merchant IDs directly. A seller ID normally contains 13–14 uppercase letters and numbers. (comma or new-line separated)",
      "type": "string",
      "default": ""
   },
   {
      "displayName": "Amazon marketplace",
      "name": "marketplace",
      "description": "Choose the marketplace where the seller operates. This controls catalog discovery, local prices, and output currency.",
      "type": "options",
      "options": [
         {
            "name": "United States (amazon.com)",
            "value": "us"
         },
         {
            "name": "United Kingdom (amazon.co.uk)",
            "value": "uk"
         },
         {
            "name": "Germany (amazon.de)",
            "value": "de"
         },
         {
            "name": "France (amazon.fr)",
            "value": "fr"
         },
         {
            "name": "Spain (amazon.es)",
            "value": "es"
         },
         {
            "name": "Italy (amazon.it)",
            "value": "it"
         },
         {
            "name": "Canada (amazon.ca)",
            "value": "ca"
         },
         {
            "name": "Mexico (amazon.com.mx)",
            "value": "mx"
         },
         {
            "name": "India (amazon.in)",
            "value": "in"
         }
      ],
      "default": "us"
   },
   {
      "displayName": "Products per seller",
      "name": "maxProductsPerSeller",
      "description": "Maximum number of unique products analyzed for each seller. Billing applies only to products successfully analyzed.",
      "type": "number",
      "default": 10,
      "typeOptions": {
         "minValue": 1,
         "maxValue": 500
      }
   },
   {
      "displayName": "Inspect offers and Buy Box",
      "name": "includeOffers",
      "description": "Inspect publicly visible offer and Buy Box information for better attribution of listing demand to the target seller.",
      "type": "boolean",
      "default": true
   },
   {
      "displayName": "Track changes between runs",
      "name": "trackStrategy",
      "description": "Save an observation baseline and compare visible price, rank, availability, promotion, and seller-position signals on later runs.",
      "type": "boolean",
      "default": true
   },
   {
      "displayName": "Processing concurrency",
      "name": "maxConcurrency",
      "description": "Number of products processed in parallel. The load-tested value balances speed and marketplace reliability.",
      "type": "number",
      "default": 4,
      "typeOptions": {
         "minValue": 1,
         "maxValue": 4
      }
   },
   {
      "displayName": "Proxy configuration",
      "name": "proxyConfiguration",
      "description": "Apify Residential Proxy is recommended for reliable marketplace access. Proxy traffic is billed by Apify as platform usage.",
      "type": "json",
      "default": "{}"
   }
],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		for (let i = 0; i < items.length; i++) {
			try {
				const body: Record<string, unknown> = {};
				{ const _v = this.getNodeParameter("sellerUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["sellerUrls"] = _a; }
				{ const _v = this.getNodeParameter("sellerIds", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["sellerIds"] = _a; }
				body["marketplace"] = this.getNodeParameter("marketplace", i);
				body["maxProductsPerSeller"] = this.getNodeParameter("maxProductsPerSeller", i);
				body["includeOffers"] = this.getNodeParameter("includeOffers", i);
				body["trackStrategy"] = this.getNodeParameter("trackStrategy", i);
				body["maxConcurrency"] = this.getNodeParameter("maxConcurrency", i);
				{ const _r = this.getNodeParameter("proxyConfiguration", i, '') as string|object; if (_r) { try { body["proxyConfiguration"] = typeof _r === 'string' ? JSON.parse(_r) : _r; } catch { throw new NodeOperationError(this.getNode(), "proxyConfiguration" + ' must be valid JSON', { itemIndex: i }); } } }
				const options: IRequestOptions = {
					method: 'POST' as IHttpRequestMethods,
					url: `https://api.apify.com/v2/acts/${ACTOR_ID}/run-sync-get-dataset-items`,
					body,
					json: true,
				};
				const response = await this.helpers.requestWithAuthentication.call(this, 'apifyApi', options);
				const results = Array.isArray(response) ? response : [response];
				for (const result of results) returnData.push({ json: result, pairedItem: { item: i } });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
			}
		}
		return [returnData];
	}
}

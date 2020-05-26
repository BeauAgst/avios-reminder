interface createElementOptions {
  className?: string
  href?: string
  target?: string
  textContent?: string
  title?: string
}

interface GraphQLResponse {
  data?: {
    browser_plugin_merchant?: Retailer[]
  }
}

interface Retailer {
  external_id: string
  merchant_url:string
  rate: string
  merchant: {
    merchant_name_id: string
  }
}

interface StorageItem {
  [key: string]: unknown
}
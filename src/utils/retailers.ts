import storage from './storage';

const params = JSON.stringify({"query":"{\n  browser_plugin_merchant(where: {\n    merchant_url: {\n      _neq: \"\"\n    }\n  }) {\n    external_id,\n    merchant_url,\n    rate,\n    merchant { \n      merchant_name_id\n    } \n  } \n}"})

const fetchRetailers = async function fetchRetailers(): Promise<Retailer[]> {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();

    http.open('POST', 'https://live.collection.avios.digital/v1alpha1/graphql', true)
    http.setRequestHeader('Content-type', 'application/json')
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200) {
        const data = JSON.parse(http.responseText)
        resolve(data?.data?.browser_plugin_merchant)
      } else {
        reject({
          statusCode: http.status,
          error: JSON.parse(http.responseText),
        })
      }
    }
    http.send(params)
  })
}

export default async function getRetailerList(): Promise<Retailer[]> {
  try {
    const data = storage('local').get('retailer_list') as { retailers?: Retailer[] }

    if (!data?.retailers) {
      const retailers = await fetchRetailers()
      storage('local').set('retailer_list', { retailers })
      return retailers;
    }

    return data.retailers
  } catch (error) {
    console.log('Unable to get retailers')
    return []
  }
};
import getRetailerList from './utils/retailers'

const siteHasAvios = async function siteHasAvios(tab: chrome.tabs.Tab): Promise<Retailer | undefined> {
  const sites = await getRetailerList()
  return sites.find(({ merchant_url }) => tab.url?.includes(merchant_url))
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'complete') return

  const retailer = await siteHasAvios(tab)
  if (!retailer) return

  chrome.tabs.insertCSS(tabId, { file: 'styles.css' })
  chrome.tabs.sendMessage(tabId, retailer)
})
import storage from './utils/storage'

const CLASS_PREFIX = 'baar'

const prefixedClass = (className: string) => `${CLASS_PREFIX}-${className}`

const createPopupBody = function createPopupBody(retailer: Retailer) {
  const { merchant: { merchant_name_id }, rate } = retailer

  const fragment = new DocumentFragment()

  fragment.appendChild(createElement('button', {
      className: [prefixedClass('close-button'), 'js-baar-close'].join(' '),
      textContent: '×',
      title: 'Close this message',
  }));
  fragment.appendChild(createElement('span', {
    className: [prefixedClass('title')].join(' '),
    textContent: 'Avios Opportunity!'
  }))
  fragment.appendChild(createElement("span", {
    className: [prefixedClass('body')].join(" "),
    textContent: `Earn: ${rate}`,
  }))
  fragment.appendChild(createElement('a', {
    className: [prefixedClass('button')].join(' '),
    href: `https://www.shopping.ba.com/retailers/${merchant_name_id}`,
    textContent: `Head to BA Shopping`
  }))

  return fragment
}

const createElement = function createElement(type: string, properties: createElementOptions): HTMLElement {
  const el = document.createElement(type)
  Object.entries(properties).forEach(([property, value]) => el[property] = value)
  return el
}

const insertPopup = function insertPopup(retailer: Retailer): void {
  const parent = createElement('div', {
    className: [prefixedClass('container')].join(' '),
  })
  const body = createPopupBody(retailer)

  parent.appendChild(body)
  document.body.appendChild(parent)
}



document.addEventListener('click', event => {
  const target = event.target as HTMLButtonElement
  const isPopupButton = target?.classList.contains('js-baar-close')
  if (!isPopupButton) return

  const popup = target.closest('.baar-container')
  if (popup) {
    event.preventDefault()
    popup.parentNode?.removeChild(popup)
  }

  storage('session').set('popup-closed', true)
})

chrome.runtime.onMessage.addListener((retailer: Retailer) => {
  const popupClosed = storage('session').get('popup-closed')
  if (popupClosed) return

  insertPopup(retailer)
})

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const formatterSmall = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 6
});

export const formatMoney = (price) => {
	if (price < 1) {
		return formatterSmall.format(price)
	}
	return formatter.format(price)
}

export const calculateReturn = (indexPrice, indexInitialPrice) => {
  return ((indexPrice - indexInitialPrice) / indexInitialPrice) * 100
}


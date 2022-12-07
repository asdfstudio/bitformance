const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatMoney = (price) => {
	return formatter.format(price)
}

export const calculateReturn = (indexPrice, indexInitialPrice) => {
  return ((indexPrice - indexInitialPrice) / indexInitialPrice) * 100
}


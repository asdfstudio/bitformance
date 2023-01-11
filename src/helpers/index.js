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

export const calculateDrawdown = (prices) => {
  const maxValue = Math.max(...prices)
  const indexOf = prices.indexOf(maxValue)
  const afterPeak = prices.slice(indexOf, prices.length)
  var lowestPrice = 100000000000000
  afterPeak.forEach((price) => {
    if (price < lowestPrice) {
      lowestPrice = price
    }
  })
  const drawdown = ((lowestPrice - maxValue) / maxValue) *  100
  return drawdown
}
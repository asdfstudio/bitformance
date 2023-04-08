const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function convertToInternationalCurrencySystem (labelValue) {

  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+9

  ? "$" + (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
  // Six Zeroes for Millions 
  : Math.abs(Number(labelValue)) >= 1.0e+6

  ? "$" + (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
  // Three Zeroes for Thousands
  : Math.abs(Number(labelValue)) >= 1.0e+3

  ? "$" + (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

  : "$" + Math.abs(Number(labelValue)).toFixed(2);
}

const formatterSmall = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 6
});

export const formatMoney = (price) => {
	if (price < 1) {
		return formatterSmall.format(price)
	}
  // return formatter.format(price)
	return convertToInternationalCurrencySystem(price)
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
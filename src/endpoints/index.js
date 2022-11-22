import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())
const baseUrl = (slug) => `${process.env.REACT_APP_API_URL}${slug}`

export const useTopFifty = () => {
	const { data, error } = useSWR(baseUrl('/get-top-50'), fetcher)

  return {
    data: data ? data.data : {},
    isLoading: !error && !data,
    isError: error
  }

}
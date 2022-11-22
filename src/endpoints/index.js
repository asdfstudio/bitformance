import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())
const baseUrl = (slug) => `${process.env.REACT_APP_API_URL}${slug}`

const POST_DATA_OPTIONS = (data) => {
	return {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}
}

export const useTopFifty = () => {
	const { data, error } = useSWR(baseUrl('/get-index?id=62a63d8845cc471234deec49'), fetcher)

  return {
    data: data ? data.data : {},
    isLoading: !error && !data,
    isError: error
  }

}

export const login = async (email, password) => {
	const response = await fetch(baseUrl('/login'), POST_DATA_OPTIONS({ email, password }))
	const data = await response.json()
	return data
}
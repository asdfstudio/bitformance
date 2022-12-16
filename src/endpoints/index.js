import useSWR from 'swr'

const GET_FETCH_OPTIONS = () => {
	return {
		method: 'get',
		headers: { 
			'Content-Type': 'application/json',
		},
		mode: 'cors',
	}
}

const GET_FETCH_OPTIONS_AUTH = () => {
	return {
		method: 'get',
		headers: { 
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			'Content-Type': 'application/json',
		},
		mode: 'cors',
	}
}

// const fetcher = (...args) => fetch(...args).then(res => res.json())
const fetcher = ( url, query = '' ) => fetch(
	`${url}${query}`, 
	GET_FETCH_OPTIONS()
).then(res => { 
	console.log(res)
	// if (res.status === 401) {
	// 	window.location.href = '/?sessionExpired=true'
	// }
	return res.json()
}) 
const fetcherAuth = ( url, query = '' ) => fetch(
	`${url}${query}`, 
	GET_FETCH_OPTIONS_AUTH()
).then(res => { 
	if (res.status === 401) {
		console.log(res)
		if (!window.location.href.includes('/?sessionExpired=true') && localStorage.getItem('username')) {
			localStorage.setItem('username', '')
			localStorage.setItem('firstName', '')
			localStorage.setItem('lastName', '')
			localStorage.setItem('picture', '')
			localStorage.setItem('accessToken', '')
			localStorage.setItem('userId', '')
			window.location.href = '/?sessionExpired=true'
		}
	}
	return res.json()
}) 

export const baseUrl = (slug) => `${process.env.REACT_APP_API_URL}${slug}`

const POST_DATA_OPTIONS = (data) => {
	return {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}
}

const POST_DATA_OPTIONS_FORM = (formData) => {
	return {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			'Content-Type': 'application/json'
		},
		body: formData
	}
}

//GET ********

export const useTopFifty = () => {
	const { data, error } = useSWR(baseUrl('/get-top50-index'), fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}

export const useRecentIndexes = () => {
	const { data, error } = useSWR(baseUrl('/get-most-recent-indexes'), fetcher)

	return {
		data: data ? data.data : [],
		isLoading: !error && !data,
		isError: error
	}
}

export const usePopularIndexes = () => {
	const { data, error } = useSWR(baseUrl('/get-most-popular-indexes'), fetcher)

	return {
		data: data ? data.data : [],
		isLoading: !error && !data,
		isError: error
	}
}

export const usePerformers = () => {
	const { data, error } = useSWR(baseUrl('/performers'), fetcher)

	return {
		data: data ? data.data : [],
		isLoading: !error && !data,
		isError: error
	}
}



export const useBrowsableIndexes = () => {
	const { data, error } = useSWR(baseUrl('/get-browsable-indexes'), fetcher)

	return {
		data: data ? data.data : [],
		isLoading: !error && !data,
		isError: error
	}
}

export const useCryptosByMarketCap = () => {
	const { data, error } = useSWR(baseUrl('/get-coins-by-marketcap?limit=13'), fetcher)

	return {
		data: data ? data.data : [],
		isLoading: !error && !data,
		isError: error
	}
}

export const useCryptoById = (id, isAuth) => {
	const { data, error } = useSWR(
		baseUrl(`/get-index?id=${id}`), 
		isAuth ? fetcherAuth : fetcher
	)

	return {
		data: data,
		isLoading: !error && !data,
		isError: error
	}
}

export const useCoinBySymbol = (symbol) => {
	const { data, error } = useSWR(
		baseUrl(`/get-coin-data?symbol=${symbol}`), 
		fetcher
	)

	return {
		data: data ? data.data: null,
		isLoading: !error && !data,
		isError: error
	}

}

export const searchForIndex = async (searchText) => {
	const data = await fetcher(baseUrl(`/search-index?search=${searchText}`))
	return data
}

//GET AUTH **********
export const useMyIndexes = () => {
	const { data, error } = useSWR(baseUrl('/get-user-indexes'), fetcherAuth)
	return {
		data: data ? data.data : [],
		isLoading: !error && !data,
		isError: error
	}
}

export const useFavoriteIndexes = () => {
	const { data, error } = useSWR(baseUrl('/get-favorited-indexes'), fetcherAuth)

	return {
		data: data ? data.data : [],
		isLoading: !error && !data,
		isError: error
	}
}


//POST **********

export const login = async (email, password) => {
	const response = await fetch(baseUrl('/login'), POST_DATA_OPTIONS({ email, password }))
	const data = await response.json()
	return data
}

export const favoriteIndex = async (index_id) => {
	const response = await fetch(baseUrl('/favorites'), POST_DATA_OPTIONS({ index_id }))
	const data = await response.json()
	return data
}

export const generateChartPreview = async (weighting_method, initial_value, cryptos, custom_weights = {}) => {
	const response = await fetch(
		baseUrl('/create-chart-preview'), 
		POST_DATA_OPTIONS({ 
			name: 'Example', 
			weighting_method, 
			description: 'Test', 
			initial_value, 
			cryptos, 
			custom_weights,
			logo: '' 
		})
	)
	const data = await response.json()
	return data
}

//TODO: test method
export const uploadImage = async (imageFile, type = 'logo', indexId) => {
	 const formData = new FormData();
	  formData.append("file_obj", imageFile);
	  formData.append("type", type);
	  formData.append('id', indexId);
	  const response = await fetch(baseUrl('/mime-files'), POST_DATA_OPTIONS_FORM(formData))
	  const data = await response.json()
	  console.log(data)
	  return data
}
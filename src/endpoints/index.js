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
	// console.log(res)
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
		// console.log(res)
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



export const useBrowsableIndexes = (sortField, sortOrder) => {
	const { data, error } = useSWR(baseUrl(`/get-browsable-indexes?sortOrder=${sortOrder}&sortField=${sortField}`), fetcher)

	return {
		data: data ? data.data : [],
		isLoading: !error && !data,
		isError: error
	}
}

export const useCryptosByMarketCap = (sortField, sortOrder, page = 0) => {
	const { data, error } = useSWR(baseUrl(`/get-coins-by-marketcap?limit=13&sortOrder=${sortOrder}&sortField=${sortField}&page=${page + 1}`), fetcher)

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

export const useProfile = () => {
	const { data, error } = useSWR(baseUrl('/profile'), fetcherAuth)

	return {
		data: data,
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

export const registerAccount = async ({ email, password, username, first_name, last_name }) => {
	const response = await fetch(
		baseUrl('/register'), 
		POST_DATA_OPTIONS({ 
			first_name, 
			last_name, 
			email, 
			password, 
			username 
		})
	)
	const data = await response.json()
	return data
}

export const resetPassword = async (token, password, confirm_password) => {
	const response = await fetch(
		baseUrl(`/reset-link/${token}`), 
		POST_DATA_OPTIONS({ 
			password,
			new_password: password,
			confirm_password 
		})
	)
	const data = await response.json()
	return data
}

export const useConfirmEmailByToken = async (token) => {
	const { data, error } = useSWR(baseUrl(`/email-confirmed/${token}`), fetcher)

	return {
		data: data,
		isLoading: !error && !data,
		isError: error
	}
}

export const forgotPassword = async (email) => {
	const response = await fetch(
		baseUrl('/forgot-password'), 
		POST_DATA_OPTIONS({ 
			email, 
		})
	)
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

export const createIndex = async (name, weighting_method, description = '', initial_value, cryptos, rebalancing_interval, custom_weights = {}, logo = '') => {
	const response = await fetch(
		baseUrl('/create-new-index'), 
		POST_DATA_OPTIONS({ 
			name,
			weighting_method, 
			description,
			initial_value, 
			cryptos, 
			custom_weights,
			logo
		})
	)
	const data = await response.json()
	return data
}

export const deleteIndex = async (index_id) => {
	const response = await fetch(
		baseUrl('/remove-index'), 
		POST_DATA_OPTIONS({ 
			index_id
		})
	)
	const data = await response.json()
	return data
}

export const uploadImage = async (imageFile, type = 'logo', indexId) => {
	 const formData = new FormData();
	  formData.append("file_obj", imageFile);
	  formData.append("type", type);
	  formData.append('id', indexId);
	  const response = await fetch(baseUrl('/mime-files'), POST_DATA_OPTIONS_FORM(formData))
	  const data = await response.json()
	  return data
}

export const contactForm = async ({ username, subject, message, email }) => {
	const response = await fetch(
		baseUrl('/contact'), 
		POST_DATA_OPTIONS({ 
			username,
			subject,
			message,
			email
		})
	)
	const data = await response.json()
	return data	
}

export const updateProfile = async (profile) => {
	const response = await fetch(baseUrl('/update-profile'), POST_DATA_OPTIONS({
		...profile
	}))
	const data = await response.json()
	return data
}
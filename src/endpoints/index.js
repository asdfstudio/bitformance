import useSWR from 'swr'

const GET_FETCH_OPTIONS = () => {
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
	// if (res.status === 401) {
	// 	window.location.href = '/?sessionExpired=true'
	// }
	return res.json()
}) 

const baseUrl = (slug) => `${process.env.REACT_APP_API_URL}${slug}`

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

export const useBrowsableIndexes = () => {
	const { data, error } = useSWR(baseUrl('/get-browsable-indexes'), fetcher)

	return {
		data: data ? data.data : [],
		isLoading: !error && !data,
		isError: error
	}
}

export const useCryptoById = (id) => {
	const { data, error } = useSWR(baseUrl(`/get-index?id=${id}`), fetcher)

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
	},

}
export const validateUsername = (username) => {
	if (username.length < 8) {
		return 'Username must be 8 characters or longer'
	}
	return ''
}

export const validateEmail = (email) => {
  const valid = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

   return valid ? '' : 'Please enter a valid email'
}

export const validatePassword = (password) => {
	if (password.length < 8) {
		return 'Password must be 8 characters or longer.'
	}
	return ''
}


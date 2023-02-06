import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { resetPassword } from '../endpoints/index'
import BFLoading from '../components/small/BFLoading'

export default function ResetPasswordPage() {

	const params = useParams()
	const navigate = useNavigate()
	const [errorMessage, setErrorMessage] = useState('')
	const [loading, setLoading] = useState(false)

	const resetPasswordForm = async (e) => {
		e.preventDefault()

		setErrorMessage('')
		setLoading(true)
		const formData = new FormData(e.target);
		const keys = [
			'password',
			'confirmPassword'
		]

		let data = {}
		keys.forEach(key => data[key] = formData.get(key))

		if (params.token && data.password && data.confirmPassword) {
			const result = await resetPassword(params.token, data.password, data.confirmPassword)
			setLoading(false)
			console.log(result)
			navigate('/')
			return
		}

		setLoading(false)
	}

	return (<div className="max-w-lg mx-auto mt-4">
		<form onSubmit={(e) => resetPasswordForm(e)}>
			<div>
				<label className="font-bold text-sm">New Password (Must be at least 8 characters)</label>
				<input name="password" type="password" className="w-full py-1 border rounded" />
			</div>

			<div>
				<label className="font-bold text-sm">Confirm Password</label>
				<input name="confirmPassword" type="password" className="w-full py-1 border rounded" />
			</div>

			{errorMessage && <p className="text-red-500 text-sm">*{errorMessage}</p>}
			<div className="mt-4">
				<button type="submit" className="font-bold w-full text-sm rounded bg-blue-500 hover:bg-blue:600 text-white py-2">{loading ? <BFLoading isCenter={true} /> : 'Reset Password'}</button>
			</div>
		</form>
	</div>)
}
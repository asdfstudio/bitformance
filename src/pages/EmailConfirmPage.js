import { useParams, Link } from 'react-router-dom'
import { useConfirmEmailByToken } from '../endpoints/index'
import BFLoading from '../components/small/BFLoading'

export default function EmailConfirmPage() {

	const params = useParams()
	const { data, isLoading } = useConfirmEmailByToken(params.token)

	// console.log(data)
	if (isLoading) {
		return (
			<div className="max-w-lg mt-4 mx-auto">
				<BFLoading />
			</div>
		)
	}
	return(
		<div className="max-w-lg mt-4 mx-auto">

			{data?.email_auth ? 
				<p>Your email: {data.user.email} has been confirmed. Please <Link to="/">sign in</Link>.</p>
				: <p>Something went wrong. Please try again.</p>
			}

		</div>
	)
}
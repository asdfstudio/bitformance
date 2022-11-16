import bitLogoWhite from '../../bitLogoWhite.png'

export default function BitformanceLeftPanel({ setShowModalType, showInfo }) {

	if (showInfo !== 'sign-in' && showInfo !== 'sign-up') {
		return <img className="w-44" src={bitLogoWhite} alt="bitformance logo" />
	}

	const SignInHeader = () => (
		<div className="space-y-4">
			<img className="w-44" src={bitLogoWhite} alt="bitformance logo" />
			<h1 className="text-4xl mt-2">Sign in to Bitformance</h1>
			<p>Bitformance is the easiest <br/> place to track, analyze, and create cryptocurrency indexes.</p>
		</div>
	)

	const SignInFooter = () => (
		<div className="mt-auto space-y-2">
			<p>Don&apos;t have an account?</p>
			<button className="w-full text-sm rounded bg-blue-50 hover:bg-blue-200 font-bold text-blue-500 py-2" onClick={() => setShowModalType('SIGN_UP')}>Sign Up</button>
		</div>
	)

	const SignUpHeader = () => (
		<div className="space-y-4">
			<img className="w-44" src={bitLogoWhite} alt="bitformance logo" />
			<h1 className="text-4xl mt-2">Create your account</h1>
			<p>Bitformance is the easiest <br/> place to track, analyze, and create cryptocurrency indexes.</p>
		</div>
	)

	const SignUpFooter = () => (
		<div className="mt-auto space-y-2">
			<p>Already have an account?</p>
			<button className="w-full text-sm rounded bg-blue-50 hover:bg-blue-200 font-bold text-blue-500 py-2" onClick={() => setShowModalType('SIGN_IN')}>Sign In</button>
		</div>
	)

	return (<>
		{showInfo === 'sign-in' 
			? <><SignInHeader /><SignInFooter /></>
			: <><SignUpHeader /><SignUpFooter /></>
		}
	</>)
}
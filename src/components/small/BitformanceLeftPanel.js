import bitLogoWhite from '../../bitLogoWhite.png'

export default function BitformanceLeftPanel({ setShowModalType, showInfo }) {

	if (showInfo !== 'sign-in' && showInfo !== 'sign-up') {
		return <img className="w-44" src={bitLogoWhite} alt="bitformance logo" />
	}

	const SignInHeader = () => (
		<div className="space-y-4">
			<img className="w-44" src={bitLogoWhite} alt="bitformance logo" />
			<h1 className="text-[30px] mt-2 font-DM_Sans font-normal leading-medium tracking-tight">Sign in to Bitformance</h1>
			<p className='text-[16px] font-DM_Sans font-normal leading-normal tracking-normal'>Bitformance is the easiest <br/> place to track, analyze, and create cryptocurrency indexes.</p>
		</div>
	)

	const SignInFooter = () => (
		<div className="mt-20 space-y-2">
			<p className='text-[16px] font-DM_Sans font-normal leading-normal tracking-normal'>Don&apos;t have an account?</p>
			<button className="w-full text-sm rounded-lg bg-main-white font-bold text-main-buttonBlue py-2" onClick={() => setShowModalType('SIGN_UP')}>Sign Up</button>
		</div>
	)

	const SignUpHeader = () => (
		<div className="space-y-4">
			<img className="w-44" src={bitLogoWhite} alt="bitformance logo" />
			<h1 className="text-[30px] mt-2 font-DM_Sans font-normal leading-medium tracking-tight">Create your account</h1>
			<p className='text-[16px] font-DM_Sans font-normal leading-normal tracking-normal'>Bitformance is the easiest <br/> place to track, analyze, and create cryptocurrency indexes.</p>
		</div>
	)

	const SignUpFooter = () => (
		<div className="mt-auto space-y-2">
			<p className='text-[16px] font-DM_Sans font-normal leading-normal tracking-normal'>Already have an account?</p>
			<button className="w-full text-sm rounded-lg bg-main-white font-bold text-main-buttonBlue py-2" onClick={() => setShowModalType('SIGN_IN')}>Sign In</button>
		</div>
	)

	return (<>
		{showInfo === 'sign-in' 
			? <><SignInHeader /><SignInFooter /></>
			: <><SignUpHeader /><SignUpFooter /></>
		}
	</>)
}

export default function BitformanceLeftPanelFooter({ setShowModalType, showInfo }) {

	const SignInFooter = () => (
		<div className="mt-2 mb-2 space-y-2">
			<p className='text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black sm:text-main-white'>Don&apos;t have an account?</p>
			<button className="w-full text-sm rounded-lg bg-main-white font-bold text-main-buttonBlue py-2 border border-main-buttonBlue sm:border-main-white" onClick={() => setShowModalType('SIGN_UP')}>Sign Up</button>
		</div>
	)
	const SignUpFooter = () => (
		<div className="mt-auto mb-2 space-y-2">
			<p className='text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black sm:text-main-white'>Already have an account?</p>
			<button className="w-full text-sm rounded-lg bg-main-white font-bold text-main-buttonBlue py-2 border border-main-buttonBlue sm:border-main-white" onClick={() => setShowModalType('SIGN_IN')}>Sign In</button>
		</div>
	)

	return (<>
		{showInfo === 'sign-in' 
			? <><SignInFooter /></>
			: <><SignUpFooter /></>
		}
	</>)
}
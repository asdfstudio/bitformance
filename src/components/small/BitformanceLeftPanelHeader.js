import bitLogoWhite from '../../bitLogoWhite.png'
import bitLogoMobile from '../../bitLogo.png'
import useWindowDimensions from '../../hooks/useWindowDimensions';

export default function BitformanceLeftPanelHeader({ setShowModalType, showInfo }) {
	const { width } = useWindowDimensions();

	if (showInfo !== 'sign-in' && showInfo !== 'sign-up') {
		return <div className='p-6 hidden sm:block'><img className="w-44" src={bitLogoWhite} alt="bitformance logo" /></div>
	}

	const SignInHeader = () => (
		<div className="space-y-2 flex flex-col items-center p-6 pb-2 sm:items-start">
			{
				width <= 640 ? <img className="w-44" src={bitLogoMobile} alt="bitformance logo" /> : <img className="w-44" src={bitLogoWhite} alt="bitformance logo" /> 
			}
			<h1 className="pt-2 text-[30px] mt-2 font-DM_Sans font-medium leading-9 tracking-tight text-main-black sm:text-main-white">Sign in to Bitformance</h1>
			<p className='pt-4 hidden md:block text-[15px] font-DM_Sans font-medium leading-5 tracking-normal'>Bitformance is the easiest <br/> place to track, analyze, and create cryptocurrency indexes.</p>
		</div>
	)

	const SignUpHeader = () => (
		<div className="space-y-4 flex flex-col items-center p-2 pb-2 sm:items-start">
			{
				width <= 640 ? <img className="w-44" src={bitLogoMobile} alt="bitformance logo" /> : <img className="w-44" src={bitLogoWhite} alt="bitformance logo" /> 
			}
			<h1 className="text-[30px] mt-2 font-DM_Sans font-medium leading-9 tracking-tight text-main-black sm:text-main-white">Create your account</h1>
			<p className='hidden text-[16px] font-DM_Sans font-normal leading-5 tracking-normal sm:block'>Bitformance is the easiest <br/> place to track, analyze, and create cryptocurrency indexes.</p>
		</div>
	)

	return (<>
		{showInfo === 'sign-in' 
			? <><SignInHeader /></>
			: <><SignUpHeader /></>
		}
	</>)
}
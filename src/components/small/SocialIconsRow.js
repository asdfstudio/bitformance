import BFIcon from '../BFIcon'

export default function SocialIconsRows({ showCopyLink }) {

	//TODO: copy link needs to be dynamic, ^^
	
	return(
		<>
			<a href="https://www.instagram.com/BitformanceTeam/" target="_blank"><BFIcon iconName="instagram" size="lg" /></a>
			<a href="https://twitter.com/bitformanceteam" target="_blank"><BFIcon iconName="twitter" size="lg" /></a>
			<a href="https://www.linkedin.com/company/bitformance" target="_blank"><BFIcon iconName="linkedin" size="lg" /></a>
			<a href="https://discord.gg/wFYuvbyCSt" target="_blank"><BFIcon iconName="discord" size="lg" /></a>
			{showCopyLink && 	<BFIcon iconName="share-link" size="lg" />}
		</>
	)
}
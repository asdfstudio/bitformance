import BFIcon from '../BFIcon'

export default function SocialIconsRows({ showCopyLink }) {

	//TODO: copy link needs to be dynamic, ^^
	
	return(
		<>
			<BFIcon iconName="facebook" size="lg" />
			<BFIcon iconName="twitter" size="lg" />
			<BFIcon iconName="telegram" size="lg" />
			<BFIcon iconName="discord" size="lg" />
			{showCopyLink && 	<BFIcon iconName="share-link" size="lg" />}
		</>
	)
}
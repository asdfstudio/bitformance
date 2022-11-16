import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
	faHouse, 
	faCodeCompare, 
	faEnvelope, 
	faBook,
	faChartLine,
	faHeart,
	faListAlt,
} from '@fortawesome/free-solid-svg-icons'

import {
	faFacebook,
	faTwitter,
	faTelegram,
	faDiscord,
} from '@fortawesome/free-brands-svg-icons'

const secondaryColor = '#40C8B8'

export default function BFIcon({ iconName, color, size }) {


	const icons = [
		{ name: 'home', icon: faHouse },
		{ name: 'compare', icon: faCodeCompare },
		{ name: 'knowledge-base', icon: faBook },
		{ name: 'contact-us', icon: faEnvelope },
		{ name: 'indexes', icon: faChartLine },
		{ name: 'my-indexes', icon: faListAlt },
		{ name: 'favorite', icon: faHeart },
		{ name: 'facebook', icon: faFacebook },
		{ name: 'twitter', icon: faTwitter },
		{ name: 'telegram', icon: faTelegram },
		{ name: 'discord', icon: faDiscord },
	]

	const icon = icons.find(icon => icon.name === iconName) || { icon: faHouse }

	return(
		<FontAwesomeIcon icon={icon.icon} color={color} size={size} />
	)
}
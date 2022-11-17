import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
	faHouse, 
	faCodeCompare, 
	faEnvelope, 
	faBook,
	faChartLine,
	faHeart,
	faListAlt,
	faArrowRight, 
	faArrowLeft,
	faCircle,
	faCircleCheck,
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
		{ name: 'up-right-arrow', icon: faArrowRight },
		{ name: 'down-left-arrow', icon: faArrowLeft },
		{ name: 'open-circle', icon: faCircle },
		{ name: 'checked-circle', icon: faCircleCheck },
	]

	const icon = icons.find(icon => icon.name === iconName) || { icon: faHouse }

	if (icon.name === 'up-right-arrow' || icon.name === 'down-left-arrow') {
		return <FontAwesomeIcon icon={icon.icon} size={size} transform={{ rotate: -45}} color={color} />
	}

	return(
		<FontAwesomeIcon icon={icon.icon} color={color} size={size} />
	)
}
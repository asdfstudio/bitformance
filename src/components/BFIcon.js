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
	faCircleCheck,
	faSearch,
	faScaleBalanced,
	faLink,
	faImage,
	faUser,
	faSliders,
	faRightFromBracket,
	faShieldHalved,
	faBars,
	faX,
	faCircleInfo,
	faTrashCan,
	faCoins,
	faClock,
	faCircleXmark,
	faChevronUp,
	faChevronDown,
	faCheckToSlot,
	faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons'

import {
	faCircle,
	faHeart as faHeartOpen,
} from '@fortawesome/free-regular-svg-icons'

import {
	faInstagram,
	faTwitter,
	faLinkedin,
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
		{ name: 'open-favorite', icon: faHeartOpen },
		{ name: 'instagram', icon: faInstagram },
		{ name: 'twitter', icon: faTwitter },
		{ name: 'linkedin', icon: faLinkedin},
		{ name: 'discord', icon: faDiscord },
		{ name: 'up-right-arrow', icon: faArrowRight },
		{ name: 'down-left-arrow', icon: faArrowLeft },
		{ name: 'open-circle', icon: faCircle },
		{ name: 'checked-circle', icon: faCircleCheck },
		{ name: 'search', icon: faSearch },
		{ name: 'scale', icon: faScaleBalanced },
		{ name: 'share-link', icon: faLink },
		{ name: 'placeholder-image', icon: faImage },
		{ name: 'no-picture', icon: faUser },
		{ name: 'profile', icon: faUser },
		{ name: 'account', icon: faShieldHalved },
		{ name: 'settings', icon: faSliders },
		{ name: 'logout', icon: faRightFromBracket },
		{ name: 'menu', icon: faBars },
		{ name: 'close', icon: faX },
		{ name: 'close-circle', icon: faCircleXmark },
		{ name: 'info', icon: faCircleInfo },
		{ name: 'delete', icon: faTrashCan },
		{ name: 'back', icon: faArrowLeft },
		{ name: 'coins', icon: faCoins },
		{ name: 'time', icon: faClock },
		{ name: 'arrowUP', icon: faChevronUp },
		{ name: 'arrowDown', icon: faChevronDown },
		{ name: 'checkToSlot', icon:  faCheckToSlot},
		{ name: 'alert', icon:  faExclamationCircle},
	]

	const icon = icons.find(icon => icon.name === iconName) || { icon: faHouse }

	if (icon.name === 'up-right-arrow' || icon.name === 'down-left-arrow') {
		return <FontAwesomeIcon icon={icon.icon} size={size} transform={{ rotate: -45}} color={color} />
	}
	if (icon.name === 'settings') {
		return <FontAwesomeIcon icon={icon.icon} size={size} transform={{ rotate: 90}} color={color} />
	}

	return(
		<FontAwesomeIcon icon={icon.icon} color={color} size={size} />
	)
}
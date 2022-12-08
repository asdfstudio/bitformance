import placeholder from '../../circle-logo.png'

export default function BFImage({ style, src, alt }) {
	return <img src={src || placeholder} className={style} alt={alt} />
}
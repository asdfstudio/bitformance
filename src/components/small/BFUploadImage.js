import BFIcon from '../BFIcon'

export default function BFUploadImage({ handleFileSelect, fileSelected, src = '' }) {
	return (
		<div className="flex flex-row items-center gap-4">
		{(fileSelected || src) ?
			<img className="rounded-full w-24 h-24 object-cover" src={src || URL.createObjectURL(fileSelected)} />
			:
			<div className="bg-gray-100 rounded-full w-24 h-24 flex flex-row items-center justify-center">
				<BFIcon iconName="placeholder-image" size="2xl" color="gray" />
			</div>
		}
			<div className="space-y-2">
				<label htmlFor="file-upload" className="cursor-pointer rounded-md bg-blue-100 text-sm text-blue-500 px-6 py-2">Choose File</label>
				<input onChange={handleFileSelect} id="file-upload" type="file" accept="image/*" hidden />
				<p className="text-gray-300 w-60">Minimum logo size is 150 x 150 pixels, an aspect ratio of 1:1</p>
			</div>
		</div>
	)
}
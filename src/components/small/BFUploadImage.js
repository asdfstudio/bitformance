import BFIcon from '../BFIcon'

export default function BFUploadImage({ handleFileSelect, fileSelected, src = '' }) {
	return (
		<div className="flex flex-row items-center gap-4">
		{(fileSelected) ? <img className="rounded-full w-24 h-24 object-cover" src={URL.createObjectURL(fileSelected)} />
			: src ? <img className="rounded-full w-24 h-24 object-cover" src={src} />
			: <div className="bg-main-lightGray rounded-full w-24 h-24 flex flex-row items-center justify-center">
					<BFIcon iconName="placeholder-image" size="2xl" color="#b7c3d1" />
				</div>
		}
			<div className="space-y-4">
				<label htmlFor="file-upload" className="text-[15px] mb-6 font-DM_Sans font-medium leading-normal tracking-normal items-center cursor-pointer rounded-md bg-main-buttonBlue bg-opacity-10 text-main-buttonBlue px-8 py-2">Choose File</label>
				<input onChange={handleFileSelect} id="file-upload" type="file" accept="image/*" hidden />
				<p className="text-[16px] font-DM_Sans font-normal leading-5 tracking-normal text-main-grayText w-60">Minimum logo size is 150 x 150 pixels, an aspect ratio of 1:1</p>
			</div>
		</div>
	)
}
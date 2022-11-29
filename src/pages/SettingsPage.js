import { useState } from 'react'
import BFIcon from '../components/BFIcon'
import BFUploadImage from '../components/small/BFUploadImage'

export default function SettingsPage() {
	
	const [tabSelected, setTabSelected] = useState('profile')
	const [name, setName] = useState('TODO: set name')

	const saveProfile = () => {
		//TODO://
	}

	const ProfileForm = () => (
		<div className="space-y-4">
			<div>
				<h1 className="font-bold mb-2">Profile Picture</h1>
				<BFUploadImage />
			</div>
			<div>
				<label className="text-sm font-bold ">User Name</label>
				<input className="mt-1 text-sm w-full px-2 py-1.5 border rounded" disabled value={'TODO: username'} />
			</div>
			<div>
				<label className="text-sm font-bold">Your Name</label>
				<input className="mt-1 text-sm w-full px-2 py-1.5 border rounded" onChange={(e) => setName(e.target?.value)} value={name} />
			</div>
		</div>
	)

	const AccountForm = () => (
		<div>

		</div>
	)

	const selected = 'rounded-lg bg-blue-100 w-full py-2 pl-2 cursor-pointer'
	const notSelected = 'rounded-lg hover:bg-blue-100 w-full py-2 pl-2 cursor-pointer'

	return(
		<div className="bg-gray-100 h-screen p-4">
			<div className="bg-white rounded shadow mx-auto max-w-[740px] p-4">
				<div className="flex flex-row gap-4">
					<div className="w-44 space-y-4">
						<p onClick={() => setTabSelected('profile')} className={tabSelected === 'profile' ? selected : notSelected}>
							<BFIcon iconName="profile" color="#5390F4" />
							&nbsp;&nbsp;Profile
						</p>
						<p onClick={() => setTabSelected('account')} className={tabSelected === 'account' ? selected: notSelected}>
							<BFIcon iconName="account" color="#5390F4" /> 
							&nbsp;&nbsp;Account
						</p>
					</div>
					{ tabSelected === 'profile' ? <ProfileForm /> : <AccountForm /> }
				</div>
				<div className="mt-4 	text-right">
{/*					<button className="w-full text-sm rounded bg-blue-50 hover:bg-blue-200 font-bold text-blue-500 py-2" onClick={() => setShowModalType('SIGN_UP')}>Cancel</button>
*/}					<button className="px-8 text-sm rounded bg-blue-50 hover:bg-blue-200 font-bold text-blue-500 py-2" onClick={() => saveProfile()}>Save</button>

				</div>
			</div>
		</div>
	)
}
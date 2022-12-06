import ContactUs from './modals/ContactUsModal'
import SignIn from './modals/SignInModal'
import SignUp from './modals/SignUpModal'

export default function BFModal({ showModalType, setShowModalType }) {


	const modals = [
		{ type: 'CONTACT_US' , component: <ContactUs setShowModalType={setShowModalType} /> },
		{ type: 'SIGN_UP', component: <SignUp setShowModalType={setShowModalType} /> },
		{ type: 'SIGN_IN', component: <SignIn setShowModalType={setShowModalType} /> },
	]

	const modal = modals.find(obj => obj.type === showModalType)

	return(
		<div className="relative z-[60]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
		  <div className="fixed inset-0 z-[70] overflow-y-auto">
		    {modal.component}
		  </div>
		</div>

	)
}
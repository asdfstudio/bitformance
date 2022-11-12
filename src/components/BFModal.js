import ContactUs from './modals/ContactUsModal'
import SignIn from './modals/SignInModal'
import SignUp from './modals/SignUpModal'

export default function BFModal({ showModalType, setShowModalType }) {


	const modals = [
		{ type: 'CONTACT_US' , component: <ContactUs setShowModalType={setShowModalType} /> },
		{ type: 'SIGN_UP', component: <SignUp /> },
		{ type: 'SIGN_IN', component: <SignIn /> }
	]

	const modal = modals.find(obj => obj.type === showModalType)

	return(
		<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
		  <div class="fixed inset-0 z-10 overflow-y-auto">
		    {modal.component}
		  </div>
		</div>

	)
}
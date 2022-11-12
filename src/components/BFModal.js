import ContactUs from './modals/ContactUsModal'

export default function BFModal({ showModalType, setShowModalType }) {


	const modals = [
		{ type: 'CONTACT_US' , component: <ContactUs /> }
	]

	const modal = modals.find(obj => obj.type === showModalType)

	return(
		<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
		  <div onClick={() => setShowModalType('')} class="fixed inset-0 z-10 overflow-y-auto">
		    {modal.component}
		  </div>
		</div>

	)
}
export default function SignInModal({ setShowModalType }) {
	
	const signIn = () => {
		//TODO: sign in
	}

	return(
		<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
		  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
		    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-gray-50">
		      <div className="sm:flex items-center">
		        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
		          <BFIcon color="#40C8B8" iconName="contact-us" size="2xl" />
		        </div>
		        <div className="text-center sm:mt-0 sm:ml-4 sm:text-left">
		          <h3 className="text-xl font-medium leading-6 text-gray-900" id="modal-title">Contact Us</h3>
		        </div>
		      </div>
		    </div>

		    <div className="px-4">
		    	TODO: layout for Sign in
		    </div>

		    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
		      <button onClick={() => signIn()} type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Submit</button>
		      <button onClick={() => setShowModalType('')} type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
		    </div>
		  </div>
		</div>
}
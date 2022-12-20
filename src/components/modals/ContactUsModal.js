import BFIcon from '../BFIcon'
import ReCAPTCHA from "react-google-recaptcha"
import CloseModal from '../small/CloseModal'
import { contactForm } from '../../endpoints/index'
import { useState } from 'react'

export default function ContactUsModal({ setShowModalType }) {

	const [formSendSuccess, setFormSendSuccess] = useState(false)

	const sendContactForm = async (e) => {
		e.preventDefault()
		setFormSendSuccess(false)
		const formData = new FormData(e.target);
		const keys = [
			'username',
			'subject',
			'email',
			'message'
		]

		let data = {}
		keys.forEach(key => data[key] = formData.get(key))

		const result = await contactForm({ ...data })
		if (result.result) {
			setFormSendSuccess(true)
			return
		}

		//TODO: error message
		setShowModalType('')
	}

	const onRecaptchaChange = (value) => {
		console.log('captch value: ', value)
		// setCompletedRecaptcha(true)
	}



	return(
		<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
		  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
		    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-gray-50">
		    	<CloseModal setShowModalType={setShowModalType} />
		      <div className="sm:flex items-center">
		        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
		          <BFIcon color="#40C8B8" iconName="contact-us" size="2xl" />
		        </div>
		        <div className="text-center sm:mt-0 sm:ml-4 sm:text-left">
		          <h3 className="text-xl font-medium leading-6 text-gray-900" id="modal-title">Contact Us</h3>
		        </div>
		      </div>
		    </div>

		    {formSendSuccess ? 
		    	<div className="mx-auto p-8 space-y-4">
		    		<p className="text-lg">Form received <BFIcon iconName="checked-circle" color="green" /></p>
		    		<p><em>We&apos;ll generally reply within 1-2 business days.</em></p>
		    	</div>	
		    :
			    <form onSubmit={(e) => sendContactForm(e)}>
				    <div className="p-4 space-y-4">
				    	<div>
				    		<label className="font-bold text-sm">Username</label>
				    		<input name="username" className="w-full p-2 border rounded" type="text" placeholder="e. g. johndoe" />
				    	</div>
				    	<div>
				    		<label className="font-bold text-sm">Subject</label>
				    		<input name="subject" className="w-full p-2 border rounded" type="text" placeholder="e. g. Need Support" />
				    	</div>
				    	<div>
				    		<label className="font-bold text-sm">Email Address</label>
				    		<input name="email" className="w-full p-2 border rounded" type="text" placeholder="e. g. yourname@gmail.com" />
				    	</div>
				    	<div className="flex flex-row gap-2 items-center">
				    		<span><BFIcon iconName="info" color="gray" /></span>
				    		<p className="text-sm">We'll only use your email for important updates / inquiries.</p>
				    	</div>
				    	<div>
				    		<label className="font-bold text-sm">Description</label>
				    		<br />
				    		<textarea name="message" className='w-full border h-32'></textarea>
				    	</div>

				    	<ReCAPTCHA
				    	  sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
				    	  onChange={onRecaptchaChange}
				    	/>

				    	<hr />
				    	<div className="mt-auto flex flex-row gap-2">
				    		<button className="w-full text-sm rounded bg-blue-50 hover:bg-blue-200 font-bold text-blue-500 py-2" onClick={() => setShowModalType('')}>Cancel</button>
				    		<button type="submit" className="font-bold w-full text-sm rounded bg-blue-500 hover:bg-blue:600 text-white py-2">Submit</button>
				    	</div>
			    	</div>
			    </form>
		    }

		  </div>
		</div>
	)
}
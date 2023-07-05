import React, { useState } from 'react';
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";

export default function CookiePopup() {

    const [cookieConsent] = useState(getCookieConsentValue())

	return(

        <div className="relative z-[60]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {
                cookieConsent !== 'true' && <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"/>
            }
            <div className="overflow-y-auto font-DM_Sans">
                <div className='block sm:hidden'>
                    <CookieConsent
                        location="bottom"
                        buttonText="Accept"
                        style={{ 
                            background: "#FFFFFF",
                            color: "#111111",
                            width: 'auto',
                            maxWidth: '420px',
                            height: 'auto', 
                            display: 'flex',
                            justifyContent: 'flex-end',
                            borderRadius:'1em',
                            padding: "5px",
                            margin: "10px",
                            left: 'auto',
                            right: '0px',
                        }}
                        buttonStyle={{ 
                            background: "#5290F4", 
                            color: "#FFFFFF", 
                            fontSize: "15px",
                            fontWeight: 700,
                            borderRadius:'5px',
                            width: '170px',
                            height: '38px',
                        }}
                        expires={150}
                        onAccept={() => {
                            window.location.reload();
                        }}
                    >
                        <p className='text-[24px] font-medium font-DM_Sans'>Cookies & Privacy</p>
                        <span className='text-[18px] font-DM_Sans font-normal'>This website uses cookies to ensure you</span>
                    </CookieConsent>
                </div>
                <div className='hidden sm:block'>
                    <CookieConsent
                        location="bottom"
                        buttonText="Accept"
                        style={{ 
                            background: "#FFFFFF",
                            color: "#111111",
                            width: '420px',
                            height: 'auto', 
                            display: 'flex',
                            justifyContent: 'flex-end',
                            borderRadius:'1em',
                            padding: "5px",
                            margin: "30px",
                            left: 'auto',
                            right: '0px',
                        }}
                        buttonStyle={{ 
                            background: "#5290F4", 
                            color: "#FFFFFF", 
                            fontSize: "15px",
                            fontWeight: 700,
                            borderRadius:'5px',
                            width: '170px',
                            height: '38px',
                        }}
                        expires={150}
                        onAccept={() => {
                            window.location.reload();
                        }}
                    >
                        <p className='text-[24px] font-medium font-DM_Sans'>Cookies & Privacy</p>
                        <span className='text-[18px] font-DM_Sans font-normal'>This website uses cookies to ensure you</span>
                    </CookieConsent>
                </div>
            </div>
        </div>
	)
}
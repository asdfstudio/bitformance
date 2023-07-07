import React from 'react';
import CookieConsent, { Cookies } from "react-cookie-consent";

export default function CookiePopup() {

	return(

        <div className="overflow-y-auto font-DM_Sans">
            <div className='block sm:hidden'>
                <CookieConsent
                    location="bottom"
                    buttonText="Got It"
                    style={{ 
                        background: "rgba(255,255,255, 1)",
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
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: '#E2EAF1',
                        boxShadow: '0px 18px 18px rgba(67,82,116, 0.12), 0px 0px 1px rgba(67,82,116, 0.1)'
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
                    
                    enableDeclineButton
                    hideonDecline={false}
                    onDecline={() => {
                        document.cookie = "CookieConsent= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
                        window.open('https://google.com/', '_blank', 'noopener,noreferrer');
                        window.location.reload();
                    }}
                    declineButtonText="More info"
                    declineButtonStyle={{ 
                        background: "#FFFFFF", 
                        color: "#5290F4", 
                        fontSize: "15px",
                        fontWeight: 700,
                        borderRadius:'5px',
                        width: '100px',
                        height: '38px',
                        textDecoration: 'underline'
                    }}
                >
                    <p className='text-[24px] font-medium font-DM_Sans'>Cookies & Privacy</p>
                    <span className='text-[18px] font-DM_Sans font-normal'>This website uses cookies to enhance the user experience.</span>
                </CookieConsent>
            </div>
            <div className='hidden sm:block'>
                <CookieConsent
                    location="bottom"
                    buttonText="Got It"
                    style={{ 
                        background: "rgba(255,255,255, 1)",
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
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: '#E2EAF1',
                        boxShadow: '0px 18px 18px rgba(67,82,116, 0.12), 0px 0px 1px rgba(67,82,116, 0.1)'
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
                    expires={7}

                    enableDeclineButton
                    hideonDecline={false}
                    onDecline={() => {
                        document.cookie = "CookieConsent= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
                        window.open('https://google.com/', '_blank', 'noopener,noreferrer');
                        window.location.reload();
                    }}
                    declineButtonText="More info"
                    declineButtonStyle={{ 
                        background: "#FFFFFF", 
                        color: "#5290F4", 
                        fontSize: "15px",
                        fontWeight: 700,
                        borderRadius:'5px',
                        width: '100px',
                        height: '38px',
                        textDecoration: 'underline'
                    }}

                >
                    <p className='text-[24px] font-medium font-DM_Sans'>Cookies & Privacy</p>
                    <span className='text-[18px] font-DM_Sans font-normal'>This website uses cookies to enhance the user experience.</span>
                </CookieConsent>
            </div>
        </div>
	)
}
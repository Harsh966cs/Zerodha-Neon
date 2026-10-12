import { SignUpButton } from '@clerk/clerk-react'
import React from 'react'

const OpenAccount = () => {
  return (
<div className='container p-5'>
        <div className='row text-center' >
            <h1>Open a Zerodha account</h1>
            <p style={{color:"gray",marginTop:"30px",marginBottom:"30px"}}>Simple and intuitive apps · ₹0 for investments · ₹20 for intraday and F&O trades.</p>
            <SignUpButton mode="modal">
              <button className="btn btn-primary p-2 fs-5" style={{ width: "20%", margin: "0 auto" }}>
                Sign up for free
              </button>
            </SignUpButton>
        </div>
    </div>
  )
}

export default OpenAccount
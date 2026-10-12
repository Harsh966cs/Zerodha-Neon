import React from 'react'

const Kite = () => {
  return (
    <div className='container' style={{backgroundColor:"#f6fbff" }}>
      <div className='row'>
        <div className='col-3'>
          <img src='media\kc-logo-landing.svg' alt="Kite Connect logo"/>
        </div>
        <div className='col-4'>
          <p>Need more? Build your own trading and investing experience with Kite Connect, simple HTTP APIs to place orders, stream market data, manage your account, and more. Explore </p>
        </div>
        <div className='col-3'>
             <img src='media\kc-banner-image.svg' alt="Kite Connect banner"/>
        </div>
      </div>
    </div>
  )
}

export default Kite
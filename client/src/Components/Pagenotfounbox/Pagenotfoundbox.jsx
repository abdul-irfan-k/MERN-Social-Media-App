import React from 'react'
import { useNavigate } from 'react-router'
import './css/index.css'

const Pagenotfoundbox = () => {
    const navigate = useNavigate()


  return (
    <>
      <div className='errorpage-box'>
        <span className='errorpage-box__header'>
            4<span className='errorpage-box__header-blue'>0</span>4
        </span>
        <span className='errorpage-box__textheader'>OPPS! PAGE NOT FOUND</span>
        <span className='errorpage-box__content'>
            Sorry, the page you're looking for doesn't exist. If you think something 
            is broken, report a problem
        </span>
        <div className='errorpage-box__buttonbox'>
        <div className='errorpage-box__buttonbox-button bg-blue' onClick={() => navigate('/')}>Return Home</div>
        <div className='errorpage-box__buttonbox-button b-blue'>Report Problem</div>

        </div>
      </div>
    </>
  )
}

export default Pagenotfoundbox

import React from 'react'
import { useLocation } from 'react-router-dom'

const HeaderCard = ({ title, subtitle, describtion1, describtion2, image }) => {
    const path = useLocation().pathname
  return (
        <div className='py-3 px-5 m-3 text-white rounded rounded-4 header-bg'>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 d-flex align-items-center">
                <div>
                  <h3>{title} <span>{subtitle}</span></h3>
                  <p className='py-2'>{describtion1} <br/>{describtion2}</p>
                </div>
              </div>
              <div className="col-md-4 text-end">
                <img className={`${path ==='/dashboard' ? 'w-75 ' : 'w-50'}`} src={image} alt="header-photo" />
              </div>
            </div>
          </div>
        </div>
  )
}

export default HeaderCard
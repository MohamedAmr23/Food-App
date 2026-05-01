import React from 'react'
import noDataImage from '../assets/no-data.png'
const NoData = () => {
  return (
    <div className='text-center' style={{ width: '48%' , margin: '0 auto'}}>
        <img src={noDataImage} alt="No Data" className='my-4' />
        <h3>No Data !</h3>
        <p style={{color:'#49494999'}}>are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </div>
  )
}

export default NoData
import React from 'react'
import image1 from '../assets/image 1.png'
import image2 from '../assets/Vector (4).png'
import '../Styling/Default.css'

function Default() {
  return (
    <>
    <div className='default'>
    <div className='first'>
    <div className='part-1'>
      <img src={image1} alt="default" className='notebook'/>
    </div>
    <div className='part-2'>
     Pocket Notes
    </div>
    <div className='part-3'>
    Send and receive messages without keeping your phone online.
    Use Pocket Notes on up to 4 linked devices and 1 mobile phone
    </div>
   </div>
   <div className='second'>
       <div className='locker'>
       <img src={image2} alt="locker"/>
       </div>
       <div className='encryption'>
       end-to-end encrypted
       </div>
   </div>
   </div>
   </>
  )
}

export default Default

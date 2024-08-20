// import React from 'react'
import img1 from '../imgs/img1.png'
import img2 from '../imgs/img2.png'
import img3 from '../imgs/img3.png'
const Testimonial = () => {
  return (
    <div>
      <h3 className='text-center'>Testimonial</h3>
      <h4 className='text-center'>What our <span style={{color:"#e91e63"}}> customers</span> are saying</h4>
    <div className='ms-2 me-2 row d-flex flex-row align-items-center justify-content-evenly'>  
    <div className='col-12 col-md mt-4 d-flex flex-column align-items-center justify-content-center'><img className='rounded-circle' src={img1} alt="" style={{height:"100px", width:"100px"}}/><p className="text-center" style={{fontSize:"12px", fontWeight:"bold"}}>Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidemy 90's cronut + 1 kinfolk. Single-origin coffee ennul shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware</p><div style={{width:"50px", border:"1px solid red"}}/><div>Raj gahlot</div><div style={{fontWeight:"500"}}>Senior Product Designer</div></div>
    <div className='col-12 col-md mt-4 d-flex flex-column align-items-center justify-content-center'><img className='rounded-circle' src={img2} alt="" style={{height:"100px", width:"100px"}}/><p className="text-center" style={{fontSize:"12px", fontWeight:"bold"}}>Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidemy 90's cronut + 1 kinfolk. Single-origin coffee ennul shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware</p><div style={{width:"50px", border:"1px solid red"}}/><div>S MISHRA</div><div style={{fontWeight:"500"}}>UI DEVELOPER</div></div>
    <div className='col-12 col-md mt-4 d-flex flex-column align-items-center justify-content-center'><img className='rounded-circle' src={img3} alt="" style={{height:"100px", width:"100px"}}/><p className="text-center" style={{fontSize:"12px", fontWeight:"bold"}}>Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidemy 90's cronut + 1 kinfolk. Single-origin coffee ennul shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware</p><div style={{width:"50px", border:"1px solid red"}}/><div>XYZ</div><div style={{fontWeight:"500"}}>UI DEVELOPER</div></div></div>
    </div>
  )
}

export default Testimonial
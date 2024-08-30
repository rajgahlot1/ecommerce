// ismport React, { useEffect } from 'react';
import gif from '../imgs/gif.gif'

const WelcomePage = () => {
  
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //       onRedirect();
    //     }, 4000);
    
    //     return () => clearTimeout(timer); // Clear timeout if component unmounts
    //   }, [onRedirect]);
    
  return (<div className='welcome' style={{height:"100vh", cursor:"progress"}}>
    <div  style={{ textAlign: 'center', paddingTop: '20px' }}>
   <img src={gif} className='img-fluid'  alt="" style={{maxHeight:"400px"}}/>
   <h2  style={{fontFamily:"n",fontWeight:"500",fontSize:"50px"}}>WELCOME TO OUR WEBSITE</h2>
   
    <p className="fst-italic position-absolute bottom-0 w-100 text-center">Created By Raj Gahlot</p>
    </div></div>
  );
};

export default WelcomePage;

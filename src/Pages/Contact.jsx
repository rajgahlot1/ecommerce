import { useState } from "react"
import emailjs from '@emailjs/browser';
export default function Contact(){
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [number,setNumber]=useState();
  const [meassage,setMeassage]=useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceId = 'service_hfk9w4t';
    const templateId = 'template_d84b9cq';
    const publicKey = 'OcQRumsbmdO9eBiR1';
    const templateParams = {
      from_name: name,
      from_email: email,
      from_number: number,
      to_name: "yash tomar",
      message: meassage,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully", response);
        setName('');
        setEmail('');
        setNumber('');
        setMeassage('');
      })
      .catch((error) => {
        console.log('FAILED...', error.text);
      });
  };
  return(
    <>
      <div className="d-flex text-center  w-100 align-items-center justify-content-center" style={{height:"100vh"}}>
        <div className="dalju flex-column py-5 position-relative p-3" style={{width:"380px",borderRadius:"7px",background:"#ffd6d6",border:"2px solid #e6e5e5"}}>
      <h3 style={{color:"#f94144"}}>Contact Me</h3>
      <form
        onSubmit={handleSubmit}
        className="position-relative d-flex  align-items-center flex-column w-100"
        style={{ gap: "9px", marginTop: "30px" }}

      >

          <div className="username position-relative  mt-2">
            <input
              className="iinputt"
              type="text"
             value={name}
              onChange={(e)=>setName(e.target.value)}
              required
            />
            <label className="lable" htmlFor="username">
             Enter Your Name
            </label>
          </div>


        <div className="email position-relative  mt-2">
          <input
             className="iinputt"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          <label className="lable" htmlFor="text">
            Enter Your Email
          </label>
        </div>

        <div className="password position-relative  mt-2">
          <input
             className="iinputt"
            type="text"
            value={number}
            onChange={(e)=>setNumber(e.target.value)}
            required
          />

          <label className="lable" htmlFor="text">
           Enter our Mobile no..
          </label>



        </div>
         
         <div className="password position-relative  mt-2">
         <textarea
           value={meassage}
           onChange={(e)=>setMeassage(e.target.value)}
           placeholder="Enter discription" style={{color:"black",background:"#e3e3e3",outline:"none",padding:"10px 16px",border:"none",borderRadius:"10px",width:"350px"}}></textarea>
         </div>

        <button type="submit" className="btnn w-100" style={{height:"44px",borderRadius:"7px"}}>
        Submit
        </button>
      </form>
      </div>
      </div>
    </>
  )
}

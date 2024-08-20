import { useState } from 'react';

export default function BuyNowModels({ addressInfo, setaddressInfo, BuyNowFunction }) {
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  // Updated function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the BuyNowFunction and wait for it to complete
      await BuyNowFunction();
      // If successful, close the form
      setOpen(false);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <>
      <button onClick={handleOpen} className='btnn w-100 rounded rounder-3' style={{ height: "47px" }}>Buy now</button>
      {open && (
        <div className="d-flex text-center w-100 align-items-center justify-content-center" style={{ height: "100vh", background: "transparent" }}>
          <div className="dalju flex-column py-5 position-relative p-3" style={{ width: "380px", borderRadius: "7px", background: "#ffd6d6", border: "2px solid #e6e5e5" }}>
            <form onSubmit={handleSubmit} className="position-relative d-flex align-items-center flex-column w-100" style={{ gap: "9px" }}>
              <div className="username position-relative mt-2">
                <input
                  className="iinputt"
                  type="text"
                  value={addressInfo.name}
                  onChange={(e) => setaddressInfo({ ...addressInfo, name: e.target.value })}
                  required
                />
                <label className="lable" htmlFor="username">Enter your name</label>
              </div>
              <div className="username position-relative mt-2">
                <input
                  className="iinputt"
                  type="text"
                  value={addressInfo.address}
                  onChange={(e) => setaddressInfo({ ...addressInfo, address: e.target.value })}
                  required
                />
                <label className="lable" htmlFor="username">Enter your address</label>
              </div>
              <div className="username position-relative mt-2">
                <input
                  className="iinputt"
                  type="text"
                  value={addressInfo.pincode}
                  onChange={(e) => setaddressInfo({ ...addressInfo, pincode: e.target.value })}
                  required
                />
                <label className="lable" htmlFor="username">Enter your pincode</label>
              </div>
              <div className="username position-relative mt-2">
                <input
                  className="iinputt"
                  type="text"
                  value={addressInfo.mobilenumber}
                  onChange={(e) => setaddressInfo({ ...addressInfo, mobilenumber: e.target.value })}
                  required
                />
                <label className="lable" htmlFor="username">Enter your mobile number</label>
              </div>
              <button type='submit' className="btnn w-100" style={{ height: "48px", borderRadius: "8px" }}>
                Buy Now
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

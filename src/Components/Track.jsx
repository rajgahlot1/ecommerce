import { PiHandbagBold } from "react-icons/pi";
const Track = () => {
  return (
    <div className="d-flex align-items-center justify-content-evenly row m-3">
      <div
        className="d-flex flex-column align-items-center col-sm col-9 m-3 pb-2 pt-2 text-center"
        style={{ borderRadius: "10px", boxShadow: "0 0 10px 1px #4e4e4e" }}>
        <div>
          <PiHandbagBold size={30} color="#e91e63" />
        </div>
        <div>Premium Tshirt</div> <div>Our Tshirt are made of 100% cotton</div>
      </div>
      <div
        className="d-flex flex-column align-items-center col-sm col-9 m-3 pb-2 pt-2 text-center"
        style={{ borderRadius: "10px", boxShadow: "0 0 10px 1px #4e4e4e" }}>
        <div>
          <PiHandbagBold size={30} color="#e91e63" />
        </div>
        <div>Premium Tshirt</div> <div>Our Tshirt are made of 100% cotton</div>
      </div>
      <div
        className="d-flex flex-column align-items-center col-sm col-9 m-3 pb-2 pt-2 text-center"
        style={{ borderRadius: "10px", boxShadow: "0 0 10px 1px #4e4e4e" }}>
        <div>
          <PiHandbagBold size={30} color="#e91e63" />
        </div>
        <div>Premium Tshirt</div> <div>Our Tshirt are made of 100% cotton</div>
      </div>
    </div>
  );
};

export default Track;

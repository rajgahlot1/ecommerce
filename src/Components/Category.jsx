// import React from 'react'

import product1 from "../imgs/product1.png";
import product2 from "../imgs/product2.png";
import product3 from "../imgs/product3.png";
import product4 from "../imgs/product4.png";
import product5 from "../imgs/product5.png";
import product6 from "../imgs/product6.png";
import product7 from "../imgs/product7.png";
import product8 from "../imgs/product8.png";

import { useNavigate } from "react-router-dom";

export default function Cathogary() {
  const navigate = useNavigate();
  const cathArr = [
    { img: product2, name: "Fashion" },
    { img: product1, name: "Shoes" },
    { img: product8, name: "Jacket" },
    { img: product4, name: "Mobile" },
    { img: product5, name: "Laptop" },
    { img: product6, name: "Books" },
    { img: product7, name: "Jacket" },
    { img: product3, name: "Laptop" },
  ];

  return (
    <>
      <div
        className=" Cath_main w-100 p-3 d-flex gap-3 justify-content-between"
        style={{ overflowX: "scroll", scrollbarWidth: "none" }}
      >
        {cathArr.map((val, id) => {
          return (
            <div
              key={id}
              className="d-flex flex-column gap-2 align-items-center"
              style={{ cursor: "pointer" }}
            >
              <div
                className="Cath_circ
               le bg- dalju"
                style={{
                  height: "130px",
                  aspectRatio: "1",
                  borderRadius: "50%",
                  background: "#e9edc9",
                }}
              >
                <img
                  src={val.img}
                  alt="cath_imgss"
                  style={{
                    height: "130px",
                    aspectRatio: "1",
                    borderRadius: "50%",
                  }}
                  onClick={() => navigate(`/ecommerce/category/${val.name}`)}
                />
              </div>
              <h5>{val.name}</h5>
            </div>
          );
        })}
      </div>
    </>
  );
}

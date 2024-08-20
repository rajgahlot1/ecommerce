// import React from 'react'

import { useNavigate } from "react-router-dom";
import product1 from "../imgs/product1.png";
import product2 from "../imgs/product2.png";
import product3 from "../imgs/product3.png";
import product4 from "../imgs/product4.png";
import product5 from "../imgs/product5.png";
import product6 from "../imgs/product6.png";
import product7 from "../imgs/product7.png";
import product8 from "../imgs/product8.png";

const Category = () => {
  const productData = [
    { img: product2, name: "Fashion" },
    { img: product1, name: "Shoes" },
    { img: product8, name: "Jacket" },
    { img: product4, name: "Mobile" },
    { img: product5, name: "Laptop" },
    { img: product6, name: "Books" },
    { img: product7, name: "Jacket" },
    { img: product3, name: "Laptop" },
  ];
  const navigate= useNavigate();
  return (
    <div
      className="ms-2 d-flex gap-2 gap-lg-4 mt-1 mb-2"
      style={{ overflow: "hidden" }}
    >
      {productData.map((val, ind) => {
        return (
          <div
          onClick={()=>navigate(`/ecommerce/category/${val.name}`)}
            key={ind}
            className="d-flex flex-column align-items-center justify-content-center"
          style={{cursor:"pointer"}}
          >
            <div
              className="rounded-circle"
              style={{ background: "#c6ac8f", overflow: "hidden" }}
              
            >
              <img
                src={val.img}
                alt=""
                style={{ height: "130px", width: "130px", aspectRatio: "1/1" }}
              />
            </div>
            <div className="fw-bold">{val.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Category;

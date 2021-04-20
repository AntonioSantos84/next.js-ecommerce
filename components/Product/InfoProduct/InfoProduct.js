import React from "react";
import ReactPlayer from "react-player/lazy";
import CarouselScreenshots from "../CarouselScreenshots";
import moment from "moment"

export default function InfoProduct(props) {
  const { product } = props;
  const { description } = product;
  return (
    <>
      <div className="info-product__content">
        <div dangerouslySetInnerHTML={{ __html: description }} />
        <div className="info-product__content-date">
          <h4>Available from:</h4>
          <p>{moment(product.add_date).format("LL")}</p>
        </div>
      </div>

      <CarouselScreenshots
        name={product.title}
        screenshots={product.galery}
      />
    </>
  );
}

import React, { useState } from "react";
import { Image, Modal } from "semantic-ui-react";
import Slider from "react-slick";
import { map } from "lodash";

const setting = {
  className: "Carousel-screenshots",
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  swipeToSlider: true,
};

export default function CarouselScreenshots(props) {
  const { title, galery } = props;
  const [showModal, setShowModal] = useState(false);
  const [urlImage, setUrlImage] = useState(null);

  const openImage = (url) => {
    setUrlImage(url);
    setShowModal(true);
  }


  return (
      <>
    <Slider {...setting}>
    {map(galery, (screenshots) => (
        <Image 
            key={galery.id}
            src={galery.url}
            alt={galery.alternativeText}
            onClick={() => openImage(galery.url)}
        />
    ))}

    </Slider>
    <Modal open={showModal} onClose={() => setShowModal(false)} size="large">
        <Image src={urlImage} alt={title} />
    </Modal>
    </>
  );
}

import React, { useState } from "react";
import { Image, Icon } from "semantic-ui-react";
import link from "next/link";
import moment from "moment";
import "moment/locale/es";
import BasicModal from "../../Modal/BasicModal";
import Link from "next/link";

export default function Order(props) {
  const { order } = props;
  const { product, totalPayment, createdAt, addressShipping } = order;
  const { title, image, url } = product;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="order">
        <div className="order__info">
          <div className="order__info-data">
            <Link href={`/${url}`}>
              <a>
                <Image src={image.url} alt={title} />
              </a>
            </Link>
            <div>
              <h2>{title}</h2>
              <p>&#163; {totalPayment}</p>
            </div>
          </div>
          <div className="order__other">
            <p className="order__other-date">
              {moment(createdAt).format("L")} - {moment(createdAt).format("LT")}
            </p>
            <Icon name="eye" circular link onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>

      <AddressModal
        showModal={showModal}
        setShowModal={setShowModal}
        addressShipping={addressShipping}
        title={title}
      />
    </>
  );
}

function AddressModal(props) {
  const { showModal, setShowModal, addressShipping, title } = props;
  return (
    <BasicModal
      show={showModal}
      setShow={setShowModal}
      size="tiny"
      title={title}
    >
      <h3>The order has been sent to the following address.</h3>
      <div>
        <p>{addressShipping.name}</p>
        <p>{addressShipping.address}</p>
        <p>
          {addressShipping.state}, {addressShipping.city},{" "}
          {addressShipping.postalCode}
        </p>
        <p>{addressShipping.phone}</p>
      </div>
    </BasicModal>
  );
}

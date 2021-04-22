import React, { useState, useEffect } from "react";
import { size } from "lodash";
import { Grid, Image, Icon, Button, Modal } from "semantic-ui-react";
import classNames from "classNames";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import {
  isWishlistAPI,
  addWishlistApi,
  deleteWishlistApi,
} from "../../../api/wishlist";

export default function HeaderProduct(props) {
  const { product } = props;
  const [showModal, setShowModal] = useState(false);
  const [urlimagen, setUrlImage] = useState(null);

  const openImage = (url) => {
    setUrlImage(url);
    setShowModal(true);
  };

  return (
    <>
      <Grid className="header-product">
        <Grid.Column mobile={16} tablet={6} computer={5}>
          <Image
            src={product.urlimagen}
            alt={product.title}
            onClick={() => openImage(product.urlimagen)}
            fluid
          />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={10} computer={11}>
          <InfoProduct product={product} />
        </Grid.Column>
      </Grid>
      <Modal open={showModal} onClose={() => setShowModal(false)} size="large">
        <Image src={urlimagen} alt={product.title} />
      </Modal>
    </>
  );
}

function InfoProduct(props) {
  const { product } = props;
  const { title, description, price, discount, url } = product;
  const [isWishlist, setIsWishlist] = useState(false);
  const [reloadWishlist, setReloadWishlist] = useState(false);
  const { auth, logout } = useAuth();
  const { addProductCart } = useCart();

  useEffect(() => {
    (async () => {
      const response = await isWishlistAPI(auth.idUser, product.id, logout);
      if (size(response) > 0) setIsWishlist(true);
      else setIsWishlist(false);
    })();
    setReloadWishlist(false);
  }, [product, reloadWishlist]);

  const addWishlist = async () => {
    if (auth) {
      await addWishlistApi(auth.idUser, product.id, logout);
      setReloadWishlist(true);
    }
  };

  const removeWishlist = async () => {
    if (auth) {
      await deleteWishlistApi(auth.idUser, product.id, logout);
      setReloadWishlist(true);
    }
  };

  return (
    <>
      <div className="header-product__title">
        {title}{" "}
        <Icon
          name={isWishlist ? "heart" : "heart outline"}
          className={classNames({ like: isWishlist })}
          link
          onClick={isWishlist ? removeWishlist : addWishlist}
        />
      </div>
      <div
        className="header-product__summary"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className="header-product__buy">
        <div className="header-product__buy-price">
          <p>Recommended retail price: &#163;{price}</p>
          <div className="header-product__buy-price-actions">
            <p>Discount: -{discount}%</p>
            <p>
              Final Price: &#163;
              {(price - Math.floor(price * discount) / 100).toFixed(2)}
            </p>
          </div>
        </div>
        <Button
          className="header-product__buy-btn"
          onClick={() => addProductCart(url)}
        >
          Add to Cart
        </Button>
      </div>
    </>
  );
}

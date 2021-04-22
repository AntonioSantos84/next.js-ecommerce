import React, { useState, useEffect } from "react";
import { size, forEach } from "lodash";
import { Loader } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout";
import { getWishlistApi } from "../api/wishlist";
import useAuth from "../hooks/useAuth";
import ListProducts from "../components/ListProducts";

export default function wishlist() {
  const [products, setProducts] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getWishlistApi(auth.idUser, logout);
      if (size(response) > 0) {
        const productsList = [];
        forEach(response, (data) => {
          productsList.push(data.product);
        });
        setProducts(productsList);
      } else {
        setProducts([]);
      }
    })();
  }, []);
  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__block">
        <div className="title">Wishlist</div>
        <div className="data">
          {!products && <Loader active>Loading Products...</Loader>}
          {products && size(products) === 0 && (
            <div className="data__not-found">
              <h3>You have no products on your wish list</h3>
            </div>
          )}
          {size(products) > 0 && <ListProducts products={products} />}
        </div>
      </div>
    </BasicLayout>
  );
}

import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { seachProductApi } from "../api/product";
import ListProduct from "../components/ListProducts";
import Seo from "../components/Seo"

export default function search() {
  const [products, setProducts] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    document.getElementById("search-product").focus();
  }, []);

  useEffect(() => {
    (async () => {
      if (size(query.query) > 0) {
        const response = await seachProductApi(query.query);
        if (size(response) > 0) setProducts(response);
        else setProducts([]);
      } else {
        setProducts([]);
      }
    })();
  }, [query]);

  return (
    <BasicLayout className="search">
    <Seo title={`Searching: ${query.query}`} />
      {!products && <Loader active> Searching products...</Loader>}
      {products && size(products) === 0 && (
        <div>
          <h3>Products not found</h3>
        </div>
      )}
      {size(products) > 0 && <ListProduct products={products} />}
    </BasicLayout>
  );
}

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { size } from "lodash";
import { Loader } from "semantic-ui-react";
import BasicLayout from "../../layouts/BasicLayout";
import {
  getProductsCategoryApi,
  getTotalProductsCategoryApi,
} from "../../api/product";
import ListProducts from "../../components/ListProducts";
import Pagination from "../../components/Pagination";
import Seo from "../../components/Seo";

const limitPerPage = 50;

export default function Category() {
  const { query } = useRouter();
  const [products, setProducts] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);

  const getStartItem = () => {
    const currentPage = parseInt(query.page);
    if (!query.page || currentPage === 1) return 0;
    else return currentPage * limitPerPage - limitPerPage;
  };

  useEffect(() => {
    (async () => {
      if (query.category) {
        const response = await getProductsCategoryApi(
          query.category,
          limitPerPage,
          getStartItem()
        );
        setProducts(response);
      }
    })();
  }, [query]);

  useEffect(() => {
    (async () => {
      const response = await getTotalProductsCategoryApi(query.category);
      setTotalProducts(response);
    })();
  }, [query]);

  return (
    <BasicLayout className="category">
      <Seo
        title={query.category}
        description="Beauty category. A huge catalogue of beauty products"
      />
      {!products && <Loader active>Loading Products...</Loader>}
      {products && size(products) === 0 && <div>No products</div>}
      {size(products) > 0 && <ListProducts products={products} />}

      {totalProducts ? (
        <Pagination
          totalProducts={totalProducts}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={limitPerPage}
        />
      ) : null}
    </BasicLayout>
  );
}

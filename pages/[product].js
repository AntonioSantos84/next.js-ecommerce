import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import BasicLayout from "../layouts/BasicLayout"
import {getProductbyUrlApi} from "../api/product"
import HeaderProduct from "../components/Product/HeaderProduct"
import TabsProduct from "../components/Product/TabsProduct"
import Seo from "../components/Seo"

export default function Product() {
    const [product, setProduct] = useState(null);
    const {query} = useRouter();

useEffect(() => {
    (async () => {
        const response = await getProductbyUrlApi(query.product);
        setProduct(response);
    })()
}, [query]);

if (!product) return null;

    return (
        <BasicLayout>
        <Seo title={product.title}
            description={product.description}
        />
            <HeaderProduct product={product} />
            <TabsProduct product={product}/>
        </BasicLayout>
    )
}

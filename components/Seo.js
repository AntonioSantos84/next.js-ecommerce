import React from 'react'
import Head from "next/head"

export default function Seo(props) {
    const {title, description} = props;
    return (
        <Head>
            <title>{title}</title>
            <meta property="description" content={description} />
        </Head>
    )
}


Seo.defaultProps = {
    title: "CREOATE - Wholesale for Independents",
    description: "Discover unique wholesale products and buy with just a few clicks. Shop from independent brands with stress-free shopping anytime, day or night."
}
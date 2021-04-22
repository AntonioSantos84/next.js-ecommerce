import { map, size } from "lodash";
import { Image, Grid } from "semantic-ui-react";
import Link from "next/link";
import useWindowSize from "../../hooks/useWindowSize";
import {
  breakpointUpSm,
  breakpointUpMb,
  breakpointUpLg,
  breakpointUpXL,
} from "../../utils/breakpoints";

export default function ListProducts(props) {
  const { products } = props;
  const { width } = useWindowSize();

  const getColumnsRender = () => {
    switch (true) {
        case width > breakpointUpXL:
        return 5;
      case width > breakpointUpLg:
        return 5;
      case width > breakpointUpMb:
        return 3;
      case width > breakpointUpSm:
        return 2;
      default:
        return 1;
    }
  };

  return (
    <div className="list-products">
        <p>Total Products: {size(products)}</p>
      <Grid>
        <Grid.Row columns={getColumnsRender()}>
          {map(products, (product) => (
            <Product key={product.id} product={product} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

/* <Image src={product.thumbnail_url} alt={product.name} for server Strapi*/
function Product(props) {
  const { product } = props;

  return (

    <Grid.Column className="list-products__product">
      <Link href={`/${product.url}`}>
      
        <a>
          <div className="list-products__product-img">
            <Image src={product.urlimagen} alt={product.title} />
            <div className="list-products__product-img-info">
              {product.discount ? (
                <span className="discount">-{product.discount}%</span>
              ) : (
                <span />
              )}
              <span className="price">&#163;{product.price}</span>
            </div>
          </div>
          <h2>{product.title}</h2>
        </a>
      </Link>
    </Grid.Column>
  );
}

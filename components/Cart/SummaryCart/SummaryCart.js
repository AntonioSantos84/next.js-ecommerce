import React, { useState, useEffect } from "react";
import { Table, Image, Icon } from "semantic-ui-react";
import { forEach, map } from "lodash";
import useCart from "../../../hooks/useCart";

export default function SummaryCart(props) {
  const { products, reloadcart, setReloadCart } = props;
  const [totalPrice, setTotalPrice] = useState(0);
  const { removeProductCart } = useCart();

  useEffect(() => {
    let price = 0;
    forEach(products, (product) => {
      price += product.price;
    });
    setTotalPrice(price);
  }, [reloadcart, products]);

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  };

  return (
    <div className="summary-cart">
      <div className="title">Cart summary</div>

      <div className="data">
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Delivery</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(products, (product) => (
              <Table.Row key={product.id} className="summary-cart__product">
                <Table.Cell>
                  <Icon
                    name="close"
                    link
                    onClick={() => removeProduct(product.url)}
                  />
                  <Image src={product.urlimagen} alt={product.title} />
                  {product.title}
                </Table.Cell>
                <Table.Cell>{product.title}</Table.Cell>
                <Table.Cell>24h to 48h</Table.Cell>
                <Table.Cell>&#163;{product.price}</Table.Cell>
              </Table.Row>
            ))}
            <Table.Row className="summary-cart__resume">
              <Table.Cell className="clear"></Table.Cell>
              <Table.Cell colSpan="2">Total:</Table.Cell>
              <Table.Cell className="total-price">
                &#163; {totalPrice.toFixed(2)}
              </Table.Cell>
            </Table.Row>
            </Table.Body>
        </Table>
      </div>
    </div>
  );
}

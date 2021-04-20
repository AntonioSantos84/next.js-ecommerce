import React from "react";
import { Tab } from "semantic-ui-react";
import InfoProduct from "../InfoProduct"

export default function TabsProduct(props) {
  const { product } = props;

  const panes = [
    {
      menuItem: "Description",
      render: () => (
        <Tab.Pane>
          <InfoProduct product={product}/>
        </Tab.Pane>
      ),
    },
    {
        menuItem: "Delivery",
        render: () => (
          <Tab.Pane>
            <h1>Info Delivery</h1>
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Rating",
        render: () => (
          <Tab.Pane>
            <h1>Comments</h1>
          </Tab.Pane>
        ),
      },
  ];

  return (
    <Tab className="tab-product" panes={panes} />
  );
}

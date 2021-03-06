import React, { useState, useEffect, PureComponent } from "react";
import { Grid } from "semantic-ui-react";
import { map, size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { getOrdersApi } from "../api/order";
import useAuth from "../hooks/useAuth";
import Order from "../components/Orders/Order"
import Seo from "../components/Seo"

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getOrdersApi(auth.idUser, logout);
      console.log(response);
      setOrders(response || []);
    })();
  }, []);

  return (
    <BasicLayout className="orders">
    <Seo title="Creoate - My Orders" description="List of all orders placed" />
      <div className="orders__block">
        <div className="title">My orders</div>
        <div className="data">
          {size(orders) === 0 ? (
            <h2 style={{ textAlign: "center" }}>
              You have not made any purchases yet.
            </h2>
          ) : (
            <OrderList orders={orders} key={orders.idPayment}/>
          )}
        </div>
      </div>
    </BasicLayout>
  );
}

function OrderList(props) {
  const { orders } = props;

  return (
    <Grid>
      {map(orders, (order) => (
        <Grid.Column mobile={16} tablet={6} computer={8}>
          <Order order={order}/>
        </Grid.Column>
      ))}
    </Grid>
  );
}

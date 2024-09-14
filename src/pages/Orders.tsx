import { Table } from "react-bootstrap";

import Heading from "@components/ui/Heading";
import Loader from "@components/feedback/Loader";
import Order from "@components/eCommerce/orders/Order";

import useOrders from "@hooks/useOrders";

export default function Orders() {
  const { loading, error, orders } = useOrders();

  return (
    <>
      <Heading title="your orders" />

      <Loader loading={loading} error={error} type="orders">
        <Table striped responsive bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Items</th>
              <th>TotalPrice</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <Order key={order?.id} {...order} />
            ))}
          </tbody>
        </Table>
      </Loader>
    </>
  );
}

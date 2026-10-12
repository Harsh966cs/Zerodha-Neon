import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { getToken } = useAuth();
  const { refreshTrigger } = useContext(GeneralContext);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (requestError) {
        setError(requestError.response?.data?.error || "Unable to load orders.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [getToken, refreshTrigger]);

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>
      {loading && <p>Loading orders...</p>}
      {error && <p className="loss">{error}</p>}
      {!loading && !error && orders.length === 0 && <p>No orders have been placed yet.</p>}
      {!loading && !error && orders.length > 0 && (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Instrument</th>
                <th>Type</th>
                <th>Qty.</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                  <td>{order.symbol}</td>
                  <td>{order.type}</td>
                  <td>{Number(order.qty)}</td>
                  <td>{Number(order.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Orders;

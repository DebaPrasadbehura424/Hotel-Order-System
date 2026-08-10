import { useEffect, useState } from "react";
import axios from "axios";

interface OrderedFood {
  foodName: string;
  quantity: number;
}

interface Order {
  id?: number;
  tableNumber: number;
  foods: OrderedFood[];
  orderTime?: string;
  status: string;
  totalAmount: number;
}

const API_URL = "http://localhost:5066/api/order";

function Order() {
  const [tableNumber, setTableNumber] = useState<number>(1);
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const [orders, setOrders] = useState<Order[]>([]);
  const [searchId, setSearchId] = useState<number>(0);
  const [searchOrder, setSearchOrder] = useState<Order | null>(null);

  // -------------------------
  // GET ALL
  // -------------------------
  const getAllOrders = async () => {
    try {
      const response = await axios.get(API_URL);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // -------------------------
  // ADD ORDER
  // -------------------------
  const addOrder = async () => {
    try {
      const newOrder: Order = {
        tableNumber: tableNumber,
        foods: [
          {
            foodName: foodName,
            quantity: quantity,
          },
        ],
        status: "Pending",
        totalAmount: totalAmount,
      };

      await axios.post(API_URL, newOrder);

      alert("Order added!");

      setFoodName("");
      setQuantity(1);
      setTotalAmount(0);

      getAllOrders();
    } catch (error) {
      console.log(error);
      alert("Failed to add order");
    }
  };

  // -------------------------
  // FIND BY ID
  // -------------------------
  const findById = async () => {
    try {
      const response = await axios.get(`${API_URL}/${searchId}`);

      setSearchOrder(response.data);
    } catch (error) {
      console.log(error);
      alert("Order not found");
    }
  };

  // -------------------------
  // UPDATE STATUS
  // -------------------------
  const updateStatus = async (id: number, status: string) => {
    try {
      await axios.put(`${API_URL}/${id}/status?status=${status}`);

      alert("Status updated");

      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  // -------------------------
  // DELETE
  // -------------------------
  const deleteOrder = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      alert("Order deleted");

      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  // Load orders when page opens
  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="container">
      <h1>🍽️ Hotel Order System</h1>

      {/* ADD ORDER */}

      <div className="card">
        <h2>Add Order</h2>

        <input
          type="number"
          placeholder="Table Number"
          value={tableNumber}
          onChange={(e) => setTableNumber(Number(e.target.value))}
        />

        <input
          type="text"
          placeholder="Food Name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <input
          type="number"
          placeholder="Total Amount"
          value={totalAmount}
          onChange={(e) => setTotalAmount(Number(e.target.value))}
        />

        <button onClick={addOrder}>Add Order</button>
      </div>

      {/* FIND BY ID */}

      <div className="card">
        <h2>Find Order</h2>

        <input
          type="number"
          placeholder="Order ID"
          value={searchId}
          onChange={(e) => setSearchId(Number(e.target.value))}
        />

        <button onClick={findById}>Find Order</button>

        {searchOrder && (
          <div className="result">
            <p>
              <strong>ID:</strong> {searchOrder.id}
            </p>

            <p>
              <strong>Table:</strong> {searchOrder.tableNumber}
            </p>

            <p>
              <strong>Food:</strong> {searchOrder.foods[0]?.foodName}
            </p>

            <p>
              <strong>Quantity:</strong> {searchOrder.foods[0]?.quantity}
            </p>

            <p>
              <strong>Status:</strong> {searchOrder.status}
            </p>

            <p>
              <strong>Total:</strong> ₹{searchOrder.totalAmount}
            </p>
          </div>
        )}
      </div>

      {/* ALL ORDERS */}

      <div className="card">
        <div className="header">
          <h2>All Orders</h2>

          <button onClick={getAllOrders}>Refresh</button>
        </div>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="orders">
            {orders.map((order) => (
              <div className="order" key={order.id}>
                <h3>Order #{order.id}</h3>

                <p>Table: {order.tableNumber}</p>

                <p>Food: {order.foods[0]?.foodName}</p>

                <p>Quantity: {order.foods[0]?.quantity}</p>

                <p>Total: ₹{order.totalAmount}</p>

                <p>
                  Status: <span className="status">{order.status}</span>
                </p>

                <div className="buttons">
                  <button onClick={() => updateStatus(order.id!, "Preparing")}>
                    Preparing
                  </button>

                  <button onClick={() => updateStatus(order.id!, "Ready")}>
                    Ready
                  </button>

                  <button
                    className="delete"
                    onClick={() => deleteOrder(order.id!)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;

// BuyButton.jsx
import React, { useContext } from "react";
import axios from "axios";
import { ShopContext } from "../src/context/ShopContext";

const BuyButton = ({ productId }) => {
  const { token, backendUrl, requireLogin } = useContext(ShopContext);

  const handleBuy = async () => {
    if (!requireLogin()) return;
    const res = await axios.post(
      backendUrl + "/api/product/buy",
      { productId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.data.success) {
      alert("Purchase successful!");
    } else {
      alert(res.data.message);
    }
  };

  return <button onClick={handleBuy}>Buy</button>;
};

export default BuyButton;
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const ProductContact = ({ sellerId }) => {
  const { getUserById } = useContext(ShopContext);
  const [contact, setContact] = useState("");

  useEffect(() => {
    let isMounted = true;
    if (!sellerId) return;
    getUserById(sellerId).then(user => {
      if (isMounted) {
        if (!user) {
          setContact("Not Provided");
        } else if (user.phone) {
          setContact(user.phone);
        } else {
          setContact("Not Provided");
        }
      }
    });
    return () => { isMounted = false; };
  }, [sellerId, getUserById]);

  return (
    <div className="mt-4">
      <div className="text-sm text-gray-700">
        <b>Contact Number:</b> {contact}
      </div>
      <div className="seller-contact flex items-center gap-2 mt-2">
        <span>Contact Seller:</span>
        {contact !== "Not Provided" && (
          <>
            <a
              href={`tel:${contact}`}
              className="text-blue-600 hover:underline font-semibold"
              title="Call seller"
            >
              {contact}
            </a>
            <a
              href={`https://wa.me/91${contact}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-green-600 hover:underline font-semibold"
              title="Chat on WhatsApp"
            >
              <img src="/whatsapp-icon.png" alt="WhatsApp" style={{width: '20px', display: 'inline'}} />
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductContact;

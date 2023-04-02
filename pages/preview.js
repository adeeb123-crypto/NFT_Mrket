import React from "react";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
// require('dotenv').config()

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe('pk_test_51MsNwiGSLhdIpRGtKswbNsAkGg5hG4PFMF9QcGGviP9D5ZyK7nuCAiwgwXEoeTR4TSt617zWMbwRKIiZXbsu54v5002422VNXD');

export default function PreviewPage() {
  const router = useRouter();
  const { success, cancled } = router.query;

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    //const query = new URLSearchParams(window.location.search);

    if (success !== undefined || cancled !== undefined) {
      if (success) {
        console.log("Order placed! You will receive an email confirmation.");
      }

      if (cancled) {
        console.log(
          "Order canceled -- continue to shop around and checkout when you’re ready."
        );
      }
    }
  }, [success, cancled]);

  return (
    <form action="/api/checkout_sessions" method="POST">
      <section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
      <style jsx>
        {`
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 400px;
          
            border-radius: 6px;
            justify-content: space-between;
          }
          button {
            height: 36px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </form>
  );
}

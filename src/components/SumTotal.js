import React from "react";
import CurrencyFormat from "react-currency-format";
import Naira from "react-naira";

function SumTotal({ cart }) {
  const subTotal = cart.reduce((acc, elem) => {
    if (elem.quantity >= 0) {
      return acc + elem.price * elem.quantity;
    } else return null;
  }, 0);

  return (
    <div>
      <span style={{ float: "left" }}>Subtotal ( {cart.length} Item )</span>
      <div>
        <strong>
          <Naira>{subTotal}</Naira>
        </strong>
      </div>
      {/* <CurrencyFormat
        renderText={(value) => (
          <>    
            <p>
              <strong>{value}</strong>
            </p>
          </>
        )}
        value={subTotal}
        decimalScale={2}
        thousandSeparator={true}
        displayType={"text"}
        prefix={"NGN"}
      /> */}
    </div>
  );
}

export default SumTotal;

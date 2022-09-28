import React from 'react';
import { useSelector } from 'react-redux';

export default function PaymentSuccess() {
  const userId = useSelector((state) => state.auth.userId);
  if (!userId) {
    window.localStorage.removeItem('order');
    window.localStorage.setItem(
      'order',
      JSON.stringify({
        complete: false,
        lineItems: [],
      })
    );
  }

  return (
    <>
      <div className="d-flex flex-column w-100 g-3 justify-content-center align-items-center">
        <h1>Thanks for your order!</h1>
        <p>We appreciate your business!</p>{' '}
        <p> You will be receiving an invoice to your email shortly. </p>
        <p>
          If you have any questions, please email{' '}
          <a href="mailto:admin@graceshopperrecords.com">
            admin@graceshopperrecords.com
          </a>
        </p>
      </div>
    </>
  );
}

import React from 'react';

export default function PaymentSuccess() {
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

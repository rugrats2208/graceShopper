import React from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../reducers/products/productsReducer';

const AddForm = () => {
  const dispatch = useDispatch();

  const [form, setForm] = React.useState({
    name: '',
    price: '',
    qty: '',
  });

  const handleClick = (evt) => {
    evt.preventDefault();
    dispatch(addProduct(form));
    setForm({
      name: '',
      price: '',
      qty: '',
    });
  };
  return (
    <form>
      <input
        onChange={(evt) => {
          setForm({ ...form, name: evt.target.value });
        }}
        value={form.name}
        type="text"
        placeholder="Enter Product Name"
      />
      <input
        onChange={(evt) => {
          setForm({ ...form, price: evt.target.value });
        }}
        value={form.price}
        type="number"
        placeholder="Enter Product Price"
      />
      <input
        onChange={(evt) => {
          setForm({ ...form, qty: evt.target.value });
        }}
        value={form.qty}
        type="number"
        placeholder="Enter Product Quantity"
      />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
};

export default AddForm;

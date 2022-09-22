import React from "react";

const EditForm = ({ data: { product, setItemEdit } }) => {
  const [form, setForm] = React.useState({
    name: product.name || "",
    price: product.price || "",
    qty: product.qty || "",
    img: product.img || "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(form);
    setItemEdit("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        required
        type="text"
        name="name"
        value={form.name}
        onChange={(evt) => {
          setForm({ ...form, name: evt.target.value });
        }}
      />
      <label>Price</label>
      <input
        required
        type="text"
        name="price"
        value={form.price}
        onChange={(evt) => {
          setForm({ ...form, price: evt.target.value });
        }}
      />
      <label>Quantity</label>
      <input
        required
        type="text"
        name="qty"
        value={form.qty}
        onChange={(evt) => {
          setForm({ ...form, qty: evt.target.value });
        }}
      />
      <label>Image Url</label>
      <input
        required
        type="text"
        name="img"
        value={form.img}
        onChange={(evt) => {
          setForm({ ...form, img: evt.target.value });
        }}
      />
      <button type="submit">Submit</button>
      <button onClick={() => setItemEdit("")}>Cancel</button>
    </form>
  );
};

export default EditForm;

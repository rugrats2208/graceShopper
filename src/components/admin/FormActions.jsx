import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  editProduct,
} from "../../reducers/products/productsReducer";
import { setOption } from "../../reducers/adminReducer";

function FormActions(props) {
  const dispatch = useDispatch();
  const { option, selection } = useSelector((state) => state.admin);
  const [form, setForm] = React.useState({
    name: "",
    price: "",
    qty: "",
    releaseDate: "",
    label: "",
  });

  const renderForm = (sel) => {
    switch (sel) {
      case "add":
        setForm({
          name: "",
          price: "",
          qty: "",
          releaseDate: "",
          label: "",
        });
        return;
      case "edit":
        setForm({
          name: selection.name,
          price: selection.price,
          qty: selection.qty,
          releaseDate: selection.releaseDate,
          label: selection.label,
        });
        return;
      default:
        return;
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    switch (option) {
      case "add":
        dispatch(addProduct(form));
        setForm({
          name: "",
          price: "",
          qty: "",
          releaseDate: "",
          label: "",
        });
        dispatch(setOption(""));
        return;
      case "edit":
        console.log(selection);
        dispatch(editProduct(selection.id));
        console.log("edit submitted");
        return;
      default:
        return;
    }
  };

  React.useEffect(() => {
    renderForm(option);
  }, [option]);

  return (
    <Form className="adminForm" onSubmit={handleSubmit}>
      <Row>
        <Col>
          <label htmlFor="name">Name</label>
          <Form.Control
            required
            onChange={(evt) => setForm({ ...form, name: evt.target.value })}
            placeholder="Enter Album Name"
            value={form.name}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <label htmlFor="price">Price</label>
          <Form.Control
            required
            type="number"
            onChange={(evt) => setForm({ ...form, price: evt.target.value })}
            placeholder="Enter Album Price"
            value={form.price}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <label htmlFor="quantity">Quantity</label>
          <Form.Control
            required
            type="number"
            onChange={(evt) => setForm({ ...form, qty: evt.target.value })}
            placeholder="Enter Album Quantity"
            value={form.qty}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <label htmlFor="label">Label</label>
          <Form.Control
            required
            type="text"
            onChange={(evt) => setForm({ ...form, label: evt.target.value })}
            placeholder="Enter Album Label"
            value={form.label}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <label htmlFor="release-date">Release Date</label>
          <Form.Control
            required
            type="date"
            onChange={(evt) =>
              setForm({ ...form, releaseDate: evt.target.value })
            }
            value={form.releaseDate}
          />
        </Col>
        <Button type="submit" variant="outline-success">
          Submit
        </Button>

        <Button
          onClick={() => dispatch(setOption(""))}
          type="reset"
          variant="outline-success"
        >
          Cancel
        </Button>
      </Row>
    </Form>
  );
}

export default FormActions;

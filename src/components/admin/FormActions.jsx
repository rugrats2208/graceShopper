import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useDispatch } from "react-redux";
import { addProduct } from "../../reducers/products/productsReducer";

function FormActions(props) {
  const dispatch = useDispatch();

  const [form, setForm] = React.useState({
    name: "",
    price: "",
    qty: "",
  });

  const renderForm = (sel) => {
    switch (sel) {
      case "add":
        setForm({
          name: "",
          price: "",
          qty: "",
        });
        return;
      case "edit":
        setForm({
          name: props.data.selection.name,
          price: props.data.selection.price,
          qty: props.data.selection.qty,
        });
        return;
      default:
        return;
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    switch (props.data.option) {
      case "add":
        dispatch(addProduct(form));
        setForm({
          name: "",
          price: "",
          qty: "",
        });
        props.data.setOption("");
        return;
      case "edit":
        console.log("edit submitted");
        return;
      default:
        return;
    }
  };
  React.useEffect(() => {
    renderForm(props.data.option);
  }, [props.data.option]);

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Control
            required
            onChange={(evt) => setForm({ ...form, name: evt.target.value })}
            placeholder="Name"
            value={form.name}
          />
        </Col>
        <Col>
          <Form.Control
            required
            type="number"
            onChange={(evt) => setForm({ ...form, price: evt.target.value })}
            placeholder="Price"
            value={form.price}
          />
        </Col>
        <Col>
          <Form.Control
            required
            type="number"
            onChange={(evt) => setForm({ ...form, qty: evt.target.value })}
            placeholder="Quantity"
            value={form.qty}
          />
        </Col>
        <Button type="submit" variant="outline-success">
          Submit
        </Button>
        <Button type="reset" variant="outline-success">
          Cancel
        </Button>
      </Row>
    </Form>
  );
}

export default FormActions;

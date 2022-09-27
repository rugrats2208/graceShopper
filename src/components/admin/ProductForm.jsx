import React from "react";
import { useSelector, useDispatch } from "react-redux";

//BOOTSTRAP
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

//TOAST
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//ACTIONS
import {
  addProduct,
  editProduct,
} from "../../reducers/products/productsReducer";
import { setFormMethod } from "../../reducers/adminReducer";

//HELPERS
import { usdCurrencyFormatter, removeDecimal } from "./helperFuncs";

function ProductForm() {
  const dispatch = useDispatch();
  const { formMethod, product } = useSelector((state) => state.admin);
  const [form, setForm] = React.useState({
    name: "",
    price: "",
    qty: "",
    releaseDate: "",
    label: "",
  });

  const inputUnavailable = (str) =>
    toast.error(str, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
    });

  const inputAvailable = () =>
    toast.success("Success!", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
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
          name: product.name,
          price: product.price,
          qty: product.stock,
          releaseDate: product.releaseDate,
          label: product.label,
        });
        return;
      default:
        return;
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    inputAvailable();
    switch (formMethod) {
      case "add":
        dispatch(addProduct(form));
        setForm({
          name: "",
          price: "",
          qty: "",
          releaseDate: "",
          label: "",
        });
        dispatch(setFormMethod(""));
        return;
      case "edit":
        dispatch(editProduct(product.id, form));
        setForm({
          name: "",
          price: "",
          qty: "",
          releaseDate: "",
          label: "",
        });
        dispatch(setFormMethod(""));
        return;
      default:
        return;
    }
  };

  React.useEffect(() => {
    renderForm(formMethod);
  }, [formMethod]);

  return (
    <Form className="adminForm" onSubmit={handleSubmit}>
      <Row>
        <Col>
          <label htmlFor="name">Name</label>
          <Form.Control
            required
            type="text"
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
            onChange={(evt) => {
              const cost = removeDecimal(`${evt.target.value}`);
              setForm({ ...form, price: cost });
            }}
            placeholder="Enter Album Price"
            value={form ? usdCurrencyFormatter(form.price) : ""}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <label htmlFor="quantity">Quantity</label>
          <Form.Control
            required
            type="number"
            onChange={(evt) =>
              setForm({ ...form, qty: Math.floor(evt.target.value) })
            }
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
          onClick={() => dispatch(setFormMethod(""))}
          type="reset"
          variant="outline-success"
        >
          Cancel
        </Button>
      </Row>
    </Form>
  );
}

export default ProductForm;

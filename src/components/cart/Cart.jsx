import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSelector, useDispatch } from 'react-redux';
import {
    getActiveOrder,
    deleteOrderItem,
} from '../../reducers/orders/ordersReducer';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [total, setTotal] = useState(0);
    const [orderQuantity, setOrderQuantity] = useState(1);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.id);

    //return only the active order lineItems or empty array
    const activeOrder = useSelector(state =>
        state.orders.find(order => !order.complete)
    ) || { lineItems: [] };
    const { lineItems } = activeOrder;

    //set all the orders when user logs in
    useEffect(() => {
        dispatch(getActiveOrder(userId));
        setTotal(lineItems.reduce((agg, album) => agg + album.price, 0));
    }, [userId]);

    //set total price when lineItems changes
    useEffect(() => {
        setTotal(lineItems.reduce((agg, album) => agg + album.price, 0));
    }, [lineItems]);

    //set quantity when button group is clicked
    function handleQty(num, max) {
        const newQty = max ? orderQuantity + num : num;
        if (newQty > max || newQty < 1) return;
        setOrderQuantity(newQty);
    }

    return (
        <Dropdown
            drop="start"
            autoClose="outside"
            onToggle={() => setIsOpen(!isOpen)}
        >
            <Dropdown.Toggle
                variant="success"
                id="cart"
                title="Dropdown button"
            >
                <img src={isOpen ? '/x-icon.png' : '/shopping-cart-icon.jpg'} />
            </Dropdown.Toggle>

            <Dropdown.Menu className="cart-dropdown">
                {lineItems.map(item => (
                    <div key={item.id}>
                        <Dropdown.Item
                            className="cart-title"
                            as={Link}
                            to={`/singleProduct/${item.product.id}`}
                        >
                            {item.product.name}
                        </Dropdown.Item>
                        <Dropdown.Item
                            as={Link}
                            to={`/singleArtist/${item.product.artist.id}`}
                        >
                            <strong>Artist:</strong> {item.product.artist.name}
                        </Dropdown.Item>
                        <Dropdown.ItemText>
                            <strong>Price:</strong> ${item.product.price / 100}
                        </Dropdown.ItemText>
                        <Dropdown.ItemText>
                            <strong>Qty: </strong>
                            <ButtonGroup size="sm">
                                <Button
                                    onClick={() =>
                                        handleQty(-1, item.product.stock)
                                    }
                                >
                                    -
                                </Button>

                                <DropdownButton
                                    as={ButtonGroup}
                                    title={item.qty}
                                    drop="right"
                                >
                                    <Dropdown.Item onClick={() => handleQty(1)}>
                                        1
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleQty(2)}>
                                        2
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleQty(3)}>
                                        3
                                    </Dropdown.Item>
                                </DropdownButton>

                                <Button
                                    onClick={() =>
                                        handleQty(1, item.product.stock)
                                    }
                                >
                                    +
                                </Button>
                            </ButtonGroup>
                        </Dropdown.ItemText>
                        {/* TODO: validate that  ^^^^ is between 1 and item.product.stock on custom component*/}
                        <Dropdown.Item
                            className="cart-delete-btn"
                            onClick={() => {
                                if (
                                    confirm(
                                        `Are you sure you want to delete "${item.product.name}" from your cart?`
                                    )
                                )
                                    dispatch(deleteOrderItem(item.product.id));
                            }}
                        >
                            Delete
                        </Dropdown.Item>

                        <Dropdown.Divider />
                    </div>
                ))}
                <Dropdown.ItemText id="checkout-section">
                    <button className="product-button btn btn-dark">
                        Checkout
                    </button>
                    <span>Subtotal: ${total / 100}</span>
                </Dropdown.ItemText>
            </Dropdown.Menu>
        </Dropdown>
    );
}

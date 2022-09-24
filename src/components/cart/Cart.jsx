import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../reducers/orders/ordersReducer';

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const [total, setTotal] = useState(0);
    const [orderQuantity, setOrderQuantity] = useState(1);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.id);

    //return only the active order products or empty array
    const { products } = useSelector(state =>
        state.orders.find(order => !order.complete)
    ) || { products: [] };

    //set all the orders when user logs in
    useEffect(() => {
        dispatch(getOrders(userId));
        setTotal(products.reduce((agg, album) => agg + album.price, 0));
    }, [userId]);

    //set total price when products changes
    useEffect(() => {
        setTotal(products.reduce((agg, album) => agg + album.price, 0));
    }, [products]);

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
                {products.map(product => (
                    <div key={product.id}>
                        <Dropdown.Item
                            className="cart-title"
                            as={Link}
                            to={`/singleProduct/${product.id}`}
                        >
                            {product.name}
                        </Dropdown.Item>
                        <Dropdown.Item
                            as={Link}
                            to={`/singleArtist/${product.artist.id}`}
                        >
                            <strong>Artist:</strong> {product.artist.name}
                        </Dropdown.Item>
                        <Dropdown.ItemText>
                            <strong>Price:</strong> ${product.price / 100}
                        </Dropdown.ItemText>
                        <Dropdown.ItemText>
                            <strong>Qty: </strong>
                            <ButtonGroup size="sm">
                                <Button
                                    onClick={() => handleQty(-1, product.qty)}
                                >
                                    -
                                </Button>

                                <DropdownButton
                                    as={ButtonGroup}
                                    title={orderQuantity}
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
                                    onClick={() => handleQty(1, product.qty)}
                                >
                                    +
                                </Button>
                            </ButtonGroup>
                        </Dropdown.ItemText>
                        {/* TODO: validate that  ^^^^ is between 1 and product.qty on custom component*/}
                        <Dropdown.Item
                            className="cart-delete-btn"
                            onClick={() => {
                                if (
                                    confirm(
                                        `Are you sure you want to delete "${product.name}" from your cart?`
                                    )
                                )
                                    console.log('deleted');
                                // TODO: dispatch delete thunk
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

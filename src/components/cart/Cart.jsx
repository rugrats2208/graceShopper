import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../reducers/orders/ordersReducer';

const dummyProduct = {
    artistId: 1,
    artist: {
        name: 'Fred again..',
    },
    id: 1,
    img: 'https://i.scdn.co/image/ab67616d0000b2733df0f9ce9536ac74c7aa4b98',
    name: 'Danielle (smile on my face)',
    price: 15.99,
    qty: 9, //need the total qty to limit how many can be purchased
};

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const activeOrder = useSelector(state =>
        state.orders.filter(order => !order.complete)
    ); //return only the active order
    console.log(activeOrder);

    //set use effeft here to set orders
    useEffect(() => {
        dispatch(getOrders(1));
    }, []);

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

            {/* TODO: set up component to display data? -> <Dropdown.ItemText as: {Component}></Dropdown.ItemText> */}
            <Dropdown.Menu>
                <Dropdown.Header>
                    <Link to={`/singleProduct/${dummyProduct.id}`}>
                        {dummyProduct.name}
                    </Link>
                </Dropdown.Header>
                <Dropdown.Item href={`/singleArtist/${dummyProduct.artistId}`}>
                    Artist: {dummyProduct.artist.name}
                </Dropdown.Item>
                <Dropdown.ItemText>
                    price: ${dummyProduct.price}
                </Dropdown.ItemText>
                <Dropdown.ItemText>qty: (-)1(+)</Dropdown.ItemText>
                {/* TODO: validate that  ^^^^ is between 1 and product.qty */}
                <Dropdown.Item>Delete</Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Header>
                    <Link to={`/singleProduct/${dummyProduct.id}`}>
                        {dummyProduct.name}
                    </Link>
                </Dropdown.Header>
                <Dropdown.Item href={`/singleArtist/${dummyProduct.artistId}`}>
                    Artist: {dummyProduct.artist.name}
                </Dropdown.Item>
                <Dropdown.ItemText>
                    price: {dummyProduct.price}
                </Dropdown.ItemText>
                <Dropdown.ItemText>qty: (-)1(+)</Dropdown.ItemText>
                <Dropdown.Item>Delete</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

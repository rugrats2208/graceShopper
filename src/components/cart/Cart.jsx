import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

const dummyProduct = {
    artistId: 1,
    artist: {
        name: 'Fred again..',
    },
    // createdAt: '2022-09-23T06:00:03.728Z',
    id: 1,
    img: 'https://i.scdn.co/image/ab67616d0000b2733df0f9ce9536ac74c7aa4b98',
    // label: 'Atlantic Records UK',
    name: 'Danielle (smile on my face)',
    // popularity: 57,
    price: 15.99,
    qty: 9, //need the total qty to limit how many can be purchased
    // releaseDate: '2022-09-14',
    // spotifyId: '7xni0tZQ8q2rTHkIeBYr1Y',
    // totalTrack: 1,
};

export default function Cart() {
    //TODO: set up redux store with at least quantity in the order
    const [isOpen, setIsOpen] = useState(false);
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

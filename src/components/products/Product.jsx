import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addOrderItem } from '../../reducers/orders/ordersReducer';

function Product(props) {
    const dispatch = useDispatch();
    let product = props.data;
    const artist = product.artist || {};

    return (
        <div className="product">
            <Link className="link" to={`/singleProduct/${product.id}`}>
                <img src={product.img} height="300px" width="300px"></img>
            </Link>
            <Link className="link" to={`/singleProduct/${product.id}`}>
                <h5>{product.name}</h5>
            </Link>
            <Link className="link" to={`/singleArtist/${artist.id}`}>
                <h5>
                    <i>{artist.name}</i>
                </h5>
            </Link>
            <br></br>
            <button
                type="button"
                className={`product-button btn btn-light ${
                    product.stock ? '' : 'disabled'
                }`}
                onClick={
                    product.stock
                        ? () => dispatch(addOrderItem(product.id))
                        : null
                }
            >
                {product.stock ? 'Add to Cart' : 'Not in stock'}
            </button>
        </div>
    );
}

export default Product;

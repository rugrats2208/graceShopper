import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LineItem from './LineItem';
import EditForm from './EditForm';
import AddForm from './AddForm';

const Products = () => {
  const data = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [itemEdit, setItemEdit] = React.useState('');
  const product = data.find((item) => item.id == Number(itemEdit));

  const handleClick = () => {
    console.log();
  };

  return (
    <div className="products">
      <div>
        <span>ID</span>
        <span>NAME</span>
        <span>PRICE</span>
        <span>STOCK</span>
      </div>
      <AddForm />

      {data.length
        ? data.map((product) => (
            <LineItem key={product.id} data={{ product, setItemEdit }} />
          ))
        : ''}
      {itemEdit ? <EditForm data={{ product, setItemEdit }} /> : ''}
    </div>
  );
};

export default Products;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import {getOrders} from "../../reducers/orders/ordersReducer"

let allOrders = [
  {
    id: 5,
    complete: true,
    createdAt: '2022-09-23T13:51:28.657Z',
    updatedAt: '2022-09-23T13:51:28.658Z',
    userId: 1,
    products: [
      {
        id: 4,
        name: 'Blow',
        price: 999,
        qty: 8,
        popularity: 0,
        img: 'https://i.scdn.co/image/ab67616d0000b273d21608137a3071f8e7537770',
        spotifyId: '07AiRVrtrniKqkxHpLLY2g',
        totalTrack: 1,
        releaseDate: '2022-09-22',
        label: 'CMG/N-Less/Interscope Records',
        createdAt: '2022-09-23T13:51:28.421Z',
        updatedAt: '2022-09-23T13:51:28.421Z',
        artistId: 4,
        orderProduct: {
          createdAt: '2022-09-23T13:51:28.659Z',
          updatedAt: '2022-09-23T13:51:28.659Z',
          productId: 4,
          orderId: 5,
        },
      },
      {
        id: 5,
        name: 'Sad Romance',
        price: 999,
        qty: 11,
        popularity: 0,
        img: 'https://i.scdn.co/image/ab67616d0000b27380e0d24017f500ec026b92df',
        spotifyId: '3ACXMteQNTrTws6UWTtEgo',
        totalTrack: 12,
        releaseDate: '2022-09-23',
        label: 'WM South Africa',
        createdAt: '2022-09-23T13:51:28.420Z',
        updatedAt: '2022-09-23T13:51:28.420Z',
        artistId: 7,
        orderProduct: {
          createdAt: '2022-09-23T13:51:28.659Z',
          updatedAt: '2022-09-23T13:51:28.659Z',
          productId: 5,
          orderId: 5,
        },
      },
      {
        id: 6,
        name: 'Tomorrow 2 (with Cardi B)',
        price: 999,
        qty: 12,
        popularity: 0,
        img: 'https://i.scdn.co/image/ab67616d0000b2737ba032b4d7ea3113cc0042d9',
        spotifyId: '5o1xUBd8aM7qFhjlBXiIpb',
        totalTrack: 1,
        releaseDate: '2022-09-23',
        label: 'CMG/Interscope Records',
        createdAt: '2022-09-23T13:51:28.421Z',
        updatedAt: '2022-09-23T13:51:28.421Z',
        artistId: 5,
        orderProduct: {
          createdAt: '2022-09-23T13:51:28.659Z',
          updatedAt: '2022-09-23T13:51:28.659Z',
          productId: 6,
          orderId: 5,
        },
      },
      {
        id: 8,
        name: '5SOS5',
        price: 999,
        qty: 5,
        popularity: 0,
        img: 'https://i.scdn.co/image/ab67616d0000b273911d0ad5322127c9c4a6a2c2',
        spotifyId: '26uA5pGrTovBLxikRsMQJ4',
        totalTrack: 19,
        releaseDate: '2022-09-23',
        label: 'BMG Rights Management (US) LLC',
        createdAt: '2022-09-23T13:51:28.422Z',
        updatedAt: '2022-09-23T13:51:28.422Z',
        artistId: 8,
        orderProduct: {
          createdAt: '2022-09-23T13:51:28.659Z',
          updatedAt: '2022-09-23T13:51:28.659Z',
          productId: 8,
          orderId: 5,
        },
      },
    ],
  },
  {
    id: 6,
    complete: true,
    createdAt: '2022-09-23T13:51:28.658Z',
    updatedAt: '2022-09-23T13:51:28.659Z',
    userId: 1,
    products: [
      {
        id: 5,
        name: 'Sad Romance',
        price: 999,
        qty: 11,
        popularity: 0,
        img: 'https://i.scdn.co/image/ab67616d0000b27380e0d24017f500ec026b92df',
        spotifyId: '3ACXMteQNTrTws6UWTtEgo',
        totalTrack: 12,
        releaseDate: '2022-09-23',
        label: 'WM South Africa',
        createdAt: '2022-09-23T13:51:28.420Z',
        updatedAt: '2022-09-23T13:51:28.420Z',
        artistId: 7,
        orderProduct: {
          createdAt: '2022-09-23T13:51:28.661Z',
          updatedAt: '2022-09-23T13:51:28.661Z',
          productId: 5,
          orderId: 6,
        },
      },
      {
        id: 6,
        name: 'Tomorrow 2 (with Cardi B)',
        price: 999,
        qty: 12,
        popularity: 0,
        img: 'https://i.scdn.co/image/ab67616d0000b2737ba032b4d7ea3113cc0042d9',
        spotifyId: '5o1xUBd8aM7qFhjlBXiIpb',
        totalTrack: 1,
        releaseDate: '2022-09-23',
        label: 'CMG/Interscope Records',
        createdAt: '2022-09-23T13:51:28.421Z',
        updatedAt: '2022-09-23T13:51:28.421Z',
        artistId: 5,
        orderProduct: {
          createdAt: '2022-09-23T13:51:28.661Z',
          updatedAt: '2022-09-23T13:51:28.661Z',
          productId: 6,
          orderId: 6,
        },
      },
      {
        id: 8,
        name: '5SOS5',
        price: 999,
        qty: 5,
        popularity: 0,
        img: 'https://i.scdn.co/image/ab67616d0000b273911d0ad5322127c9c4a6a2c2',
        spotifyId: '26uA5pGrTovBLxikRsMQJ4',
        totalTrack: 19,
        releaseDate: '2022-09-23',
        label: 'BMG Rights Management (US) LLC',
        createdAt: '2022-09-23T13:51:28.422Z',
        updatedAt: '2022-09-23T13:51:28.422Z',
        artistId: 8,
        orderProduct: {
          createdAt: '2022-09-23T13:51:28.661Z',
          updatedAt: '2022-09-23T13:51:28.661Z',
          productId: 8,
          orderId: 6,
        },
      },
    ],
  },
];

function PastOrders() {
  // const allOrders = useSelector((state) => state.orders);
  //const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getOrders());
  // }, []);

  function filterPastOrders() {
    return allOrders.filter((order) => order.complete === true);
  }

  return filterPastOrders().map((order) =>
    order.products.map((product) => {
      return (
        <div>
          <h1>{product.name}</h1>
          <img src={product.img} />
          <h3>{product.price}</h3>
        </div>
      );
    })
  );
}

export default PastOrders;

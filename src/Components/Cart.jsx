import { useState, useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { ProductContext } from '../App';

export default function Cart() {
  const data = useContext(ProductContext);
  const totalPrice = data.cartItems.reduce(
    (accumulator, item) => accumulator + item.price,
    0
  );

  return (
    <>
      <Offcanvas
        show={data.show}
        onHide={data.handleClose}
        placement="end"
        backdrop="static"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fs-2 fw-bold">Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {data.cartItems.length === 0 ? (
            <div className="text-center d-flex flex-column align-items-center justify-content-center">
              <img
                className="img-fluid img"
                src="https://img.freepik.com/free-photo/person-shopping_1048-1695.jpg?w=740&t=st=1684320790~exp=1684321390~hmac=55e72cfcd51a2cdf20ca01ac29c96845ba9dceb5f5d1144f98723afce5d86bc7"
                alt="empty cart"
                loading="lazy"
              />
              <p className="lead fw-bold">Cart is empty</p>
            </div>
          ) : (
            <>
              {data.cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex align-items-center justify-content-between mb-4"
                >
                  <div className="d-flex align-items-center">
                    <img
                      width="50"
                      height="50"
                      className="img-fluid rounded-3"
                      src={item.imgURL}
                      alt={item.name}
                      loading="lazy"
                    />
                    <div className="ms-3 d-flex flex-column justify-content-end">
                      <p className="mb-0 font-main">{item.name}</p>
                      <span className=''>
                        <span>Size: {item.size}</span>{' | '}
                        <span>Price: &#8358;{item.price.toLocaleString()}</span>{' '}
                      </span>
                    </div>
                  </div>
                  <span
                    onClick={(ev) => data.handleRemoveFromCart(ev, item.id)}
                    className="pointer"
                  >
                    ❌
                  </span>
                </div>
              ))}
              <Button className="w-100 d-grid btn-brown mt-5">
                Check Out (&#8358;{totalPrice.toLocaleString()})
              </Button>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

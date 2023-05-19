import React, { createContext, useState, useEffect } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import Products from './Components/Products';
import Cart from './Components/Cart';
import { data } from './data'; 

export const ProductContext = createContext(null);

export default function App() {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState(data);
  const [cartItems, setCartItems] = useState([]); 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddToCart = (ev, id) => {
    const addedItems = products.map((obj) => {
      if (obj.id === id) {
        return {
          ...obj,
          added: true,
        };
      }
      return obj;
    });

    const itemsInCart = addedItems.filter((item) => item.added === true);

    setCartItems(itemsInCart);
    setProducts(addedItems);
  };

  const handleRemoveFromCart = (ev, id) => {
    const addedItems = products.map((obj) => {
      if (obj.id === id) {
        return {
          ...obj,
          added: false,
        };
      }
      return obj;
    });
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setProducts(addedItems);
  };

  return (
    <div>
      <Navbar expand="lg" fixed="top" className="nav-bg p-4">
        <Container
          fluid
          className="d-flex align-items-center justify-content-between"
        >
          <span className="text-white fs-3 font-main">Boots Store</span>
          <div className="position-relative pointer" onClick={handleShow}>
            <span className="position-absolute top-0 start-50 translate-middle badge fs-6 text-cream font-main">
              {cartItems.length}
            </span>
            <span className="fs-4">🛒</span>
          </div>
        </Container>
      </Navbar>
      <ProductContext.Provider
        value={{
          show,
          handleClose,
          products,
          handleAddToCart,
          cartItems,
          handleRemoveFromCart
        }}
      >
        <Products />
        <Cart />
      </ProductContext.Provider>
    </div>
  );
}

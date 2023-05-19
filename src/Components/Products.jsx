import { useState, useContext } from 'react';
import { ProductContext } from '../App'; 
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Products() {
  const data = useContext(ProductContext); 
  return (
    <Container fluid className="mt-5 pt-5 bg-cream">
      <h1 className="fs-2 ps-5 mt-3 font-main">Products</h1>
      <Row className="px-4 py-5 gy-5">
        {data.products.map((product) => (
          <Col xl={3} sm={4} key={product.id}>
            <div className="image-container">
              <img
                className="img rounded-3"
                src={product.imgURL}
                alt={product.name} 
                loading="lazy"
              />
              <div className="overlay rounded-3 d-flex align-items-end justify-content-between py-3 px-2">
                <div className="font-main">
                  <h5 className="text-capitalize">{product.name}</h5>
                  <div className="d-flex align-items-start justify-content-center flex-column">
                    <small>Size: {product.size}</small>
                    <span className="">
                      Price:{' '}
                      <span className="text-cream">&#8358;{product.price.toLocaleString()}</span>
                    </span>
                  </div>
                </div>
                {product.added ? (
                  <Button id={product.id} onClick={ev => data.handleRemoveFromCart(ev, product.id)} className="btn btn-brown text-white fs-6 border-0">
                    Remove from cart
                  </Button>
                ) : (
                  <Button id={product.id} onClick={(ev) => data.handleAddToCart(product, product.id)} className="btn btn-brown text-white fs-6 border-0">
                    Add to cart
                  </Button>
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

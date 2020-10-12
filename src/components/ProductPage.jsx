import React from "react";

const ProductPage = () => {
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-lg-6">
          <h1>Image carusel</h1>
        </div>
        <div className="col-lg-6 d-flex flex-column align-items-center">
          <div className="col-8">
            <div>
              <h1>Product Name</h1>
              <p>(product tags)</p>
              <h3>product description:</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                dolor laboriosam ipsa, vitae nisi cum labore. Totam dolore est
                facere aperiam harum officia eaque ipsam! Assumenda tenetur
                quisquam aspernatur vitae!
              </p>
            </div>
            <div>
              <h2>Price: 300$</h2>
              <button className="btn btn-secondary">+ Add To Cart</button>
              <button className="btn btn-primary ml-2">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 mt-4 rounded border">
          <h2>Reviews</h2>
          <div className="review">
            <div className="mt-4 border p-3 ">
              <div className="border-bottom pb-3 d-flex">
                <div className="mr-auto">
                  <i className="fas fa-user"></i>
                  <span className="ml-2 ">User name</span>
                </div>
                <div className="ml-auto">
                  <span>edit</span>
                  <span className="ml-2 mt-0 ">delete</span>
                </div>
              </div>
              <p className="mt-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Veritatis perferendis aut quae fugit! A deserunt quae officia,
                consequuntur, officiis vitae molestias necessitatibus assumenda
                est at iusto saepe maxime? Iste, natus.
              </p>
            </div>
          </div>
          <div className="review ">
            <div className="mt-4 border p-3">
              <div className="border-bottom pb-3 d-flex">
                <div className="mr-auto">
                  <i className="fas fa-user"></i>
                  <span className="ml-2 ">User name</span>
                </div>
                <div className="ml-auto">
                  <span>edit</span>
                  <span className="ml-2 mt-0 ">delete</span>
                </div>
              </div>
              <p className="mt-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Veritatis perferendis aut quae fugit! A deserunt quae officia,
                consequuntur, officiis vitae molestias necessitatibus assumenda
                est at iusto saepe maxime? Iste, natus.
              </p>
            </div>
          </div>
          <div className="review">
            <div className="mt-4 border p-3 ">
              <div className="border-bottom pb-3 d-flex">
                <div className="mr-auto">
                  <i className="fas fa-user"></i>
                  <span className="ml-2 ">User name</span>
                </div>
                <div className="ml-auto">
                  <span>edit</span>
                  <span className="ml-2 mt-0 ">delete</span>
                </div>
              </div>
              <p className="mt-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Veritatis perferendis aut quae fugit! A deserunt quae officia,
                consequuntur, officiis vitae molestias necessitatibus assumenda
                est at iusto saepe maxime? Iste, natus.
              </p>
            </div>
          </div>
          <button className="btn btn-primary float-right mt-3 mb-3">
            add a review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

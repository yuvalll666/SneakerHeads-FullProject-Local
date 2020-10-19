import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

function ProductCarousel(props) {
  const { product } = props;
  const [Images, setImages] = useState([]);

  // console.log(product);
  useEffect(() => {
    if (product.images && product.images.length > 0) {
      console.log("kasjfkljaskfjba");
      let images = [];
   
      product.images.map((item) => {
        let url = "http://localhost:3000";
        images.push({
          original: `${url}/${item}`,
          thumbnail: `${url}/${item}`,
        });
      });

      setImages(images);
    }
  }, [product]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}

export default ProductCarousel;

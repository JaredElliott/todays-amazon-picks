import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.ASIN} className="product-item">
          <h3>{product.ItemInfo.Title.DisplayValue}</h3>
          <img
            src={product.Images.Primary.Small.URL}
            alt={product.ItemInfo.Title.DisplayValue}
          />
          <p>Price: {product.Offers.Summaries[0].HighestPrice.DisplayAmount}</p>
          <a href={product.DetailPageURL} target="_blank" rel="noopener noreferrer">
            View on Amazon
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

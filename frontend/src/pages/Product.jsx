import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';


const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 bg-gray-50 '>
      {/*----------- Product Data-------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-md border '
                alt=''
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%] object-contain px-2'>
            <img className='w-full h-auto max-w-xl rounded-md  object-contain border border-gray-300' src={image} alt='' />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1'>
          <h1 className='font-bold text-3xl mt-2 text-gray-800'>{productData.name}</h1>
          <p className='mt-5 text-3xl font-semibold text-gray-800'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-600'>{productData.description}</p>

          {/* Description in Points Format */}
          <div className='mt-5 text-gray-600'>
            <ul className='list-inside'>
              {/* <li>Product Category: {productData.category}</li> */}
              {/* <li>Shipping: Free worldwide shipping available.</li>
              <li>Returns: 7-day easy return policy.</li> */}
            </ul>
          </div>
          <br/>
          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id)}
            className='text-gray-200 bg-black px-8 py-3 text-sm active:bg-gray-700 transition-all duration-300 hover:-translate-y-1'
          >
            ADD TO CART
          </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-800 mt-5 flex flex-col gap-1'>
            {/* <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p> */}
          </div>
        </div>
      </div>

      {/* --------- display related products ---------- */}
      <RelatedProducts category={productData.category} />
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;

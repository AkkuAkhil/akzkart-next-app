import { fetchProductById, getAllIdParams } from '../../../../helpers/db-utils';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

const ProductsPage = ({ product }) => {
  const form = useRef();
  const router = useRouter();
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);

  const submitHandler = async event => {
    event.preventDefault();
    const updatedProduct = { name, price, image };
    form.current.reset();

    const response = await fetch(`/api/products/${product._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    });

    if (response.ok) router.push('/admin/products');
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={submitHandler} ref={form}>
        <div>
          <label htmlFor='name'>Product Name</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete='On'
            autoFocus
          />
        </div>
        <div>
          <label htmlFor='price'>Product Price</label>
          <input
            type='text'
            id='price'
            value={price}
            onChange={e => setPrice(e.target.value)}
            autoComplete='On'
          />
        </div>
        <div>
          <label htmlFor='image'>Product Image</label>
          <input
            type='url'
            id='image'
            value={image}
            onChange={e => setImage(e.target.value)}
            autoComplete='On'
          />
        </div>
        <input type='submit' value='Edit' />
      </form>
    </div>
  );
};

export const getStaticProps = async context => {
  const { productId } = context.params;
  const product = await fetchProductById(productId);
  return { props: { product } };
};

export const getStaticPaths = async () => {
  const paths = await getAllIdParams();
  return { paths, fallback: 'blocking' };
};

export default ProductsPage;

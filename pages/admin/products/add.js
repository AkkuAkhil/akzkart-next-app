import { useRouter } from 'next/router';
import { useRef } from 'react';

const AddProductPage = () => {
  const router = useRouter();

  const name = useRef();
  const price = useRef();
  const image = useRef();
  const form = useRef();

  const submitHandler = async event => {
    event.preventDefault();
    const product = {
      name: name.current.value,
      price: price.current.value,
      image: image.current.value
    };
    form.current.reset();

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });

    if (response.ok) router.push('/admin/products');
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={submitHandler} ref={form}>
        <div>
          <label htmlFor='name'>Product Name</label>
          <input type='text' id='name' ref={name} autoComplete='On' autoFocus />
        </div>
        <div>
          <label htmlFor='price'>Product Price</label>
          <input type='text' id='price' ref={price} autoComplete='On' />
        </div>
        <div>
          <label htmlFor='image'>Product Image</label>
          <input type='url' id='image' ref={image} autoComplete='On' />
        </div>
        <input type='submit' value='Add' />
      </form>
    </div>
  );
};

export default AddProductPage;

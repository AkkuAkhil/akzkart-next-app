import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import classes from './ProductForm.module.css';
import { DollarSign, FileText, Image, RefreshCw, Tag } from 'react-feather';

const ProductEditForm = ({ product }) => {
  const form = useRef();
  const router = useRouter();
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);
  const [description, setDescription] = useState(product.description);

  const submitHandler = async event => {
    event.preventDefault();
    const updatedProduct = { name, price, image, description };
    form.current.reset();

    const response = await fetch(`/api/products/${product._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    });

    if (response.ok) router.push('/admin/products');
  };

  return (
    <form onSubmit={submitHandler} ref={form} className={classes.form}>
      <div className={classes.formContainer}>
        <p className={classes.formHeading}>Add Product</p>
        <div className={classes.formDiv}>
          <label htmlFor='name'>
            <span className='iconGroup'>
              <Tag className='icon' /> Product Name
            </span>
          </label>
          <input
            type='text'
            id='name'
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className={classes.formDiv}>
          <label htmlFor='price'>
            <span className='iconGroup'>
              <DollarSign className='icon' /> Product Price
            </span>
          </label>
          <input
            type='text'
            id='price'
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>
        <div className={classes.formDiv}>
          <label htmlFor='image'>
            <span className='iconGroup'>
              <Image alt='img' className='icon' /> Product Image
            </span>
          </label>
          <input
            type='url'
            id='image'
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </div>
        <div className={classes.formDiv}>
          <label htmlFor='description'>
            <span className='iconGroup'>
              <FileText className='icon' /> Product Description
            </span>
          </label>
          <textarea
            rows={3}
            type='text'
            id='description'
            autoComplete='On'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <button className={classes.formButton}>
          <span className='iconGroup'>
            <RefreshCw className='icon' />
            Product
          </span>
        </button>
      </div>
    </form>
  );
};

export default ProductEditForm;

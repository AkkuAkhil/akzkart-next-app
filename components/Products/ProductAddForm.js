import { useRouter } from 'next/router';
import { useRef } from 'react';
import classes from './ProductForm.module.css';
import { DollarSign, FileText, Image, Plus, Tag } from 'react-feather';
import { generateUserId } from '../../helpers/utils';

const ProductAddForm = ({ email }) => {
  const router = useRouter();

  const name = useRef();
  const price = useRef();
  const image = useRef();
  const description = useRef();
  const form = useRef();

  const submitHandler = async event => {
    event.preventDefault();
    const product = {
      name: name.current.value,
      price: price.current.value,
      image: image.current.value,
      description: description.current.value,
      rating: 0,
      userId: generateUserId(email),
      date: Date.now()
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
    <form onSubmit={submitHandler} ref={form} className={classes.form}>
      <div className={classes.formContainer}>
        <p className={classes.formHeading}>Add Product</p>
        <div className={classes.formDiv}>
          <label htmlFor='name'>
            <span className='iconGroup'>
              <Tag className='icon' /> Product Name
            </span>
          </label>
          <input type='text' id='name' ref={name} autoComplete='On' autoFocus />
        </div>
        <div className={classes.formDiv}>
          <label htmlFor='price'>
            <span className='iconGroup'>
              <DollarSign className='icon' /> Product Price
            </span>
          </label>
          <input type='text' id='price' ref={price} autoComplete='On' />
        </div>
        <div className={classes.formDiv}>
          <label htmlFor='image'>
            <span className='iconGroup'>
              <Image alt='Img' className='icon' /> Product Image
            </span>
          </label>
          <input type='url' id='image' ref={image} autoComplete='On' />
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
            ref={description}
            autoComplete='On'
          />
        </div>
        <button className={classes.formButton}>
          <span className='iconGroup'>
            <Plus className='icon' />
            Product
          </span>
        </button>
      </div>
    </form>
  );
};

export default ProductAddForm;

import { useRouter } from 'next/router';
import { useContext, useRef, useState } from 'react';
import classes from './ProductForm.module.css';
import { DollarSign, FileText, Image, RefreshCw, Tag } from 'react-feather';
import NotificationContext from '../../contexts/NotificationContext';

const ProductEditForm = ({ product }) => {
  const form = useRef();
  const router = useRouter();
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);
  const [description, setDescription] = useState(product.description);
  const { showNotification } = useContext(NotificationContext);

  const submitHandler = async event => {
    event.preventDefault();
    showNotification({
      title: 'Updating Product',
      message: 'Updating.',
      status: 'pending'
    });

    const updatedProduct = { name, price, image, description };
    form.current.reset();

    const response = await fetch(`/api/products/${product._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    });

    if (response.ok) {
      showNotification({
        title: 'Updating Product',
        message: 'Product Updated Succesfully.',
        status: 'success'
      });
      router.push('/admin/products/page/1');
    } else {
      showNotification({
        title: 'Updating Product',
        message: 'Error Occurred while Updating Product.',
        status: 'error'
      });
    }
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

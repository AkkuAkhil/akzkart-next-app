import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { myLoader } from '../../helpers/utils.js';

const ProductItem = ({ product, admin, setLatestProducts }) => {
  const router = useRouter();

  const deleteHandler = async event => {
    event.preventDefault();
    await fetch(`/api/products/${product._id}`, {
      method: 'DELETE'
    });
    setLatestProducts();
  };

  const editHandler = async event => {
    event.preventDefault();
    router.push(`/admin/products/edit/${product._id}`);
  };

  return (
    <Fragment>
      <Image
        loader={myLoader}
        alt={product.name}
        src={product.image}
        width={256}
        height={256}
      />
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      {admin && (
        <div>
          <button onClick={editHandler}>Edit</button>{' '}
          <button onClick={deleteHandler}>Delete</button>
        </div>
      )}
    </Fragment>
  );
};

export default ProductItem;

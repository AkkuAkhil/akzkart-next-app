import Image from 'next/image';
import { myLoader } from '../../helpers/utils';
import { fetchProductById, getAllIdParams } from '../../helpers/db-utils';

const ProductsPage = ({ product }) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <Image
        loader={myLoader}
        alt={product.name}
        src={product.image}
        width={256}
        height={256}
      />
      <p>{product.price}</p>
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

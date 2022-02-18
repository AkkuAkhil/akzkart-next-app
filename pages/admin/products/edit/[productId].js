import ProductEditForm from '../../../../components/Products/ProductEditForm';
import { fetchProductById, getAllIdParams } from '../../../../helpers/db-utils';

const ProductsPage = ({ product }) => {
  return <ProductEditForm product={product} />;
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

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Pagination from '../../../components/Pagination/Pagination';
import ProductContainer from '../../../components/Products/ProductContainer';
import { fetchAllProducts } from '../../../helpers/db-utils';

const ProductsPage = props => {
  const [products, setProducts] = useState(props.products);

  const { data } = useSWR(`/api/products/page/${props.page}`, url =>
    fetch(url).then(res => res.json())
  );

  useEffect(() => {
    if (data) setProducts(data.products);
  }, [data]);

  return (
    <div>
      <ProductContainer products={products} />
      <Pagination />
    </div>
  );
};

export const getServerSideProps = async context => {
  const { page } = context.params;
  const products = await fetchAllProducts(page);
  return { props: { page, products } };
};

export default ProductsPage;

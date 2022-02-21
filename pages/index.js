import Image from 'next/image';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import ProductContainer from '../components/Products/ProductContainer';
import { fetchFeaturedProducts } from '../helpers/db-utils';
import { myLoader } from '../helpers/utils';

const HomePage = props => {
  const [products, setProducts] = useState(props.products);

  const { data } = useSWR('/api/products/featured', url =>
    fetch(url).then(res => res.json())
  );

  useEffect(() => {
    if (data) setProducts(data.products);
  }, [data]);

  return (
    <div>
      <div>
        <Image
          src='/bg.jpg'
          width={1440}
          height={350}
          quality={100}
          loader={myLoader}
          alt='background'
        />
      </div>

      <ProductContainer products={products} />
    </div>
  );
};

export const getStaticProps = async () => {
  const products = await fetchFeaturedProducts(1);
  return { props: { products } };
};

export default HomePage;

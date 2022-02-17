import Link from 'next/link';

const MainHeader = props => {
  return (
    <header>
      <div>
        <Link href='/'>Akzkart</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href='/products'>All Products</Link>
          </li>
          <li>
            <Link href='/admin/products'>My Products</Link>
          </li>
          <li>
            <Link href='/admin/products/add'>Add Product</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;

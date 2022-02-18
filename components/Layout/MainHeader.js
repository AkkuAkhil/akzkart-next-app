import Image from 'next/image';
import Link from 'next/link';
import Logo from '../UI/Logo';
import classes from './MainHeader.module.css';

const MainHeader = props => {
  return (
    <header className={classes.header}>
      <div>
        <Logo link='/'>
          <Image src='/logo.png' alt='AKZKART' width={150} height={30} />
        </Logo>
      </div>
      <nav className={classes.navigation}>
        <ul className={classes.navigationContainer}>
          <li className={classes.navigationItem}>
            <Link href='/products'>All Products</Link>
          </li>
          <li className={classes.navigationItem}>
            <Link href='/admin/products'>My Products</Link>
          </li>
          <li className={classes.navigationItem}>
            <Link href='/admin/products/add'>Add Product</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;

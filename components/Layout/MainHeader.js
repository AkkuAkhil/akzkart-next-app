import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { ShoppingCart } from 'react-feather';
import CartContext from '../../contexts/CartContext';
import Cart from '../UI/Cart';
import Logo from '../UI/Logo';
import classes from './MainHeader.module.css';

const MainHeader = props => {
  const { totalQuantity } = useContext(CartContext);

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
          <li className={classes.navigationItem}>
            <Cart link='/cart'>
              <span className='iconGroup'>
                <ShoppingCart className='icon' /> Cart
                {totalQuantity > 0 && (
                  <span className={classes.navigationCartQuantity}>
                    {totalQuantity}
                  </span>
                )}
              </span>
            </Cart>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;

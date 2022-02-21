import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { LogIn, LogOut, ShoppingCart, User } from 'react-feather';
import CartContext from '../../contexts/CartContext';
import { getFirstName } from '../../helpers/utils';
import Cart from '../UI/Cart';
import Logo from '../UI/Logo';
import classes from './MainHeader.module.css';

const MainHeader = props => {
  const { data: session } = useSession();
  const { totalQuantity } = useContext(CartContext);
  const [dropDown, setDropDown] = useState(false);

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
            <Link href='/products/page/1'>All Products</Link>
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
          <li className={classes.navigationItem}>
            {session ? (
              <span className='iconGroup'>
                <User className='icon' />
                <p
                  className={classes.navigationUser}
                  onClick={() => setDropDown(!dropDown)}
                  onMouseEnter={() => setDropDown(true)}
                >
                  {getFirstName(session.user.name) || 'User'}
                </p>
              </span>
            ) : (
              <span
                className='iconGroup cursor'
                onClick={() => signIn('google')}
              >
                <LogIn className='icon' />
                <p className={classes.navigationUser}>Log In</p>
              </span>
            )}
          </li>
          {session && dropDown && (
            <ul
              className={classes.subNavigationMenu}
              onMouseLeave={() => setDropDown(false)}
            >
              <li className={classes.subNavigationItem}>
                <Link href='/admin/user'>My Profile</Link>
              </li>
              <li className={classes.subNavigationItem}>
                <Link href='/admin/products/page/1'>My Products</Link>
              </li>
              <li className={classes.subNavigationItem}>
                <Link href='/admin/orders'>My Orders</Link>
              </li>
              <li className={classes.subNavigationItem}>
                <Link href='/admin/products/add'>Add Product</Link>
              </li>
              <li className={classes.subNavigationItem}>
                <span className='iconGroup cursor' onClick={() => signOut()}>
                  <LogOut className='icon' />
                  <p className={classes.navigationUser}>Log Out</p>
                </span>
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;

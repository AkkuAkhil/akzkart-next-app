import Link from 'next/link';

const Cart = props => {
  return (
    <Link href={props.link}>
      <a>{props.children}</a>
    </Link>
  );
};

export default Cart;

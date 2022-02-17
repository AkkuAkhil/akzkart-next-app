import Link from 'next/link';

const ProductCard = props => {
  return (
    <Link href={props.link}>
      <a>{props.children}</a>
    </Link>
  );
};

export default ProductCard;

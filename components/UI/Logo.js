import Link from 'next/link';

const Logo = props => {
  return (
    <Link href={props.link}>
      <a>{props.children}</a>
    </Link>
  );
};

export default Logo;

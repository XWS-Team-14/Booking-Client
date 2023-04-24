import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './NavigationLink.module.scss';

interface NavigationLinkProps {
  text: string;
  href: string;
}

const NavigationLink = ({ text, href }: NavigationLinkProps) => {
  const router = useRouter();

  return (
    <Link
      shallow={true}
      href={href}
      as={href}
      className={classNames(
        { [styles.active]: router.pathname === `${href}` },
        styles.link
      )}
    >
      {text}
    </Link>
  );
};

export default NavigationLink;

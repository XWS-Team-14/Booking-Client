import classNames from 'classnames';
import Image from 'next/image';
import IconFemale from '../../../../assets/images/user-female2.png';
import IconMale from '../../../../assets/images/user-male2.png';
import styles from './UserIcon.module.scss';

interface UserIconProps {
  type: 'male' | 'female';
  size: number;
  featured?: boolean;
}

const UserIcon = ({ type, size, featured }: UserIconProps) => (
  <Image
    src={type === 'female' ? IconFemale : IconMale}
    alt="user"
    width={size}
    height={size}
    quality={100}
    className={classNames(
      styles.icon,
      styles.featured,
      'frostedGlass',
      'undraggable'
    )}
  />
);

export default UserIcon;

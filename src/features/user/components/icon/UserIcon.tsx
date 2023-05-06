import classNames from 'classnames';
import Image from 'next/image';
import IconFemale from '../../../../assets/images/user-female.png';
import IconMale from '../../../../assets/images/user-male.png';
import styles from './UserIcon.module.scss';

interface UserIconProps {
  type: 'male' | 'female';
  size: number;
}

const UserIcon = ({ type, size }: UserIconProps) => (
  <Image
    src={type === 'female' ? IconFemale : IconMale}
    alt="user"
    width={size}
    height={size}
    quality={100}
    className={classNames(styles.icon, 'frostedGlass', 'undraggable')}
  />
);

export default UserIcon;

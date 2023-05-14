import classNames from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps {
  type: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'transparent';
  text?: string;
  action?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactElement;
  disabled?: boolean;
}

const Button = ({
  type,
  text,
  action,
  style,
  children,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={classNames(styles[type])}
      onClick={action}
      style={style}
      disabled={disabled}
    >
      <>
        {text}
        {children}
      </>
    </button>
  );
};

export default Button;

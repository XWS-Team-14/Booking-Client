import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';
import NavigationBar from '../navigationBar/NavigationBar';
import styles from './BaseTemplate.module.scss';

interface BaseTemplateProps {
  children?: ReactNode;
}

const BaseTemplate = ({ children }: BaseTemplateProps) => {
  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    const changeBackground = () => {
      console.log(window.scrollY);
      if (window.scrollY >= 15) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };
    window.addEventListener('scroll', changeBackground);
    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  return (
    <div className={classNames(styles.layout)}>
      <div className={styles.contentLayout}>
        <div
          className={classNames(styles.header, {
            [styles.activeHeader]: navbar,
          })}
        >
          <NavigationBar />
        </div>
        <>{children}</>
      </div>
    </div>
  );
};

export default BaseTemplate;

import classNames from 'classnames';
import { ReactNode } from 'react';
import NavigationBar from '../navigationBar/NavigationBar';
import styles from './BaseTemplate.module.scss';

interface BaseTemplateProps {
  children?: ReactNode;
}

const BaseTemplate = ({ children }: BaseTemplateProps) => (
  <div className={classNames(styles.layout)}>
    <div className={styles.contentLayout}>
      <div className={styles.header}>
        <NavigationBar />
      </div>
      <>{children}</>
    </div>
  </div>
);

export default BaseTemplate;

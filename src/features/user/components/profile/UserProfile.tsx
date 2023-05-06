import Button from '@/common/components/button/Button';
import { Divider, Input } from 'antd';
import { useState } from 'react';
import UserIcon from '../icon/UserIcon';
import styles from './UserProfile.module.scss';
const UserProfile = () => {
  const [editable, setEditable] = useState(false);
  const [madeChanges, setMadeChanges] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <UserIcon type="female" size={100} />
        <div className={styles.title}>
          <h1>Sanja Petrović</h1>
          <h2>Host</h2>
        </div>
      </div>
      <Divider />
      <div className={styles.info}>
        {editable ? (
          <>
            <Button
              type="secondary"
              text="Cancel"
              style={{ float: 'right' }}
              action={() => setEditable(false)}
            ></Button>
            {madeChanges && (
              <Button
                type="primary"
                text="Save changes"
                style={{ float: 'right', marginRight: '0.5rem' }}
              ></Button>
            )}
          </>
        ) : (
          <Button
            type="secondary"
            text="Edit profile"
            style={{ float: 'right' }}
            action={() => setEditable(true)}
          ></Button>
        )}
        {editable ? (
          <>
            <p>
              <b>E-mail</b>
            </p>
            <Input
              type="email"
              defaultValue="petroviccsanja@gmail.com"
              className={styles.input}
              allowClear={true}
              onChange={() => setMadeChanges(true)}
            ></Input>
            <p>
              <b>Home address</b>
            </p>
            <Input
              type="text"
              defaultValue="Miše Dimitrijevića 11, Novi Sad, Serbia"
              className={styles.input}
              allowClear={true}
              onChange={() => setMadeChanges(true)}
            ></Input>
          </>
        ) : (
          <>
            <p>
              <b>E-mail</b>
            </p>
            <p>petroviccsanja@gmail.com</p>
            <p>
              <b>Home address</b>
            </p>
            <p>Miše Dimitrijevića 11, Novi Sad, Serbia</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

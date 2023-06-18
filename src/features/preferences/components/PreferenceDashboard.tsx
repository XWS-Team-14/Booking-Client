import Loading from '@/common/components/loading/Loading';
import { selectAuthState } from '@/common/store/slices/authSlice';
import { NotificationPreference } from '@/common/types/NotificationPreference';
import { CheckCircleTwoTone, StopTwoTone } from '@ant-design/icons';
import { Divider, List, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getUserPreferences,
  updatePreference,
} from '../services/preference.service';
import styles from '../styles/preference.module.scss';
import { PreferenceDto } from '../types/PreferenceDto';
import { parsePreference } from '../utils/parsePreference';

const PreferenceDashboard = () => {
  const authState = useSelector(selectAuthState);
  const router = useRouter();
  const [preferences, setPreferences] = useState<NotificationPreference[]>([]);
  const [loading, setLoading] = useState(true);
  const [needsUpdate, setNeedsUpdate] = useState(false);

  useEffect(() => {
    if (authState === null) {
      console.log('waiting...');
    } else if (authState) {
      getUserPreferences()
        .then((response) => {
          setPreferences(response.data.preference);
          setLoading(false);
          setNeedsUpdate(false);
        })
        .catch((err) => console.log(err));
    } else {
      router.push('/');
    }
  }, [authState, needsUpdate]);

  const handleUpdate = async (
    preference: NotificationPreference,
    value: boolean
  ) => {
    const dto: PreferenceDto = {
      id: preference.id,
      user_id: preference.userId,
      type: preference.type,
      enabled: value,
    };
    await updatePreference(dto)
      .then((response) => setNeedsUpdate(true))
      .catch((err) => console.log(err));
  };

  const getActionForItem = (preference: NotificationPreference) =>
    preference.enabled ? (
      <a
        className={styles.disable}
        key="disable"
        onClick={() => handleUpdate(preference, false)}
      >
        Disable
      </a>
    ) : (
      <a
        className={styles.enable}
        key="enable"
        onClick={() => handleUpdate(preference, true)}
      >
        Enable
      </a>
    );

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.wrapper}>
      <Title level={2}>Notification management</Title>
      <Typography.Text>
        View your current notification preferences and manage them.
      </Typography.Text>
      <List
        className={classNames(styles.list, 'frostedGlass')}
        dataSource={preferences}
        renderItem={(preference) => (
          <List.Item
            key={preference.type}
            actions={[getActionForItem(preference)]}
          >
            {preference.enabled ? (
              <CheckCircleTwoTone />
            ) : (
              <StopTwoTone twoToneColor="red" />
            )}
            <Divider type="vertical" />
            {parsePreference(preference)}
          </List.Item>
        )}
      />
    </div>
  );
};

export default PreferenceDashboard;

import { Avatar, Card, Carousel, Divider, Rate, Tag } from 'antd';

const { Meta } = Card;

import UserIcon from '@/features/user/components/icon/UserIcon';
import styles from './AccommodationCard.module.scss';
const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Hi</h1>
      <Rate disabled defaultValue={4.5} allowHalf />
    </div>
  );
};

const onChange = () => {
  console.log('ji');
};

const Images = () => {
  return (
    <Carousel afterChange={onChange}>
      <div>
        <div className={styles.imageWrapper}>
          <img src="https://cf.bstatic.com/xdata/images/hotel/square600/255152681.webp?k=b1f184a5e6de8a12196b0f0a18b76a6a93db7c65cce2d0dd4507ab2a606ef539&o=&s=1" />
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <img src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/399559679.jpg?k=4d88298c3e2495748558ebd7039459f2c77e9a3709a81266c2784ab61eca4cb1&o=&hp=1" />
      </div>
      <div className={styles.imageWrapper}>
        <img src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/257049837.jpg?k=569a0530f5ef78de9d8d7bffe36695e1d7cbd2ab89dc2c2f925767054c98e859&o=&hp=1" />
      </div>
      <div className={styles.imageWrapper}>
        <img src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/255150530.jpg?k=0bf114abd0df4b9bbc208e530f5285022f646eaca31e61d0d1e9f894fbabcace&o=&hp=1" />
      </div>
    </Carousel>
  );
};

const AccommodationInfo = () => {
  return (
    <Card style={{ width: 400 }} cover={<Images />}>
      <Meta title={<Header />} description="Ulica, Novi Sad, Serbia" />
      <Divider orientation="left" orientationMargin="0">
        Guests
      </Divider>
      <b>Minimum:</b> 1<br />
      <b>Maximum:</b> 3
      <Divider orientation="left" orientationMargin="0">
        Amenities
      </Divider>
      <div className={styles.amenities}>
        <Tag bordered={false} color="cyan-inverse">
          Tag 1
        </Tag>
        <Tag bordered={false} color="cyan-inverse">
          Tag 2
        </Tag>
        <Tag bordered={false} color="cyan-inverse">
          Tag 1
        </Tag>
        <Tag bordered={false} color="cyan-inverse">
          Tag 2
        </Tag>
        <Tag bordered={false} color="cyan-inverse">
          Tag 1
        </Tag>
        <Tag bordered={false} color="cyan-inverse">
          Tag 2
        </Tag>
        <Tag bordered={false} color="cyan-inverse">
          Tag 1
        </Tag>
        <Tag bordered={false} color="cyan-inverse">
          Tag 2
        </Tag>
        <Tag bordered={false} color="cyan-inverse">
          Tag 1
        </Tag>
        <Tag bordered={false} color="cyan-inverse">
          Tag 2
        </Tag>
      </div>
      <Divider orientation="left" orientationMargin="0">
        Host
      </Divider>
      <Avatar src={<UserIcon type="male" size={0} />} /> Mr. Host
    </Card>
  );
};

export default AccommodationInfo;

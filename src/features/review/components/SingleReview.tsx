import { selectId } from '@/common/store/slices/authSlice';
import { setReviewUpdate } from '@/common/store/slices/updateSlice';
import UserChip from '@/features/user/components/chip/UserChip';
import { getUserById } from '@/features/user/services/user.service';
import { CheckOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Divider, Modal, Rate, Tooltip } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, updateReview } from '../services/review.service';
import styles from '../styles/review.module.scss';

interface SingleReviewProps {
  id: string;
  poster: string;
  hostRating: number;
  accommodationRating: number;
  date: string;
}
const SingleReview = ({
  id,
  poster,
  hostRating,
  accommodationRating,
  date,
}: SingleReviewProps) => {
  const userId = useSelector(selectId);
  const [currentIsPoster, setCurrentIsPoster] = useState(false);
  const [posterDetails, setPosterDetails] = useState<any>();
  const [open, setOpen] = useState(false);
  const [editEnabled, setEditEnabled] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    getUserById(poster)
      .then((response) => {
        setPosterDetails(response.data);
      })
      .catch((error) => console.log(error));
    setCurrentIsPoster(userId === poster);
  }, [userId]);

  const editReview = () => {
    setEditEnabled(true);
  };

  const submitEdit = async () => {
    await updateReview({
      id: id,
      host_rating: hostRating,
      accommodation_rating: accommodationRating,
    }).then(() => {
      setEditEnabled(false);
      dispatch(setReviewUpdate(true));
    });
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setOpen(false);
    await deleteReview(id)
      .then((response) => {
        router.reload();
      })
      .catch((error) => console.log(error));
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const changeHostRating = (value: number) => {
    console.log('i changed');
    hostRating = value;
  };
  const changeAccommodationRating = (value: number) => {
    accommodationRating = value;
  };
  return (
    <div className={classNames('frostedGlass', styles.review)}>
      <div className={styles.review__header}>
        <div className={styles.review__header__date}>
          {dayjs(date).format('DD.MM.YYYY.')}
        </div>
      </div>
      <div className={styles.review__ratings}>
        <div className={styles.review__ratings__rating}>
          Host:{' '}
          <Rate
            disabled={!editEnabled}
            defaultValue={hostRating}
            onChange={changeHostRating}
          />{' '}
        </div>
        <div className={styles.review__ratings__rating}>
          Accommodation:{' '}
          <Rate
            disabled={!editEnabled}
            defaultValue={accommodationRating}
            onChange={changeAccommodationRating}
          />
        </div>
      </div>
      <Divider />
      <div className={styles.review__poster}>
        <UserChip
          gender={posterDetails?.gender ?? 'female'}
          name={`${posterDetails?.first_name} ${posterDetails?.last_name}`}
          size={35}
        />
        {currentIsPoster && (
          <div className={styles.review__buttons}>
            {!editEnabled && (
              <Tooltip title="Edit your review.">
                <Button
                  type="primary"
                  ghost
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={editReview}
                ></Button>
              </Tooltip>
            )}
            {editEnabled && (
              <Tooltip title="Submit your review.">
                <Button
                  type="primary"
                  ghost
                  shape="circle"
                  icon={<CheckOutlined />}
                  onClick={submitEdit}
                ></Button>
              </Tooltip>
            )}
            <Tooltip title="Delete your review.">
              <Button
                danger
                shape="circle"
                onClick={showModal}
                icon={<DeleteOutlined />}
              ></Button>
            </Tooltip>
            <Modal
              title="Delete Review"
              open={open}
              onOk={handleOk}
              centered
              onCancel={handleCancel}
            >
              Are you sure you want to delete this review?
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleReview;

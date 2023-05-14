import Loading from '@/common/components/loading/Loading';
import { selectEmail } from '@/common/store/slices/authSlice';
import AccommodationInfo from '@/features/accommodation/components/AccommodationCard/AccommodationCard';
import { Button as AntButton, Layout, List, Modal, Space } from 'antd';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/search.module.scss';
import { SearchAccommodationDto } from '../types/SearchAccommodationsDto';
import { SearchParams } from '../types/SearchParams';
import { fetchData } from '../service/search.service';
import { SearchResultDto } from '../types/SearchResultDto';
interface SearchDataProps {
  searchParams: SearchParams | undefined;
}

const SearchData = ({ searchParams }: SearchDataProps) => {
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  const [accommodations, setAccommodations] = useState<
    SearchResultDto
  >();
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');
  const [purchaseFeedbackText, setPurchaseFeedbackText] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [fetched, setFetched] = useState(false);
  const userEmail = useSelector(selectEmail);
  const { Content, Sider } = Layout;

  useEffect(() => {
    setFetched(true);
    fetchData(searchParams).then((data) => {
      setAccommodations(data);
      setFetched(true);
    });
    console.log()
  }, [searchParams]);

  function buyTickets(id: string, ticketNumber: number) {
    if (userEmail === null) {
      toast.error('You must log in to purchase a ticket.');
      router.push('/login');
      return;
    }

    if (ticketNumber === 0) {
      toast.error('Please select a ticket to purchase.');
      return;
    }

    /*let dto: PurchaseDto = {
      flight_id: id,
      user_email: userEmail,
      num_of_tickets: ticketNumber,
    };

    ticketService
      .buyTickets(dto)
      .then(() => {
        toast.success('Successfully purchased!');
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          'Unable to purchase tickets due to an error. Please try again later.'
        );
      });*/
  }

  function changePage(url: string) {
    if (url === null) return;
    /*fetchDataPage(url).then((data) => {
      setAccommodations(data.results);
    });*/
  }

  const showModal = () => {
    setOpen(true);
  };

  function handleOk() {
    router.push('/userTickets');
  }

  return fetched ? (
    <div className={styles.searchBarContainer}>
      <ToastContainer />
      <Space className={styles.centerContainer}>
        <List
          dataSource={accommodations?.results}
          renderItem={(item) => {
            return <AccommodationInfo id={item.id} user_id={item.user_id} name={item.name} location={item.location} features={item.features} image_urls={item.features} min_guests={item.min_guests} max_guests={item.max_guests} />;
          }}
        />
      </Space>

      <Modal
        open={open}
        title="Reserve"
        onOk={handleOk}
        footer={[
          <AntButton key="back" onClick={handleOk}>
            Go to tickets
          </AntButton>,
        ]}
      >
        <p>{purchaseFeedbackText}</p>
      </Modal>
    </div>
  ) : (
    <Loading />
  );
};

export default SearchData;

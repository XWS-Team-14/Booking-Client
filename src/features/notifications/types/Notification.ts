interface Notification {
  key: string;
  type:
    | 'new-reservation'
    | 'reservation-cancelled'
    | 'new-host-rating'
    | 'new-accommodation-rating'
    | 'featured-host-lost'
    | 'featured-host-gained'
    | 'host-reply-approved'
    | 'host-reply-denied';
  title: string;
  content: string;
  sender: Sender;
  accommodation: Accommodation;
  receiver: Receiver;
  status: 'read' | 'unread';
  timestamp: string;
}

interface Sender {
  name: string;
  id: string;
  picture: string;
}

interface Receiver {
  id: string;
}

interface Accommodation {
  id: string;
  name: string;
}
export default Notification;

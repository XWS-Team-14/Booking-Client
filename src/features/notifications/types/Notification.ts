interface Notification {
  type:
    | 'new-reservation'
    | 'reservation-cancelled'
    | 'new-host-rating'
    | 'new-accommodation-rating'
    | 'featured-host-update'
    | 'host-reply';
  title: string;
  content: string;
  sender: Sender;
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
export default Notification;

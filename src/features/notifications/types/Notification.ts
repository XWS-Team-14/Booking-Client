interface Notification {
  key?: string;
  type:
    | 'host-new-reservation'
    | 'host-reservation-cancelled'
    | 'host-new-review'
    | 'host-accommodation-new-review'
    | 'featured-host-lost'
    | 'featured-host-gained'
    | 'host-reply-approved'
    | 'host-reply-denied';
  title?: string;
  content?: string;
  sender: Sender;
  accommodation: Accommodation;
  receiver: Receiver;
  status: 'read' | 'unread';
  timestamp: string;
}

interface Sender {
  name: string;
  id: string;
}

interface Receiver {
  id: string;
}

interface Accommodation {
  id: string;
  name: string;
}
export default Notification;

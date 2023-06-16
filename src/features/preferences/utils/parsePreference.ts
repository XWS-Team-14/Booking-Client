/* eslint-disable indent */
import { NotificationPreference } from '@/common/types/NotificationPreference';

export const parsePreference = (preference: NotificationPreference) => {
  switch (preference.type) {
    case 'host-new-reservation':
      return 'New reservations';
    case 'host-reservation-cancelled':
      return 'Cancelled reservations';
    case 'host-new-review':
      return 'New host ratings';
    case 'host-accommodation-new-review':
      return 'New accommodation reviews';
    case 'host-featured-update':
      return 'Featured status updates';
    case 'guest-reservation-update':
      return 'Reservation updates';
    default:
      return '';
  }
};

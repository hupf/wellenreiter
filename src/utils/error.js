import { NotificationManager } from 'react-notifications';

const NOTIFICATION_TIMEOUT = 3000;

export function showError(message, exception) {
  if (exception) {
    console.error('Error:', exception);
  }
  NotificationManager.error(message, undefined, NOTIFICATION_TIMEOUT);
}

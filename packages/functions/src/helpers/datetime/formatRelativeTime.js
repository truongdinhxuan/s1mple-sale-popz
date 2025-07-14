import moment from 'moment';

export default function formatRelativeTime(dateStr) {
  if (!dateStr) return '';
  return moment(dateStr).fromNow();
}

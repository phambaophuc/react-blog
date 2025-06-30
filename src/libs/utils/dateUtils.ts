import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (isoString: string): string => {
  return format(new Date(isoString), 'MMMM d, yyyy');
};

export const timeAgo = (isoString: string): string => {
  return formatDistanceToNow(new Date(isoString), { addSuffix: true });
};

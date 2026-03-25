import axios from 'axios'

import { toast } from 'react-toastify';

export type NotifyProps = {
  type?: 'success' | 'error' | 'info' | 'warning' | 'default';
  message?: string;
}

const notifyOpts: object = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
}

export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export const notify = ({ type, message }: NotifyProps) => {
  switch (type) {
    case 'success':
      toast.success(message || 'Success!', notifyOpts);
      break;
    case 'error':
      toast.error(message || 'Error occurred!', notifyOpts );
      break;
    case 'info':
      toast.info(message || 'Information!', notifyOpts);
      break;
    case 'warning':
      toast.warning(message || 'Warning!', notifyOpts);
      break;
  }
}

export const messages = {
  SERVER_DISCONNECTED: 'Server disconnected!',
  NOT_ADMIN: 'You are not administrator!' 
}

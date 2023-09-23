import { useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRollbar } from '@rollbar/react';
import { useLogOut, useGetAuthHeader } from '../contexts/AuthContext';
import routes from '../common/routes';
import { useAppDispatch } from '../redux/hooks';
import { setInitialState } from '../redux/features/channels';
import Channels from '../components/Channels/Channels';
import Messages from '../components/Messages/Messages';
import MessageForm from '../components/MessageForm/MessageForm';
import ModalContainer from '../components/Modals/ModalContainer';

const ChatPage = () => {
  const getAuthHeader = useGetAuthHeader();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const logOut = useLogOut();
  const navigate = useNavigate();
  const location = useLocation();
  const rollbar = useRollbar();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(routes.dataPath(), {
        headers: getAuthHeader(),
        signal: controller.signal,
      })
      .then(({ data }) => {
        dispatch(setInitialState(data));
      })
      .catch((err) => {
        if (!axios.isAxiosError(err)) {
          toast.error(t('errors.unknown'));
          rollbar.error('Unknown error fetching initial data', err);
          return;
        }

        if (err.response?.status === 401) {
          const { from } = location.state || { from: { pathname: '/login' } };
          logOut();
          navigate(from);
        } else if (err.name !== 'CanceledError') {
          toast.error(t('errors.network'));
          rollbar.error('Axios error fetching initial data', err);
        }
      });

    return () => controller.abort();
  }, [dispatch, getAuthHeader, t, location, logOut, rollbar, navigate]);

  return (
    <Container className="h-100 overflow-hidden rounded shadow my-4">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <Channels />
        </div>
        <div className="col d-flex flex-column p-0 h-100">
          <Messages />
          <div className="mt-auto px-5 py-3">
            <MessageForm />
          </div>
        </div>
      </div>
      <ModalContainer />
    </Container>
  );
};

export default ChatPage;

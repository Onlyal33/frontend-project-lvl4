import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { RefObject } from 'react';
import { useApi } from '../contexts/ApiContext';
import useModal from '../hooks/useModal';
import { ClientToServerEventData, FormikActions } from '../types';

const useEmit = <T extends keyof ClientToServerEventData>(eventType: T) => {
  const api = useApi();
  const { hideModal } = useModal();
  const { t } = useTranslation();

  const f = async (
    value: ClientToServerEventData[T],
    actions: FormikActions,
    ref: RefObject<HTMLInputElement | HTMLButtonElement>,
  ) => {
    if (api) {
      let data;
      try {
        data = await api[eventType](value);
        actions.resetForm();
        toast.success(t(`toast.channel.${eventType}`));
        hideModal();
      } catch (err) {
        toast.error(t('errors.network'));
        if (ref.current instanceof HTMLInputElement) {
          ref.current?.select();
        } else if (ref.current instanceof HTMLButtonElement) {
          ref.current?.focus();
        }
      }
      actions.setSubmitting(false);
      return data;
    }
  };

  return f;
};

export default useEmit;

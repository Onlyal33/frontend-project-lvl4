import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast } from 'react-toastify';
import { useUser } from '../../contexts/AuthContext';
import { selectcurrentChannelId } from '../../redux/features/channels/selectors';
import { useAppSelector } from '../../redux/hooks';
import { selectIsModalOpen } from '../../redux/features/modals/selectors';
import validationSchema from '../../common/validation';
import send from '../../assets/send.svg';
import { useApi } from '../../contexts/ApiContext';
import { useProfanityFilter } from '../../contexts/ProfanityFilterContext';

export default function MessageForm() {
  const currentChannelId = useAppSelector(selectcurrentChannelId);
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const inputRef = useRef<HTMLInputElement>(null);
  const username = useUser() ?? '';
  const { t } = useTranslation();
  const emit = useApi()?.newMessage;
  const filterProfanity = useProfanityFilter();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async ({ message }: { message: string }) => {
      const filterted = filterProfanity?.clean(message) ?? message;

      if (currentChannelId && emit) {
        try {
          await emit({
            body: filterted.trim(),
            username,
            channelId: currentChannelId,
          });
          formik.resetForm();
        } catch (err) {
          toast.error(t('errors.network'));
        }
        formik.setSubmitting(false);
      }
    },
    validateOnBlur: false,
    validationSchema: validationSchema.message,
  });

  useEffect(() => {
    if (!isModalOpen) {
      inputRef.current?.focus();
    }
  }, [currentChannelId, isModalOpen, formik.isSubmitting]);

  return (
    <Form
      className="py-1 border rounded-2"
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <InputGroup hasValidation={!formik.isValid}>
        <Form.Control
          className="border-0 p-0 ps-2"
          name="message"
          aria-label="New message"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={t('tooltip.message')}
          value={formik.values.message}
          disabled={formik.isSubmitting}
          ref={inputRef}
        />
        <Button
          type="submit"
          variant="link"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          <img src={send} alt={t('main.button.send')}></img>
        </Button>
      </InputGroup>
    </Form>
  );
}

import { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useFormik } from 'formik';
import LoaderButton from '@/common/components/button/components/LoaderButton';
import InputComponent from '@/common/components/input/components/InputComponent';
import { INQURY } from '@/common/graphql/mutation/INQURY';

const ContactUsForm = () => {
  const { mutate } = useApolloClient();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      message: '',
      attended: false,
    },
    onSubmit: (values) => {
      setLoading(true);
      mutate<{ createReview: { data: Review } }>({
        mutation: INQURY,
        variables: values,
      })
        .then((res) => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {};

      if (!values.email) {
        errors.email = 'Required';
      }

      if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email';
      }

      if (!values.firstName) {
        errors.firstName = 'Required';
      }

      if (!values.lastName) {
        errors.lastName = 'Required';
      }

      if (!values.message) {
        errors.message = 'Required';
      }

      return errors;
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  return (
    <div className="flex w-full justify-center">
      <form
        className="flex w-160 flex-col gap-1"
        onSubmit={formik.handleSubmit}
      >
        <InputComponent
          label="First Name"
          placeholder="Enter your first name..."
          name="firstName"
          handleChange={formik.handleChange}
          value={formik.values.firstName}
          errors={formik.errors}
          handleBlur={formik.handleBlur}
        />
        <InputComponent
          label="Last Name"
          placeholder="Enter your last name..."
          name="lastName"
          handleChange={formik.handleChange}
          value={formik.values.lastName}
          errors={formik.errors}
          handleBlur={formik.handleBlur}
        />
        <InputComponent
          label="Email"
          placeholder="Enter your email..."
          name="email"
          handleChange={formik.handleChange}
          value={formik.values.email}
          errors={formik.errors}
          handleBlur={formik.handleBlur}
        />
        <InputComponent
          label="Message"
          placeholder="Enter your message..."
          name="message"
          handleChange={formik.handleChange}
          value={formik.values.message}
          errors={formik.errors}
          handleBlur={formik.handleBlur}
        />

        <LoaderButton
          className="mt-1 rounded-md py-2"
          type="submit"
          loading={loading}
        >
          Submit
        </LoaderButton>
      </form>
    </div>
  );
};

export default ContactUsForm;

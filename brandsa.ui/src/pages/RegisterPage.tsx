import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import UserService from '../core/services/AuthService';
import { toast } from 'react-toastify';
import { enmRole } from '../core/enums/Role';

interface FormValues {
  username: string;
  password: string;
  passwordRepeat: string;
  role: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Password confirmation is required'),
  role: Yup.string().required('Role is required'),
});

const RegisterPage: React.FC = () => {
  const initialValues: FormValues = {
    username: '',
    password: '',
    passwordRepeat: '',
    role: enmRole.Admin.toString(),
  };

  const navigate = useNavigate();

  const handleRegister = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const newUserReq = {
        username: values.username,
        password: values.password,
        role: parseInt(values.role),
      };
      const response = await UserService.Create(newUserReq);
      if (response.success) {
        toast.success(response.message);
        console.log(response);
        navigate('/login');
      } else {
        toast.warning(response.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred while registering.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleRegister}
    >
      {({ isSubmitting }) => (
        <Form className='flex flex-col gap-4 justify-center items-center'>
          <Field
            type='text'
            name='username'
            placeholder='Username'
            className='rounded p-2 w-2/4'
          />
          <ErrorMessage name='username' component='div' className='text-red-500 text-left' />

          <Field
            type='password'
            name='password'
            placeholder='Password'
            className='rounded p-2 w-2/4'
          />
          <ErrorMessage name='password' component='div' className='text-red-500' />

          <Field
            type='password'
            name='passwordRepeat'
            placeholder='Password again'
            className='rounded p-2 w-2/4'
          />
          <ErrorMessage name='passwordRepeat' component='div' className='text-red-500' />

          <Field as='select' name='role' className='rounded p-2 w-2/4'>
            <option value={enmRole.Admin}>Admin</option>
            <option value={enmRole.User}>User</option>
          </Field>
          <ErrorMessage name='role' component='div' className='text-red-500' />

          <button
            type='submit'
            className='h-9 rounded bg-bgsecondary text-textprimary px-3 bg-gray-200 border border-black rounded-md'
            disabled={isSubmitting}
          >
            Register
          </button>
          <Link to='/login'>Have an account? <b>Login</b></Link>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterPage;

import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import mdlUserLoginRequest from '../core/servicemodels/user/UserLoginRequest';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { login } = useAuth();

  const validationSchema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = async (values: { username: string; password: string }) => {
    const newUserReq = new mdlUserLoginRequest(values.username, values.password);
    login(newUserReq);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='flex flex-col gap-4 justify-center items-center'>
            <Field
              type="text"
              name='username'
              placeholder='Username'
              className='rounded p-2 w-2/4'
            />
            <ErrorMessage name="username" component="div" className="text-red-500" />

            <Field
              type="password"
              name='password'
              placeholder='Password'
              className='rounded p-2 w-2/4'
            />
            <ErrorMessage name="password" component="div" className="text-red-500" />

            <button type="submit" className='md:h-9 px-2 md:px-4   md:font-medium bg-bgsecondary text-textprimary  bg-gray-200 border border-black rounded-md' disabled={isSubmitting}>
              Login
            </button>

            <Link to="/register">Don't have an account? <b>Register</b></Link>
          </Form>
        )}

      </Formik>
    </div>
  );
}

export default LoginPage;

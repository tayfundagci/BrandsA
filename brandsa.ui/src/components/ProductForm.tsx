import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ProductService from '../core/services/ProductService';
import { toast } from 'react-toastify';
import mdlCreateProductRequest from '../core/servicemodels/product/CreateProductRequest';
import mdlUpdateProductRequest from '../core/servicemodels/product/UpdateProductRequest';

interface FormValues {
  id?: string;
  name: string;
  description: string;
  price: number;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required')
    .positive('Price must be a positive number')
    .integer('Price must be an integer'),
});

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productRequest, setProductRequest] = useState<FormValues>({
    name: '',
    description: '',
    price: 0,
  });

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id]);

  const getProduct = async () => {
    const response = await ProductService.Get(id!);
    if (response.success) {
      setProductRequest({
        id: response.body?.id!,
        name: response.body?.name!,
        description: response.body?.description!,
        price: Number(response.body?.price)!,
      });
    } else {
      toast.warning(response.message);
    }
  };

  const handleSubmit = async (values: FormValues) => {
    let response;
    if (id) {
      const productRequest: mdlUpdateProductRequest = {
        id: values.id!,
        name: values.name,
        description: values.description,
        price: values.price,
      };
      response = await ProductService.Update(productRequest);
    } else {
      const productRequest: mdlCreateProductRequest = {
        name: values.name,
        description: values.description,
        price: values.price,
      };
      response = await ProductService.Create(productRequest);
    }

    if (response.success) {
      toast.success(response.message);
      navigate('/');
    } else {
      toast.warning(response.message);
    }
  };

  return (
    <Formik
      initialValues={productRequest}
      enableReinitialize  // Enable reinitialization
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className='flex flex-col gap-4 justify-center items-center'>
        <Field
          type='text'
          name='name'
          placeholder='Name'
          className='rounded p-2 w-2/4'
        />
        <ErrorMessage name='name' component='div' className='text-red-500' />

        <Field
          type='text'
          name='description'
          placeholder='Description'
          className='rounded p-2 w-2/4'
        />
        <ErrorMessage
          name='description'
          component='div'
          className='text-red-500'
        />

        <Field
          type='number'
          name='price'
          placeholder='Price'
          className='rounded p-2 w-2/4'
        />
        <ErrorMessage name='price' component='div' className='text-red-500' />

        <button
          type='submit'
          className='h-10 rounded bg-bgsecondary text-textprimary px-4 font-medium'
        >
          {id ? 'Update' : 'Create'}
        </button>
      </Form>
    </Formik>
  );
};

export default ProductForm;

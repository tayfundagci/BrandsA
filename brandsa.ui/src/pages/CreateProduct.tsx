import React, { useState } from 'react'
import mdlCreateProductRequest from '../core/servicemodels/product/CreateProductRequest'
import { Link, useNavigate } from 'react-router-dom'
import ProductService from '../core/services/ProductService';
import { toast } from 'react-toastify';

function CreateProduct() {

  const [createProductRequest, setCreateProductRequest] = useState<mdlCreateProductRequest>()
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCreateProductRequest((prevRequest: any) => ({
      ...prevRequest,
      [name]: value,
    }));
  };

  const handleCreate = async (e: any) => {
    e.preventDefault()
    const response = await ProductService.Create(createProductRequest!)
    if (response.success) {
      toast.success(response.message)
      navigate("/")
    } else {
      toast.warning(response.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleCreate} className='flex flex-col gap-4 justify-center items-center'>
        <input type="text" placeholder='Name' name='name' className='rounded p-2 w-2/4' onChange={handleChange} />
        <input type="text" placeholder='Description' name='description' className='rounded p-2 w-2/4' onChange={handleChange} />
        <input type="number" placeholder='Price' name='price' className='rounded p-2 w-2/4' onChange={handleChange} />
        <button className='h-10 rounded bg-bgsecondary text-textprimary px-4 font-medium' >Create</button>
      </form>
    </div>
  )
}

export default CreateProduct
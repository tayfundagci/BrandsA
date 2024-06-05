import { useEffect, useState } from 'react'
import mdlProduct from '../core/models/Product'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import ProductService from '../core/services/ProductService';

function DetailPage() {

  const [product, setProduct] = useState<mdlProduct>()
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [id])

  const getProduct = async () => {
    const response = await ProductService.Get(id!);
    if (response.success) {
      setProduct(response.body);
    } else {
      toast.warning(response.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="mb-2">
        <div className="font-bold">Name:</div>
        <div>{product?.name}</div>
      </div>
      <div className="mb-2">
        <div className="font-bold">Description:</div>
        <div>{product?.description}</div>
      </div>
      <div>
        <div className="font-bold">Price:</div>
        <div>{product?.price}</div>
      </div>
    </div>
  )
}

export default DetailPage
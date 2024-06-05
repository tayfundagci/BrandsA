import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { enmRole } from '../core/enums/Role';
import mdlProduct from '../core/models/Product';
import ProductService from '../core/services/ProductService';
import mdlListProductRequest from '../core/servicemodels/product/ListProductRequest';
import { debug } from 'console';
import mdlCreateProductRequest from '../core/servicemodels/product/CreateProductRequest';
import { useNavigate } from 'react-router-dom';

function HomePage() {

  const { user } = useAuth();
  const [products, setProducts] = useState<Array<mdlProduct>>([])
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length == 0) {
      getProducts();
    }
  }, [])



  const getProducts = async () => {
    const response = await ProductService.List(new mdlListProductRequest())
    if (response && response.products && response.products?.length > 0) {
      console.log(response)
      setProducts(response.products)
    }
  }


  return (
    <div>
      <div className='p-20 flex flex-col'>
        {user?.role == enmRole.Admin && <button className='pb-5 flex justify-end font-medium hover:underline' onClick={() => navigate("/create")}>Create Product</button>}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-50 uppercase  bg-gray-700 ">
              <tr>
                <th scope="col-3" className="px-6 py-3">
                  Name
                </th>
                <th scope="col-3" className="px-6 py-3">
                  Description
                </th>
                <th scope="col-3" className="px-6 py-3">
                  Price
                </th>
                {user?.role == enmRole.Admin && (
                  <th scope="col-3" className="px-6 py-3">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {products.map((item: any) => (
                <tr className="bg-white border-b  hover:bg-gray-50 ">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {item.name}
                  </th>
                  <td className="px-6 py-4">
                    {item.description}
                  </td>
                  <td className="px-6 py-4">
                    {item.price}
                  </td>
                  {user?.role == enmRole.Admin && (
                    <td className="px-6 py-4 text-right flex gap-3">
                      <button className="font-medium text-yellow-700 hover:underline"  >Edit</button>
                      <button className="font-medium text-red-600  hover:underline" >Delete</button>
                    </td>
                  )}
                </tr>
              ))}


            </tbody>
          </table>
        </div>



      </div>
    </div>
  )
}

export default HomePage
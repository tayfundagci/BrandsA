import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { enmRole } from '../core/enums/Role';
import mdlProduct from '../core/models/Product';
import ProductService from '../core/services/ProductService';
import mdlListProductRequest from '../core/servicemodels/product/ListProductRequest';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function HomePage() {

  const { user } = useAuth();
  const [products, setProducts] = useState<Array<mdlProduct>>([])
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length == 0) {
      getProducts();
    }
  }, [products])

  const getProducts = async () => {
    const response = await ProductService.List(new mdlListProductRequest())
    if (response && response.success) {
      console.log(response)
      setProducts(response.body!)
    }
  }

  const confirmDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete") == true) {
      const response = await ProductService.Delete(id);
      if (response && response.success) {
        toast.success(response.message);
        getProducts();
      }
    } else {
      toast.warning("You canceled!");
    }
  }

  return (
    <div>
      <div className='p-5 md:p-20 flex flex-col'>
        {user?.role == enmRole.Admin && (
          <div className='flex justify-end'>
            <button className='m-2 md:h-9 px-2 md:px-4   md:font-medium  bg-gray-200 border border-black rounded-md ' onClick={() => navigate("/create")}>Create Product</button>
          </div>
        )}

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
                {/* <th scope="col-3" className="px-6 py-3">
                  Price
                </th> */}
                {user?.role == enmRole.Admin && (
                  <th scope="col-3" className="px-6 py-3">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {products.length == 0 && (
                <div className='p-2'>There is no product. You can add new one!</div>
              )}
              {products.map((item) => (
                <tr key={item.id} className="bg-white border-b  hover:bg-gray-50 ">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap hover:cursor-pointer " onClick={() => navigate(`/detail/${item.id}`)}>
                    🔍 {item.name}
                  </th>
                  <td className="px-6 py-4">
                    {item.description}
                  </td>
                  {/* <td className="px-6 py-4">
                    {item.price}
                  </td> */}
                  {user?.role == enmRole.Admin && (
                    <td className="px-6 py-4 text-right flex gap-3">
                      <button className="font-medium text-yellow-700 hover:underline" onClick={() => navigate(`/edit/${item.id}`)}  >Edit</button>
                      <button className="font-medium text-red-600  hover:underline" onClick={() => confirmDelete(item.id!)} >Delete</button>
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
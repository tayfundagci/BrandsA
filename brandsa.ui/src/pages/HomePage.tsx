import React from 'react'

function HomePage() {

  const products: any = [{
    name: "test1",
    description: "desc1",
    price: 10
  }, {
    name: "test2",
    description: "desc2",
    price: 10
  }]

  return (
    <div className='p-20'>

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
              <th scope="col-3" className="px-6 py-3">
                Actions
              </th>
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
                <td className="px-6 py-4 text-right flex gap-3">
                  <a href="#" className="font-medium text-yellow-600  hover:underline">Edit</a>
                  <a href="#" className="font-medium text-blue-600  hover:underline">Detail</a>
                </td>
              </tr>
            ))}


          </tbody>
        </table>
      </div>

    </div>
  )
}

export default HomePage
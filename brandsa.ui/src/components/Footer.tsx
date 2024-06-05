import moment from 'moment'
import React from 'react'

function Footer() {
  return (
    <footer className="p-4 ">
      <div className="mx-auto max-w-screen-xl text-center">
        {/* <a href="#" className="flex justify-center items-center text-2xl font-semibold  ">
        TD BLOG
      </a> */}
        <p className="my-6  "></p>
        {/* <ul className="flex flex-wrap justify-center items-center mb-6  ">
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
        </li>
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6">Premium</a>
        </li>
        
      </ul> */}
        <span className="text-sm  sm:text-center ">© {moment().format("YYYY")} <a href="#" className="hover:underline">Tayfun Dağcı</a>. All Rights Reserved.</span>
      </div>
    </footer>
  )
}

export default Footer
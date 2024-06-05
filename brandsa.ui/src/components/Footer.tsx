import moment from 'moment'

function Footer() {
  return (
    <footer className="p-4 ">
      <div className="mx-auto max-w-screen-xl text-center">
        <span className="text-sm  sm:text-center ">© {moment().format("YYYY")} <a href="#" className="hover:underline">Tayfun Dağcı</a></span>
      </div>
    </footer>
  )
}

export default Footer
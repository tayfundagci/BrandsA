import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div>404 Not Found
      <Link to="/">Go To Home Page</Link>
    </div>
  )
}

export default NotFoundPage
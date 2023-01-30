import Link from 'next/link'
import React from 'react'

function error() {
  return (
    <>
    <div>You need to get a life an login!</div>
    <Link href='/'>Home</Link>
    </>
  )
}

export default error
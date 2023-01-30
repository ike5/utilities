import React from 'react'

export default function Dashboard({session}: any) {
  return (
    <>{!session ? <div>Not signed in</div> : <div>Signed in</div>}
    </>
  )
}

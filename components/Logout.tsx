"use client"

import { logout } from "@/actions/auth"

const Logout = () => {
  return (
    <div onClick={() => logout()}>
        <p>Logout</p>
    </div>
  )
}

export default Logout
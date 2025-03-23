"use client"

import { logout } from "@/actions/auth"

const Logout = () => {
  return (
    <div className="cursor-pointer" onClick={() => logout()}>
        <p>Logout</p>
    </div>
  )
}

export default Logout
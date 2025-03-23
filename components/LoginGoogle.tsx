"use client"

import { login } from "@/actions/auth"

const LoginGoogle = () => {
  return (
    <div className="cursor-pointer" onClick={() => login("Google")}>
        <p>Login with Google</p>
    </div>
  )
}

export default LoginGoogle
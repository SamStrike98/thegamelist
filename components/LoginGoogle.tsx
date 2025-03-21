"use client"

import { login } from "@/actions/auth"

const LoginGoogle = () => {
  return (
    <div onClick={() => login("Google")}>
        <p>Login with Google</p>
    </div>
  )
}

export default LoginGoogle
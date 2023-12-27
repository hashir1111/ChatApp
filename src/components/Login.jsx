import React from "react";
import { GoogleOutlined} from "@ant-design/icons";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth} from '../firebase'

const Login = () => {
    const handleGoogle = (e) => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth , provider)
    }
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to Chat App</h2>
        <div className="login-button google" onClick={handleGoogle}>
          <GoogleOutlined /> SignIn with Google
        </div>
      </div>
    </div>
  );
};

export default Login;

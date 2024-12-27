import React, { useEffect } from "react";
import FormInput from "../components/FormInput";
import { Form, Link, useActionData } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

// action
export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  return { password, email };
};

function Login() {
  const { loginWithEmailAndPassword } = useLogin();
  const data = useActionData();
  useEffect(() => {
    if (data) {
      loginWithEmailAndPassword(data.email, data.password);
    }
  });
  return (
    <div className="h-screen grid place-items-center w-full bg-green-50">
      <Form method="post" className="max-w-96 mx-auto w-full ">
        <h2 className="text-4xl font-bold text-center uppercase my-5">Login</h2>

        <FormInput
          type="email"
          placeholder="Email"
          label="Your  Email"
          name="email"
        />
        <FormInput
          type="password"
          placeholder="Password"
          label="Your Pasword"
          name="password"
        />

        <div className="my-5">
          <button className="btn btn-success text-white btn-block">
            Register
          </button>
        </div>
        <p className="text-center text-x italic opacity-70">
          if you don't have a accaunt ,
          <Link className="link link-primary " to="/register">
            REGISTER
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default Login;

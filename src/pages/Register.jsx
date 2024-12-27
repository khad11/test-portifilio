import React, { useEffect } from "react";
import FormInput from "../components/FormInput";
import { Link, useActionData, Form } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

// action
export const action = async ({ request }) => {
  const form = await request.formData();
  const displayName = form.get("name");
  const email = form.get("email");
  const password = form.get("password");
  return { displayName, password, email };
};

function Register() {
  const { registerWithEmailAndPassword } = useRegister();
  const data = useActionData();
  useEffect(() => {
    if (data) {
      registerWithEmailAndPassword(data.displayName, data.email, data.password);
    }
  }, [data]);
  return (
    <div className="h-screen grid place-items-center w-full bg-green-50">
      <Form method="post" className="max-w-96 mx-auto w-full ">
        <h2 className="text-4xl font-bold text-center uppercase my-5">
          Register
        </h2>
        <FormInput
          type="text"
          placeholder="Name"
          label="Display Name"
          name="name"
        />
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
        <FormInput
          type="password"
          placeholder="Password again"
          label="Your Pasword again"
          name="repeadPassword"
        />
        <div className="my-5">
          <button className="btn btn-success text-white btn-block">
            Register
          </button>
        </div>
        <p className="text-center text-x italic opacity-70">
          if you have a accaunt ,{" "}
          <Link className="link link-primary " to="/login">
            LOGIN
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default Register;

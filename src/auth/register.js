import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./auth.css";

function Register() {
  const history = useHistory();

  const [registerForm, setregisterForm] = useState({
    name: "",
    email: "",
    password: "",
    // confirmPassword: "",
  });

  const onSubmit = (values) => {
    axios
      .post("https://ecom-react-task.herokuapp.com/auth/register", values)
      .then((res) => {
        history.push("/login");
      });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string()
      .email("Email is Invalid")
      .required("Email is Required."),
    password: Yup.string().required("Password is Required"),
    // confirmPassword: Yup.string().required("Confirm Password is Required"),
  });

  const formik = useFormik({
    initialValues: registerForm,
    onSubmit,
    validationSchema,
  });

  return (
    <>
      <div className="lContainer">
        <div className="lItem">
          <div className="loginForm">
            <h2>Register</h2>
            <form onSubmit={formik.handleSubmit} className="login-form">
              <div className="from-row">
                <div className="form-group col-12">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Name..."
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.name
                  ? formik.touched.name && (
                      <span className="text-danger">{formik.errors.name}</span>
                    )
                  : null}
              </div>
              <div className="from-row">
                <div className="form-group col-12">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder="Email..."
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.email
                  ? formik.touched.email && (
                      <span className="text-danger">{formik.errors.email}</span>
                    )
                  : null}
              </div>
              <div className="from-row">
                <div className="form-group col-12">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Password..."
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.password
                  ? formik.touched.password && (
                      <span className="text-danger ml-3">
                        {formik.errors.password}
                      </span>
                    )
                  : null}
              </div>
              
              <div className="container mb-2">
                Do you have account ?
                <u>
                  <Link to="/login">Login</Link>
                </u>
              </div>
              <button
                type="submit"
                className="btn btn-primary login-form-button"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

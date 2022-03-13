import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./auth.css";
import { useDispatch } from "react-redux";
import { loginAction } from "../store/action";

function Login() {

  const history = useHistory();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (values) => {
    axios
      .post("https://ecom-react-task.herokuapp.com/auth/login", values)
      .then((res) => {
        console.log(res);
        dispatch(loginAction());
        localStorage.setItem("token", res["data"]["data"]["token"]);
        history.push("/home");
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is Invalid")
      .required("Email is Required."),
    password: Yup.string().required("Password is Required"),
  });

  const formik = useFormik({
    initialValues: loginForm,
    onSubmit,
    validationSchema,
  });

  const dispatch = useDispatch();


  return (
    <>
      <div className="lContainer">
        <div className="lItem">
        
          <div className="loginForm">
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit} className="login-form">
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
                      <span className="text-danger">
                        {formik.errors.password}
                      </span>
                    )
                  : null}
              </div>
              <div className="container mb-2">
                Don't you have account ?
                <u>
                  <Link to="/register">Register</Link>
                </u>
              </div>
              <button
                type="submit"
                className="btn btn-primary login-form-button"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

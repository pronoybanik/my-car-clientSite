import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useToken from "../../hooks/useToken";
import { GoogleAuthProvider } from "firebase/auth";

const LogIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn, googleLogin } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";
  const [loginUserEmail, setLoginUserEmail] = useState("");

  const [token] = useToken(loginUserEmail);

  if (token) {
    navigate(from, { replace: true });
  }

  const provider = new GoogleAuthProvider();

  const handleGoogle = () => {
    googleLogin(provider)
      .then((result) => {
        const user = result.user;
        console.log(user);

        fetch("https://car-server-site.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setLoginUserEmail(user?.email);
          });
      })
      .catch((err) => console.error(err));
  };

  const handleLogin = (data) => {
    // console.log(data);
    setLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Login successful");
        setLoginUserEmail(user?.email);
      })
      .catch((error) => {
        console.error(error.message);
        setLoginError(error.message);
      });
  };
  // console.log(token);

  return (
    <div className="font-serif h-[600px] flex justify-center items-center">
      <div className="w-96 p-7">
        <div>
          <h1>Admin Email: admin2@gamil.com</h1>
          <p>password: aA1@34</p>
        </div>
        <h2 className="text-xl text-center mt-16">Login now fast</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              {...register("email", { required: "Email Address is required" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-800">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">PassWord</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "password must be 6 characters or longer",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Forget Password</span>
            </label>
            {errors.password && (
              <p className="text-red-800">{errors.password?.message}</p>
            )}
          </div>

          <div>
            {loginError && <p className="text-red-600 my-2">{loginError}</p>}
          </div>
          <input className="btn w-full" value="Log In" type="submit" />
        </form>
        <p>
          New to Doctors Portal:{" "}
          <Link className="text-secondary" to="/register">
            Create a accounts
          </Link>
        </p>
        <div className="divider">OR</div>
        <button onClick={handleGoogle} className="btn btn-outline w-full">
          Google LogIn
        </button>
      </div>
    </div>
  );
};

export default LogIn;

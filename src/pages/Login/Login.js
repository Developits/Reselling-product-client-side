import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const { signIn, setLoading, providerLogin } = useContext(AuthContext);

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const githubProvider = new GithubAuthProvider();

  const handleGithubSignIn = () => {
    providerLogin(githubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div className="w-1/2 grid grid-cols-1 min-h-screen mx-auto">
      <h1 className="text-3xl text-center font-bold">Please log in !</h1>
      <form onSubmit={handleSubmit} className="card-body mt-0">
        <div className="form-control">
          <label className="label -mt-24">
            <span>Email</span>
          </label>
          <input
            type="text"
            name="email"
            placeholder="email"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="input input-bordered"
          />
          <label className="label font-semibold">
            <p className="text-red-600">{error}</p>
          </label>
        </div>
        <div className="form-control mt-2">
          <input className="btn btn-primary" type="submit" value="Login" />
        </div>
        <div className="divider">OR</div>
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-info btn-outline btn-block"
        >
          <FcGoogle /> <span className="ml-2">continue with Google</span>
        </button>
        <button
          onClick={handleGithubSignIn}
          className="btn btn-info btn-outline btn-block"
        >
          <FaGithub /> <span className="ml-2">continue with Github</span>
        </button>
        <p className="font-bold">
          New to this website?
          <Link className="text-red-600" to="/signup">
            Please Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
// import useToken from "../../hooks/useToken";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const { createUser, updateUserProfile, providerLogin } =
    useContext(AuthContext);
  const [signUpError, setSignUPError] = useState("");
  // const [createdUserEmail, setCreatedUserEmail] = useState("");

  // const [token] = useToken(createdUserEmail);
  // console.log(createdUserEmail);
  // if (token) {
  //   navigate("/");
  // }

  const handleSignUp = (data) => {
    setSignUPError("");
    createUser(data.email, data.password)
      .then((result) => {
        toast.success("User Created Successfully.");
        const userInfo = {
          name: data.name,
          email: data.email,
          accountType: data.accountType,
          verified: false,
        };

        handleUpdateUserProfile(userInfo);
      })
      .catch((error) => {
        console.log(error);
        setSignUPError(error.message);
      });
  };

  const handleUpdateUserProfile = (userData) => {
    const profile = {
      displayName: userData.name,
    };

    updateUserProfile(profile)
      .then(() => {
        saveUser(userData);
      })
      .catch((error) => console.error(error));
  };

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    await providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = error.message;
        setSignUPError(errorMessage);
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
        setSignUPError(errorMessage);
      });
  };
  const saveUser = (userData) => {
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        // setCreatedUserEmail(userData.email);
        navigate(from, { replace: true });
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-1/2 p-7">
        <h2 className="text-3xl text-center font-bold">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full  ">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is Required",
              })}
              className="input input-bordered w-full  "
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full  ">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              className="input input-bordered w-full  "
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control w-full  ">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters long",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Buyer</span>
              <input
                onChange={() => {}}
                type="radio"
                value="buyer"
                className="radio checked:bg-red-500"
                {...register("accountType", {
                  required: true,
                })}
                checked
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Seller</span>
              <input
                onChange={() => {}}
                type="radio"
                value="seller"
                className="radio checked:bg-blue-500"
                {...register("accountType", {
                  required: true,
                })}
              />
            </label>
          </div>
          <input
            className="btn btn-accent w-full mt-4"
            value="Sign Up"
            type="submit"
          />
          {signUpError && <p className="text-red-600">{signUpError}</p>}
        </form>
        <p className="font-bold">
          Already have an account?
          <Link className="text-red-600" to="/login">
            Please Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-info btn-outline btn-block"
        >
          <FcGoogle /> <span className="ml-2">continue with Google</span>
        </button>
        <button
          onClick={handleGithubSignIn}
          className="btn btn-info mt-2 btn-outline btn-block"
        >
          <FaGithub /> <span className="ml-2">continue with Github</span>
        </button>
      </div>
    </div>
  );
};

export default SignUp;

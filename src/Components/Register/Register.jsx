import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useState } from "react";

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(name, email, password, accepted);
    // reset user && success
    setRegisterError("");
    setSuccess("");
    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters or longer");
      return;
    }
    else if (!/[A-Z]/.test(password)) {
      setRegisterError("Your password should have at least one upper case characters.");
      return;
    }
    else if (!accepted) {
      setRegisterError("Please accepct our trmes and conditions!")
      return;
    }

    // createUser
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result.user);
        setSuccess("User created successfully");
        //Update profile
        updateProfile(result.user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(()=>{
          console.log("Profile updated")
        })
        .catch()
        // send email verification
        sendEmailVerification(result.user)
          .then(() => {
            alert("please check your email and varify your account")
          })
      })
      .catch(error => {
        console.error(error);
        setRegisterError(error.message)
      })
  }
  return (
    <div className="text-center border">
      <div className="mx-auto md:w-1/2">
        <h3 className="text-3xl mb-8">This is register</h3>
        <form onSubmit={handleRegister}>
          <input className="mb-4 w-full px-2 py-4 rounded-lg" placeholder="Your name" type="text" name="name" id="" required />
          <br />
          <input className="mb-4 w-full px-2 py-4 rounded-lg" placeholder="Email address" type="email" name="email" id="" required />
          <br />
          <div className="mb-4 relative">
            <input className=" w-full px-2 py-4 rounded-lg"
              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
              name="password"
              id="" required />
            <span className="absolute top-4 right-2" onClick={() => setShowPassword(!showPassword)}>
              {
                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
              }
            </span>
          </div>
          <br />
          <div className="mb-3">
            <input className="mr-2" type="checkbox" name="terms" id="terms" />
            <label className="" htmlFor="terms">Accept our <a>Terms and conditions</a></label>
          </div>
          <br />
          <input className="btn btn-primary mb-4 w-full " type="submit" value="Register" />
        </form>

        {
          registerError && <p className="text-red-800">{registerError}</p>
        }
        {
          success && <p className="text-green-800">{success}</p>
        }
        <p>Allready have an account Please <Link to='/login'>Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
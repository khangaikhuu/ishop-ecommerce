import { useState } from "react";

export default function Login() {
  const URL = "http://localhost:8080/auth/login";

  const initialState = {
    email: "",
    password: "",
    error: "",
    errorStatus: "",
  };

  const [state, setState] = useState(initialState);
  async function fetchLogin(url) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: state.email,
        password: state.password,
      }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success === true) {
      setState({ ...state, errorStatus: false });
      localStorage.setItem("token", data.token);
    } else {
      setState({ ...state, errorStatus: true });
    }
    setState({ ...state, error: data.status });
    console.log(state.status);
    console.log(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login");
    fetchLogin(URL);
  };

  return (
    <div>
      <div className="signup-container text-center">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email*
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => {
                setState({ ...state, email: e.target.value });
              }}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password*
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Create a password"
            ></input>
            <div id="emailHelp" className="form-text">
              Must be at least 8 characters.
            </div>
            {/* <p className={state.errorStatus ? "text-danger" : "text-success"}>
              {state.error}
            </p>
            {
              state.errorStatus ? <p className={state.errorStatus ? "text-danger" : "text-success"}>}
                {state.error}
              </p> */}
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

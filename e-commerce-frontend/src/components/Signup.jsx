export default function Signup() {
  return (
    <div>
      <div className="signup-container text-center">
        <h1>Sign up</h1>
        <form>
          <div className="mb-3">
            <label for="name" className="form-label text-start">
              Name*
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
            ></input>
          </div>
          <div className="mb-3">
            <label for="email" className="form-label">
              Email*
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
            ></input>
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">
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
          </div>

          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
          <div className="mt-3">
            Already have an account? <a href="/login">Log in</a>
          </div>
        </form>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <Link to="..">Back</Link>
      <div className="p-6 max-w-sm mx-auto bg-slate-700 rounded-xl shadow-md items-center gap-3">
        <h1 className="text-3xl text-center mb-4">Log in</h1>
        <div className="flex flex-col gap-3 mb-4">
          <label>Username</label>
          <input id="username"></input>
          <label>Password</label>
          <input id="password" type="password"></input>
        </div>
        <div className="p-4 w-32 text-center bg-slate-600 mx-auto">Log in </div>
        <p className="text-center mt-2">
          Don't have an account yet?
          <Link className="text-slate-400 ml-1" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;

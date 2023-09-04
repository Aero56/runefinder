import { supabase } from '@api/supabase';
import { useState } from 'react';
import { toast } from 'react-hot-toast/headless';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast(error.message);
    } else {
      toast('Success! An e-mail has been sent for verification.');
      navigate('/');
    }

    setLoading(false);
  };

  return (
    <>
      <Link to="..">Back</Link>
      <div className="p-6 max-w-sm mx-auto bg-slate-700 rounded-xl shadow-md flex flex-col items-center gap-3">
        <h1 className="text-3xl text-center mb-4">Sign up</h1>
        <div className="flex flex-col w-full gap-3 mb-4">
          <label>RuneScape Username</label>
          <input id="username" onChange={(e) => setUsername(e.target.value)} />
          <label>Email</label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!loading ? (
          <button
            className="p-4 w-32 bg-slate-600 mx-auto flex justify-center items-center"
            onClick={handleSignup}
          >
            Sign up
          </button>
        ) : (
          <button
            className="p-4 w-32 text-center bg-slate-600 mx-auto flex justify-center items-center"
            disabled
          >
            <svg
              className="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 100"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                className="fill-slate-50"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                className="fill-slate-600"
              />
            </svg>
            Loading...
          </button>
        )}
        <p className="text-center mt-2">
          Already have an account?
          <Link className="text-slate-400 ml-1" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </>
  );
};

export default Signup;

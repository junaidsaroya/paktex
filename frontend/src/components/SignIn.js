import {Input, message} from 'antd';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setIsLoggedIn} from '../slices/app';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SignIn = ({toggleForm, setLoged}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const showPassword = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      message.error('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userId', data.user._id);
        dispatch(setIsLoggedIn(true));
        message.success('Sign in successful!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        message.error('An unexpected error occurred.');
      }
    } catch (error) {
      message.error('An error occurred during sign-in.');
      console.error('Sign-in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-md w-full bg-white py-6 px-8 rounded-2xl border-4 border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">
          Welcome back to{' '}
          <span className="font-bold text-themeColor">PakTex</span>
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Log in to track and control your product analytics with ease.
        </p>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-black text-start mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-black text-start mb-2">Password</label>
            <Input.Password
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
              required
            />
          </div>

          <div className="mt-1 mb-4 text-right">
            <span className="text-themeColor font-semibold text-sm">
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-themeGradient hover:bg-themeGradientHover cursor-pointer text-white font-semibold rounded-md shadow-md hover:bg-themeColor1 transition-colors"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="hover:text-black">
            Don't have an account?{' '}
            <button
              onClick={toggleForm}
              className="text-themeColor font-semibold hover:text-[#dc2626]"
            >
              Sign up
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

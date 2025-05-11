import {message} from 'antd';
import {useNavigate} from 'react-router-dom';
const LoggedInUserPopup = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    message.success('Logged out successfully!');
    setTimeout(() => {
      navigate('/login', {replace: true});
    }, 1000);
  };

  return (
    <div className="w-52 bg-white">
      <div
        className="text-[#EB4143] text-center cursor-pointer"
        onClick={handleLogout}
      >
        <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Logout
      </div>
    </div>
  );
};

export default LoggedInUserPopup;

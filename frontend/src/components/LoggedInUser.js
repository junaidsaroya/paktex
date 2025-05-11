import {useState} from 'react';
import {Popover} from 'antd';
import LoggedInUserPopup from './LoggedInUserPopup';

const LoggedInUser = () => {
  const [popoverVisible, setPopoverVisible] = useState(false);

  const handlePopoverVisibleChange = (visible) => {
    setPopoverVisible(visible);
  };

  return (
    <div className="w-full">
      <Popover
        content={<LoggedInUserPopup />}
        trigger="click"
        visible={popoverVisible}
        onVisibleChange={handlePopoverVisibleChange}
        placement="bottomLeft"
      >
        <div className="border-2 border-[#E9EAEB] rounded-xl w-full bg-white p-2 flex justify-between shadow-sm font-customFont">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#F5F5F5] border border-[#E9EAEB] flex items-center justify-center rounded-full">
              <span className="font-semibold text-xl text-[#535862]">
                {localStorage.getItem('userName')?.charAt(0).toUpperCase() ||
                  'U'}
              </span>
            </div>
            <div className="ml-3">
              <p className="font-semibold text-black">
                {localStorage.getItem('userName') || 'User Name'}
              </p>
            </div>
          </div>

          <div className="items-center flex">
            {popoverVisible ? (
              <i className="fa-solid fa-angle-up"></i>
            ) : (
              <i className="fa-solid fa-angle-down"></i>
            )}
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default LoggedInUser;

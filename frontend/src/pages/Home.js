import {useState} from 'react';
import {Layout} from 'antd';
import Sidebar from '../components/Sidebar';
import {Outlet} from 'react-router-dom';
const {Sider, Content} = Layout;

const Home = ({children}) => {
  const [collapsed] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  const colorBgContainer = '#EDF1F1';

  return (
    <Layout style={{minHeight: '100vh', overflow: 'hidden'}}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: '#EDF1F1',
          position: 'fixed',
          left: 0,
          zIndex: 1000,
        }}
      >
        <div className="demo-logo-vertical" />
        <Sidebar setActivePage={setActivePage} activePage={activePage} />
      </Sider>
      <Layout
        style={{marginLeft: collapsed ? 80 : 250}}
        className="bg-[#EDF1F1]"
      >
        <Content
          style={{
            padding: 10,
            minHeight: '100vh',
            background: colorBgContainer,
            overflowY: 'auto',
            zIndex: 1,
          }}
        >
          {children || <Outlet />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;

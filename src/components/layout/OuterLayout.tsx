import { Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';
// import Header from './Header';
// import Footer from './Footer';
import styles from './layout.module.less';
import HeaderRigthContext from './headerRight';


const items = new Array(5).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

const { Header, Content, Footer } = Layout;
const MainLayout = () => {
  return (
    <Layout>
      {/* Header, Sider, and other components */}

      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className={styles.left}>
          <div className={styles.logo} />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
        </div>
      <HeaderRigthContext/>
      </Header>
      <Content>
        <div>
          {/* Render relevant component based on menu item selected */}
          <Outlet />
        </div>
      </Content>

      <Footer>
        {/* Footer content */}
      </Footer>
    </Layout>
  );
};

export default MainLayout;
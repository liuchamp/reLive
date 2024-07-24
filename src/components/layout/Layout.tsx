import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import styles from  './layout.module.less';

const MainLayout = () => {
  return (
    <div className={styles.main} >
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.body}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

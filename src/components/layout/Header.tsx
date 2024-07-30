
import { Link } from 'react-router-dom';
import sytles from  './Header.module.less'; // 导入样式文件

const Header = () => {
  return (
    <header className={sytles.header}>
      <div className={sytles.container}>
        <h1 className={sytles.logo}>MyApp</h1>
        <nav>
          <ul className={sytles.navlist}>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/coder">Users</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

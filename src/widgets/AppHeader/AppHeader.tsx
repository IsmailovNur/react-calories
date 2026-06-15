import { Layout } from "antd";
import { Link, NavLink } from "react-router-dom";
import { AppRoutes } from "../../routing/routes.ts";

import "./AppHeader.css";

const {Header} = Layout;

const AppHeader = () => {


  return (
    <Header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Your Calories
        </Link>
        <nav className="header-nav">

          <NavLink
            to={AppRoutes.addPage}
            className="nav-item">
            AddPage
          </NavLink>
        </nav>
      </div>
    </Header>
  );
};

export default AppHeader;
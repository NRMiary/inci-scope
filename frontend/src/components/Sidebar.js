import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      {/* Sidebar - Brand */}
      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-tools"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Inci Scope</div>
      </Link>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Heading */}
      <div className="sidebar-heading">Menu</div>

      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <Link className="nav-link" to="/dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      {/* Nav Item - Liste incidents */}
      <li className="nav-item active">
        <Link className="nav-link" to="/incidents">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Liste incidents</span>
        </Link>
      </li>

      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
};

export default Sidebar;

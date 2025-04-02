import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { IncidentsContext } from '../context/IncidentsContext';
import { Link } from 'react-router-dom';

const Navbar = () => { 
  const { logout } = useContext(AuthContext);
  const { incidents } = useContext(IncidentsContext);

  // Dynamically calculate the number of open incidents
  const openCount = incidents.filter(i => !i.date_cloture).length;

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow sticky-top">
      {/* Sidebar Toggle (Topbar) */}
      <form className="form-inline">
        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
          <i className="fa fa-bars"></i>
        </button>
      </form>
      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>
        {/* Nav Item - Alerts */}
        <li className="nav-item dropdown no-arrow mx-1">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="alertsDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-bell fa-fw"></i>
            <span className="badge badge-danger badge-counter">
              {openCount > 0 ? (openCount > 3 ? '3+' : openCount) : ''}
            </span>
          </a>
          <div
            className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="alertsDropdown"
          >
            <h6 className="dropdown-header">Alertes</h6>
            <Link className="dropdown-item d-flex align-items-center" to="/incidents">
              <div className="mr-3">
                <div className="icon-circle bg-primary">
                  <i className="fas fa-exclamation-circle text-white"></i>
                </div>
              </div>
              <div>
                <div className="small text-gray-500">Incidents ouverts</div>
                <span className="font-weight-bold">Il y a {openCount} incidents ouverts/en cours</span>
              </div>
            </Link>
            <Link className="dropdown-item text-center small text-gray-500" to="/incidents">
              Afficher les alertes
            </Link>
          </div>
        </li>
        {/* User Information */}
        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Utilisateur</span>
            <img className="img-profile rounded-circle" src="/img/undraw_profile.svg" alt="Profile" />
          </a>
          <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            <a className="dropdown-item" href="#">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Profil
            </a>
            <div className="dropdown-divider"></div>
            <button onClick={logout} className="dropdown-item">
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Déconnexion
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

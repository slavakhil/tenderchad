import React, { useState } from 'react';
import {
  AUTH_ROUTE,
  MAIN_ROUTE,
  PROFILE_ROUTE,
  SEARCH_ROUTE,
} from '../../utils/const';
import { NavLink, useNavigate } from 'react-router-dom';
import './navbar.scss';
import { ReactSVG } from 'react-svg';
import burgerIcon from '../../assets/icons/burger.svg';
import closeSidebarIcon from '../../assets/icons/close-sidebar.svg';
import { useStore } from 'effector-react';
import { $user, logoutFx, setUser } from '../../store/auth-page';
import { ButtonPrimary } from '../UI/Button';
import { clearTenderList } from '../../store/search-store';
import { clearTenderInfo } from '../../store/tender-store';

export const NavBar: React.FC = () => {
  const user = useStore($user);
  const navigate = useNavigate();
  const [isSiderbarOpen, setIsSiderbarOpen] = useState<boolean>(false);
  return (
    <div className="navbar">
      <nav className="nav-container">
        <NavLink className="nav-link-header" to={MAIN_ROUTE}>
          TenderChad
        </NavLink>
        {user.isAuth && (
          <>
            <div className="nav-menu">
              <NavLink className="nav-link" to={MAIN_ROUTE}>
                Главная
              </NavLink>
              <NavLink className="nav-link" to={SEARCH_ROUTE}>
                Поиск и анализ тендеров
              </NavLink>
            </div>
            <nav className="nav-bnt">
              <ButtonPrimary
                title="Выйти"
                onHandleClick={() => {
                  clearTenderList();
                  clearTenderInfo();
                  logoutFx().then(() => {
                    setUser({ isAuth: false, username: '' });
                    navigate('/auth');
                  });
                }}
              />
            </nav>
            <div className="nav-menu-burger">
              {isSiderbarOpen ? (
                <ReactSVG
                  src={closeSidebarIcon}
                  onClick={() => {
                    setIsSiderbarOpen(false);
                    document.body.style.overflowY = 'auto';
                  }}
                />
              ) : (
                <ReactSVG
                  src={burgerIcon}
                  onClick={() => {
                    setIsSiderbarOpen(true);
                    document.body.style.overflowY = 'hidden';
                  }}
                />
              )}
            </div>
            <div
              onClick={() => {
                setIsSiderbarOpen(false);
                document.body.style.overflowY = 'auto';
              }}
              className={isSiderbarOpen ? 'sidebar active' : 'sidebar'}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={
                  isSiderbarOpen ? `sidebar-menu active` : 'sidebar-menu'
                }
              >
                <div className="sidebar-menu-elements">
                  <NavLink className="nav-link" to={MAIN_ROUTE}>
                    Главная
                  </NavLink>
                  <NavLink className="nav-link" to={SEARCH_ROUTE}>
                    Поиск и анализ тендеров
                  </NavLink>
                  <div
                    className="nav-link"
                    onClick={() => {
                      clearTenderList();
                      clearTenderInfo();
                      logoutFx().then(() => {
                        setUser({ isAuth: false, username: '' });
                        navigate('/auth');
                      });
                    }}
                  >
                    Выйти из аккаунта
                  </div>
                </div>
                <div className="sidebar-menu-footer">© 2023 TenderChad</div>
              </div>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

// export const SideBar: React.FC<{
//   setIsSiderbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   isSiderbarOpen: boolean;
// }> = ({ setIsSiderbarOpen, isSiderbarOpen }) => {
//   return <div></div>;
// };

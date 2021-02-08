import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.scss';
import { SidebarProps } from './sidebarTypes';

import Control from '../Control';

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  return(
    <div className="Sidebar">
      <div className="Sidebar__bg"></div>
      <div className="Sidebar__control"><Control /></div>
      {
        props.menus.map((menu, index) => {
          return(
            <div className="Sidebar__item" key={index}>
              <NavLink to={`/${menu}`}>{menu.toUpperCase()}</NavLink>
            </div>
          )
        })
      }
    </div>
  )
}

export default Sidebar;
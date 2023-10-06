import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import LinkButton from './LinkButton'; // Asegúrate de importar el componente LinkButton
import { useAuth } from '../../Authenticator/AuthPro';

interface MenuItem {
  text: string;
  path: string;
}

interface UserDropdownMenuProps {
  menuItems?: MenuItem[];
}

const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({ menuItems = [] }) => {
 
  const menu = (
    <Menu style={{ backgroundColor: '#1F2551', cursor: 'pointer' }}>
      {menuItems.map((item, index) => (
        <Menu.Item key={index}>
          <LinkButton text={item.text} path={item.path} />
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} >
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
      <Avatar icon={<UserOutlined />} size="large" style={{ backgroundColor: '#E47F36', cursor: 'pointer' }} />
      </a>
    </Dropdown>
  );
};

export default UserDropdownMenu;



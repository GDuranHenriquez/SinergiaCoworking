import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import LinkButton from './LinkButton'; // Asegúrate de importar el componente LinkButton
import CloseSeionButton from '../../features/Navigation/navBarNavigation/CloseSesionButton';
import { useAuth } from '../../Authenticator/AuthPro'; 

interface MenuItem {
  text: string;
  path: string;
}

interface UserDropdownMenuProps {
  menuItems?: MenuItem[];
  LogoutFunction: () => Promise<void>;
}

const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({ menuItems = [], LogoutFunction }) => {
  const auth = useAuth();

  const menu = (
    <Menu style={{ paddingTop: '20px' ,backgroundColor: '#1F2551', cursor: 'pointer' }}>
      {menuItems.map((item, index) => (
        <Menu.Item key={index}>
          {item.text === 'Cerrar sesión'? <CloseSeionButton LogoutFunction = {LogoutFunction} text={item.text} path={item.path}></CloseSeionButton>: <LinkButton text={item.text} path={item.path} />}          
        </Menu.Item>
      ))}
    </Menu>
  );

  const userAvatar = (
    <Avatar
      src={auth.getUser()?.imgUrl}
      size="large"
      style={{ cursor: 'pointer' }}
    />
  );

  return (
    <Dropdown overlay={menu} >
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
      { auth.getUser()?.imgUrl? userAvatar : <Avatar icon={<UserOutlined />} size="large" style={{ backgroundColor: '#E47F36', cursor: 'pointer' }} />}
      </a>
    </Dropdown>
  );
};

export default UserDropdownMenu;



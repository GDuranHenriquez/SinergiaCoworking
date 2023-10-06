import React from 'react';
import { Layout, Menu } from 'antd';
import {
  FileAddOutlined,
  BankOutlined,
  EnvironmentOutlined,
  AppstoreAddOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const MenuLateral = () => {
  return (
    <Sider width={200} theme="dark" collapsible>
      <Menu mode="vertical" theme="dark" >
        <Menu.Item key="1" icon={<FileAddOutlined />}>
          <Link to="/formOffice">Crear Oficina</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<BankOutlined />}>
          <Link to="/formBuilding">Crear Edificio</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<EnvironmentOutlined />}>
          <Link to="/formCity">Crear Ciudad</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<AppstoreAddOutlined />}>
          <Link to="/formServices">Crear Servicio</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<ProfileOutlined />}>
          <Link to="/formCategory">Crear Categoría</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default MenuLateral;

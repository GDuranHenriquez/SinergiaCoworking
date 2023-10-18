import React from "react";
import { Layout, Row, Col, } from "antd";
import { styled } from "styled-components";
import {
  MailOutlined,
  PhoneOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const FooterSection: React.FC = () => {
  return (
    <StyledFooter>
      <Row style={{margin: 0}} gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <FooterColumn>
            <h3>Ubicaciones</h3>
            <ul>
              <li>Buenos Aires</li>
              <li>Mendoza</li>
              <li>Rosario </li>
            </ul>
          </FooterColumn>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <FooterColumn>
            <h3>Contacto</h3>
            <ul>
              <li>
              <PhoneOutlined /> +142826759
              </li>
              <li>
              <MailOutlined /> s.cowork@sinergia.com
              </li>
            </ul>
          </FooterColumn>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <FooterColumn>
            <h3>Redes Sociales</h3>
            <SocialIcons>
              <a href="#">
                <FacebookOutlined />
              </a>
              <a href="#">
                <TwitterOutlined />
              </a>
              <a href="#">
                <InstagramOutlined />
              </a>
            </SocialIcons>
          </FooterColumn>
        </Col>
      </Row>
    </StyledFooter>
  );
};

const StyledFooter = styled(Footer)`
  background: #1f2551;
  color: white;
  padding: 0;
`;

const FooterColumn = styled.div`
  text-align: center;
  h3 {
    font-size: 18px;
    margin-bottom: 16px;
  }
  ul {
    list-style: none;
    padding: 0;
    li {
      margin-bottom: 8px;
      font-size: 14px;
    }
  }
`;

const SocialIcons = styled.div`
  font-size: 24px;
  a {
    color: white;
    margin: 16px;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
`;

export default FooterSection;

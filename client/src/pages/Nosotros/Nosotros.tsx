import { Card, Typography, Row, Col, Avatar } from "antd";
import NavBarNavigation from "../../features/Navigation/navBarNavigation/NavBarNavigation";
import styles from "./Nosotros.module.css";

const { Title, Paragraph } = Typography;

function Nosotros() {
  // Define information about the founders
  const founders = [
    {
      name: "Gregorio Duran",
      role: "Co-Founder",
      image: "https://avatars.githubusercontent.com/u/133280501?v=4",
    },
    {
      name: "Matías Pereyra",
      role: "Co-Founder",
      image: "https://avatars.githubusercontent.com/u/130018513?v=4",
    },

    {
      name: "Francisco Hernández",
      role: "Co-Founder",
      image:
        "https://avatars.githubusercontent.com/u/81003906?v=4",
    },

    {
      name: "Luis Fernández",
      role: "CEO",
      image:
        "https://media.licdn.com/dms/image/D4E03AQFIFN5fA1Oskw/profile-displayphoto-shrink_800_800/0/1688941080832?e=1701302400&v=beta&t=jpk2T5mK1vOevScB6kIyC9x7d3Q1PX5mBtbG3xILMQ4",
    },

    {
      name: "Manuel Agradi",
      role: "CTO",
      image:
        "https://avatars.githubusercontent.com/u/129109204?v=4",
    },

    {
      name: "Inés Cersósimo",
      role: "COO",
      image: "https://avatars.githubusercontent.com/u/129972743?v=4",
    },
    // Add more founders as needed
  ];

  return (
    <div>
      <NavBarNavigation></NavBarNavigation>
      <div className={styles.contenedor}>
      <div className={styles.containerNosotros} style={{ width: "90%"}}>
    {/* <Title style={{ marginBottom: "20px", fontSize:'50px', color: '#111533' }} level={1}>
          Sobre nosotros
        </Title>   */}
         </div>
        <Card className={styles.parrafos1}  style={{ width: "40%", marginTop: '100px' }}>
        <Title style={{marginTop:'5px', color: '#e9850b' }} level={4}>
          
          Nuestra Historia
        </Title>
          <Paragraph>
            En Sinergia Cowork, nuestra historia comenzó en 2021, cuando un
            grupo de emprendedores apasionados por la colaboración y la
            innovación decidió unir fuerzas para crear un espacio único en el
            mundo del trabajo. Desde entonces, hemos estado transformando la
            forma en que las personas trabajan y se conectan en Argentina. 
            Estamos comprometidos a proporcionar soluciones de vanguardia y
            oportunidades para el crecimiento profesional. Creamos una comunidad
            inclusiva y acogedora donde la diversidad de perspectivas se
            celebra. Valoramos la conexión genuina entre nuestros miembros y el
            apoyo mutuo.
          </Paragraph>
          </Card>
          <Card className={styles.parrafos2}  style={{ width: "40%" }}>
          <Title style={{marginTop:'5px', color: '#e9850b'}} level={4}>
          
            Misión y Servicios
          </Title>
          <Paragraph>
            En el corazón de nuestra empresa está la creencia en que el ambiente
            de trabajo tiene un impacto profundo en la creatividad y el éxito
            empresarial. Ofrecemos un entorno inspirador y moderno para que
            profesionales de todos los sectores se reúnan, colaboren y
            prosperen. Nuestro co-work proporciona acceso a espacios de trabajo
            flexibles y equipados con tecnología de vanguardia, salas de
            reuniones inspiradoras y una comunidad diversa de pensadores
            innovadores.
          </Paragraph>
          </Card>

          <Card className={styles.parrafos3}  style={{ width: "40%" }}>
            <Title style={{ marginTop:'5px', color: '#e9850b' }} level={4}>
        
            Cultura Empresarial
          </Title>
          <Paragraph>
      
            En Sinergia, la cultura empresarial es más que una moda; es la base
            de nuestro éxito. Nuestro equipo está dedicado a proporcionar un
            servicio excepcional a nuestros miembros y crear un ambiente donde
            la creatividad florece. Valoramos la pasión, el compromiso y el
            deseo constante de aprender y mejorar. En resumen, en Sinergia, no
            solo ofrecemos un espacio de trabajo; ofrecemos un hogar para tus
            ambiciones y un lugar donde las ideas se convierten en realidad.
            Únete a nuestra comunidad y sé parte de una experiencia de
            co-working que va más allá de las cuatro paredes.
          </Paragraph>
        </Card>
     
  
      <div style={{ padding: "20px" }}>
        <Row gutter={16}>
          <Col span={16}>
            <Card
              className={styles.containerQuienes}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.945', width: '100%'  }}
            >

              <Title style={{ marginBottom: "40px", marginTop: '1px', color: '#1F2551'}} level={2}>
                Quienes somos
              </Title>
              <Row gutter={16}>
                {founders.map((founder, index) => (
                  <Col key={index} span={8}>
                    <Avatar
                      size={80}
                      src={founder.image}
                      className={styles.avatars}
                    />
                    <Title level={4}>{founder.name}</Title>
                    <Paragraph style={{ marginBottom: "60px" }}>
                      {founder.role}
                    </Paragraph>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>
      </div>

    </div>
    </div>
  );
}

export default Nosotros;

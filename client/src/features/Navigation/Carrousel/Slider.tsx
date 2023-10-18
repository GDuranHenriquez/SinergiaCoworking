import style from "./Slider.module.css";
import { Carousel } from "antd";
import styled from "styled-components";

interface SliderCarouselProps {
  imageOne: string;
  imageTwo: string;
  imageThree: string;
}

const SliderCarousel: React.FC<SliderCarouselProps> = ({
  imageOne,
  imageTwo,
  imageThree,
}) => {
  return (
    <div className={style.container}>
      <Carousel
        autoplaySpeed={6000}
        autoplay={true}
        dotPosition="bottom"
        style={{ width: "100%", height: "100%", fontSize: "13px", display:'flex', alignContent:'center', justifySelf:'center' }}
      >
        <div className={style.itemSlider}>
          {item(
            imageOne,
            <>
              <h3> SINERGIA COWORK </h3>
              <p style={{ fontWeight: "400" }}>
               Sinergia es un lugar donde la colaboración y la creatividad se unen para impulsar el éxito conjunto.
              {/* La
                diversidad de talentos en un espacio unido enriquece las
                oportunidades de colaboración. */}
              </p>
            </>,
            "Imagen1"
          )}
        </div>
        <div className={style.itemSlider}>
          {item(
            imageTwo,
            <>
            <h3>TRABAJO EN EQUIPO </h3>
              <p style={{ fontWeight: "400" }}> 
              Somos un espacio de trabajo donde las ideas fluyen libremente y las conexiones se forman
              naturalmente. 
              
              
              {/* La colaboración en equipo multiplica la creatividad y la
              innovación.<br></br><br></br>
               El coworking transforma el trabajo individual en una
              experiencia colaborativa que impulsa el crecimiento profesional y
              empresarial. */}
              </p>
            </>,
            "Imagen2"
          )}
        </div>
        <div className={style.itemSlider}>
          {item(
            imageThree,
            <>
            <h3>CRECIENDO EN GRANDE</h3>
              <p style={{ fontWeight: "400" }}>
              El coworking promueve la sinergia entre profesionales
              independientes, creando un ambiente de apoyo mutuo. 
          
              </p>
            </>,
            "Imagen3"
          )}
        </div>
      </Carousel>
    </div>
  );
};

const item = (image: string, text: JSX.Element, imageName: string) => {
  return (
    <StyleItem>
      <div className="text">
        <h1>{text}</h1>
      </div>
      <div className="img">
        <img src={image} alt={imageName} />
      </div>
    </StyleItem>
  );
};

const StyleItem = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  .img {
    width: 50%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .text {
    width: 50%;
  }
`;

export default SliderCarousel;

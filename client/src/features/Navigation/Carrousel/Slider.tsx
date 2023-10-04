import style from "./Slider.module.css"
import { Carousel } from 'antd';
import styled from "styled-components";


interface SliderCarouselProps {
    imageOne: string
    imageTwo: string
    imageThree: string
}


const SliderCarousel: React.FC<SliderCarouselProps> = ({
    imageOne,
    imageTwo,
    imageThree,
}) => {

    return (
        <div className={style.container}>
            <Carousel autoplaySpeed={6000} autoplay={true} dotPosition="bottom"
                style={{ width: '100%', height: '100%', fontSize: '13px'}}>
                    
                    <div className={style.itemSlider}>
                    {item(imageOne, (
                        <>
                            TRABAJANDO EN EQUIPO <br />
                            <br />
                            El coworking es el espacio donde la colaboración y la creatividad se unen para impulsar el éxito conjunto. La diversidad de talentos en un espacio unido enriquece las oportunidades de colaboración.
                        </>
                    ), "Imagen1")}
                </div>
                <div className={style.itemSlider}>
                    {item(imageTwo, (
                        <>
                            CRECIENDO EN GRANDE <br />  <br />
                            La colaboración en equipo multiplica la creatividad y la innovación. El coworking transforma el trabajo individual en una experiencia colaborativa que impulsa el crecimiento profesional y empresarial.
                        </>
                    ), "Imagen2")}
                </div>
                <div className={style.itemSlider}>
                    {item(imageThree, (
                        <>
                            CONOCENOS <br />  <br />
                            El coworking promueve la sinergia entre profesionales independientes, creando un ambiente de apoyo mutuo. Es el lugar donde las ideas fluyen libremente y las conexiones se forman naturalmente.
                        </>
                    ), "Imagen3")}
                </div>
            </Carousel>
        </div>
    );
};



const item = (image: string, text: JSX.Element, imageName: string) => {
    return <StyleItem>
        <div className="text">
            <h1>{text}</h1>
        </div>
        <div className="img">
            <img src={image} alt={imageName} />
        </div>        
    </StyleItem>
}

const StyleItem = styled.div`
    display: flex;
    flex-wrap: nowrap; 
    width: 100%;
    .img{
        width: 50%; 
        height: 100%;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

    }
    .text{
        width: 50%;
    }
`

export default SliderCarousel;


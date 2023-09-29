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
                style={{ width: '100%', height: '100%' }}>
                    
                <div className={style.itemSlider}>
                    {item(imageOne, "TRABAJANDO EN EQUIPO", "Imagen1")}
                </div>
                <div className={style.itemSlider}>
                    {item(imageTwo, "CRECIENDO EN GRANDE", "Imagen1")}
                </div>
                <div className={style.itemSlider}>
                    {item(imageThree, "CONOCENOS", "Imagen1")}

                </div>
            </Carousel>
        </div>
    );
};



const item = (image: string, text: string, imageName: string) => {
    return <StyleItem>
        <img src={image} alt={imageName} />
        <h1>{text}</h1>
    </StyleItem>
}

const StyleItem = styled.div`
display: flex;
flex-wrap: nowrap; 
width: 100%;
.img{width: 50%; height: 500px}
`

export default SliderCarousel;


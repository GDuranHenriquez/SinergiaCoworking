import React from 'react';
import { Avatar, Card, Carousel, Rate } from 'antd';
import Meta from 'antd/es/card/Meta';


const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App: React.FC = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <Carousel afterChange={onChange}>
      <div>
      <Card size="small" style={{ width: 300 }}>
                      <Meta
                        avatar={<Avatar src={"https://cowork.uy/wp-content/uploads/2023/01/copper-arocena-gallery-02.jpg"} />}
                        title={"titulo"}
                        description={
                          <div>
                            {" "}
                            <Rate disabled defaultValue={5} />
                            <br></br>
                            <div >
                              {"muy linda"}
                            </div>
                          </div>
                        }
                      />
                    </Card>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
};

export default App;
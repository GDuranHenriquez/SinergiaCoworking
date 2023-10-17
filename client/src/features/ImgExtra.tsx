import styles from "./ImgExtra.module.css";

const ImgExtra = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imagen}>
        <img
          style={{ height: "85%", width: "130%", alignSelf:'center'}}
          src={
            "https://mediaassets.cbre.com/cdn/-/media/project/cbre/shared-site/about/about-us-2048x1366.jpg?iar=0&rev=8c336c4432364a5fa015b0e9ccdd904b&key=landingpagehero&device=desktop"
          }
        ></img>
      </div>
      <div className={styles.texto}>
        <h1>
          Contratá el espacio perfecto para tu equipo y disfrutá de nuestras instalaciones</h1>
        <h3>La solución ideal para empresas de todos los tamaños está en Sinergia Cowork.</h3>
          
          <p>● Ahorrá en gastos operativos.</p>
          <p>● Personalizá tu espacio privado de trabajo.</p>
          <p>● Enfocate en tu trabajo y tu equipo, del resto se encarga Sinergia.</p>
        
      </div>
    </div>
  );
};

export default ImgExtra;

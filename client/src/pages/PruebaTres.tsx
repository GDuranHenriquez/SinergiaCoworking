const PruebaTres = () => {

    interface Producto {
        id: number;
        nombre: string;
        valoraciones: number[];
      }
      
      // función para calcular el promedio de valoraciones de un producto
      const calcularPromedioValoracionesOficina = (producto: Producto): number => {
        if (producto.valoraciones.length === 0) {
          return 0; 
        }
        
        const totalValoraciones = producto.valoraciones.reduce((total, valoracion) => total + valoracion, 0);
        const promedio = totalValoraciones / producto.valoraciones.length;
        return promedio;
      };
      
      // ejemplo
      const productoEjemplo: Producto = {
        id: 1,
        nombre: "oficina",
        valoraciones: [5, 4, 3, 5, 2] 
      };
      
      const promedioValoracionesProducto = calcularPromedioValoracionesOficina(productoEjemplo);
      console.log(`El promedio de las valoraciones para ${productoEjemplo.nombre} es: ${promedioValoracionesProducto}`);

    return (
      <div>
            <p>{productoEjemplo.nombre}</p>
            <p>{productoEjemplo.valoraciones}</p>
            <p>{promedioValoracionesProducto}</p>
      </div>
    )
  }
  
  export default PruebaTres
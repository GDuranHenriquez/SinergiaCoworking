import { getReviews, postReviews } from "../redux/slices/reviews/actionReviews";
import { useCustomDispatch } from "../hooks/redux";
import React,{useEffect} from "react";
import { useState } from "react";
import AOS from 'aos';

const PruebaTres = () => {
  const [form, setForm] = useState({
    stars: 0,
    comment: '',
    user:'',
    office:'',
  });


  const dispatch = useCustomDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    postReviews(dispatch, form); 
  };

  useEffect(() => {
    AOS.init({ delay: 250, duration: 1000 });
    getReviews(dispatch);
  }, []);

    interface Producto {
        id: number;
        nombre: string;
        valoraciones: number[];
      }
      
      
      const calcularPromedioValoracionesOficina = (producto: Producto): number => {
        if (producto.valoraciones.length === 0) {
          return 0; 
        }
        
        const totalValoraciones = producto.valoraciones.reduce((total, valoracion) => total + valoracion, 0);
        const promedio = totalValoraciones / producto.valoraciones.length;
        return promedio;
      };
      
      
      const productoEjemplo: Producto = {
        id: 1,
        nombre: "oficina",
        valoraciones: [5, 4, 3, 5, 2] 
      };
      
      const promedioValoracionesProducto = calcularPromedioValoracionesOficina(productoEjemplo);
      console.log(`El promedio de las valoraciones para ${productoEjemplo.nombre} es: ${promedioValoracionesProducto}`);

      return (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Stars:
              <input
                type="number"
                value={form.stars}
                onChange={(e) => setForm({ ...form, stars: e.target.value })}
              />
            </label>
            <label>
              Comment:
              <textarea
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
              />
            </label>
            <label>
              User:
              <input
                type="text"
                value={form.user}
                onChange={(e) => setForm({ ...form, user: e.target.value })}
              />
            </label>
            <label>
              Office:
              <input
                type="text"
                value={form.office}
                onChange={(e) => setForm({ ...form, office: e.target.value })}
              />
            </label>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      );
    };
  
  export default PruebaTres
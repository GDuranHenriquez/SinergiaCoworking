import { postReviews } from "../redux/slices/reviews/actionReviews";
import { useCustomDispatch } from "../hooks/redux";
import React, { useState } from "react";

const PruebaTres = () => {
  const [form, setForm] = useState({
    stars: 0,
    comment: '',
    user:'',
    office:'',
  });


  const dispatch = useCustomDispatch();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    postReviews(dispatch, form); 
  };

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
              Stars:
              <div>
          <select
          name="stars"
          onChange={handleSubmit}
          required
          >
            <option value="">select</option>
            <option value={1}>⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
            </select>
          <br />
        </div>
            
            <br />
            <label>
              Comment:
              <textarea
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
              />
            </label>
            <br />
            <label>
              User:
              <input
                type="text"
                value={form.user}
                onChange={(e) => setForm({ ...form, user: e.target.value })}
              />
            </label>
            <br />
            <label>
              Office:
              <input
                type="text"
                value={form.office}
                onChange={(e) => setForm({ ...form, office: e.target.value })}
              />
            </label>
            <br />
            <button type="submit">Submit Review</button>
          </form>
        </div>
      );
    };
  
  export default PruebaTres
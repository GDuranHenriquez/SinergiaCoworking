import { postReviews } from "../../redux/slices/reviews/actionReviews";
import { getDetailOffice } from "../../redux/slices/offices/actionOffice";
import { useCustomDispatch } from "../../hooks/redux";
import React,{useEffect} from "react";
import { useState } from "react";
import AOS from 'aos';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Authenticator/AuthPro";

const PruebaTres = () => {
  const { id } = useParams();
  
const auth = useAuth()

type FORM = {
  stars: number;
  comment: string;
  user: string | undefined;
  office: string
}


  const dispatch = useCustomDispatch();
  
  const [form, setForm] = useState<FORM>({
    stars: 0,
    comment: '',
    user: auth.getUser().id,
    office:'',
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    postReviews(dispatch, form); 
  };

    
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
import { postReviews } from "../../redux/slices/reviews/actionReviews";
import { getDetailOffice } from "../../redux/slices/offices/actionOffice";
import { useCustomDispatch } from "../../hooks/redux";
import {useEffect} from "react";
import AOS from 'aos';
import { useAuth } from "../../Authenticator/AuthPro";
import React, { useState } from 'react';
import { Rate } from 'antd';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const Review = () => {

  const [value, setValue] = useState(0);
  
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

  const resetForm = () => {
    setForm({
      stars: 0,
      comment: '',
      user: auth.getUser().id,
      office: '',
    });
  };

  const handleStarsChange = (value: number) => {
    setForm({ ...form, stars: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    postReviews(dispatch, form); 
  };


    return (
      <div>
        <form onSubmit={handleSubmit}>
        <span>
      <Rate tooltips={desc} onChange={handleStarsChange} value={form.stars} />
      {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
    </span>
          <label>
            Comment:
            <textarea
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
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
          <button type="submit" disabled={!form.stars || !form.comment || !form.user || !form.office}>Submit Review</button>
          <button type="button" onClick={resetForm}>Reset</button>
        </form>
      </div>
    );
  };
  
  export default Review
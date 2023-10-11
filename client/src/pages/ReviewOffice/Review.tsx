import React, { useState } from 'react';
import { Rate } from 'antd';
import style from './Review.module.css';
import { postReviews } from '../../redux/slices/reviews/actionReviews';
import { useCustomDispatch } from '../../hooks/redux';
import { useAuth } from '../../Authenticator/AuthPro';
import Validation from './Validation';
import { useEffect } from 'react';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

type FORM = {
  stars: number;
  comment: string;
  user: string | undefined;
  office: string;
};

const Review = () => {

  const auth = useAuth()


  const [form, setForm] = useState<FORM>({
    stars: 0,
    comment: '',
    user: auth.getUser()?.id,
    office: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useCustomDispatch();

  useEffect(() => {
    const validationErrors = Validation(form);
    setErrors(validationErrors);
  }, [form]); 

  const handleStarsChange = (value: number) => {
    setForm({ ...form, stars: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = Validation(form);
    if (Object.keys(validationErrors).length === 0) {
      postReviews(dispatch, form);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const resetForm = () => {
    setForm({
      stars: 0,
      comment: '',
      user: auth.getUser()?.id,
      office: '',
    });
    setErrors({});
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <span>
          <Rate tooltips={desc} onChange={handleStarsChange} value={form.stars} />
        </span>
        {form.stars ? <span className="ant-rate-text">{desc[form.stars - 1]}</span> : ''}
        <label>
          Comment:
          <textarea
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
          />
          {errors.comment && <div className={style.error}>{errors.comment}</div>}
        </label>
        <label>
          Office:
          <input
            type="text"
            value={form.office}
            onChange={(e) => setForm({ ...form, office: e.target.value })}
          />
          {errors.office && <div className={style.error}>{errors.office}</div>}
        </label>
        <button type="submit" disabled={!form.stars || !form.comment || !form.user || !form.office}>
          Submit Review
        </button>
        <button type="button" onClick={resetForm}>
          Reset
        </button>
        {errors.boton && <div className={style.error}>{errors.boton}</div>}
      </form>
    </div>
  );
};

export default Review;


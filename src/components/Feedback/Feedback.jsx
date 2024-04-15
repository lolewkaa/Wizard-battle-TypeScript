import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './Feedback.module.css';
import inactiveStar from '../../images/heart_3hgfdgqrwsv4.svg';
import activeStart from '../../images/heart_3hgfdgqrwsv4 (1).svg';

const classNames = require("classnames");

export default function Feedback() {
  const [agreeCheckboxChecked, setAgreeCheckboxChecked] = useState(false);
  const [connectionCheckboxChecked, setConnectionCheckboxChecked] = useState(false);

  // звездный рейтинг
  const [currentItem, setCurrentItem] = useState();
  const [, setHoverItem] = useState();
  const stars = Array(5).fill(0);
  const lowRating = currentItem < 3;

  /** Создаем схему валидации */
  const validationsSchema = yup.object().shape({
    name: yup.string().typeError('Строка должна содержать только буквы').required('Это обязательное поле'),
    email: yup.string().email('Введите корректный E-mail').required('Это обязательное поле'),
    comment: yup.string(),
  });
  return (
    <section className={styles.feedBack}>
      <div className={styles.feedBack__box}>
        <Formik
        initialValues={{
          name: '',
          email: '',
          comment: '',
        }}
        validateOnBlur
        onSubmit={(values) => {
          values.email = '';
          values.name = '';
          values.comment = '';
          localStorage.removeItem("secondOpponentId");
          localStorage.removeItem("firstOpponentId");
          localStorage.removeItem("isBattleStarted");
        }}
        validationSchema={validationsSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isValid,
            handleSubmit,
            dirty,
          }) => (
            <div className={styles.feedBack__container}>
              <label className={styles.feedBack__text} htmlFor={'name'}>Name</label>
              <input
                type={'text'}
                name={'name'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={styles.feedBack__input}
              />
              {touched.name && errors.name && <p className={styles.feedBack__err}>{errors.name}</p>}
              <label className={styles.feedBack__text} htmlFor={'email'}>E-mail</label>
              <input
                className={styles.feedBack__input}
                type={'email'}
                name={'email'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {
                touched.email
                && errors.email
                && <p className={styles.feedBack__err}>{errors.email}</p>
              }
              {
                <div className={styles.feedBack__stars}>
                  <div className={styles.feedBack__starsBox}>
                {
                  stars.map((item, index) => (
                      <img onClick={() => setCurrentItem(index)}
                        key={index}
                        src={ index <= currentItem ? activeStart : inactiveStar}
                        className={styles.feedBack__star}
                        onMouseMove={() => setHoverItem(index)}
                        onMouseOut={() => setHoverItem()}
                       />
                  ))
                }
                </div>
                <label className={styles.feedBack__text} htmlFor={'comment'}>Comment</label>
              <input
                className={styles.feedBack__comment}
                type={'comment'}
                name={'comment'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.comment}
              />
          <div className={styles.feedBack__checkBoxContainer}>
            <input className={styles.feedBack__checkBoxInput} type="checkbox" checked={agreeCheckboxChecked} onChange={() => setAgreeCheckboxChecked(!agreeCheckboxChecked)}/>
            <h2 className={styles.feedBack__text}>
            Consent to personal data processing
            </h2>
          </div>
          {lowRating && <>
          <h2 className={styles.feedBack__subtitle}>We are sorry that you did not like the game.
            We would like to be better. If you have a problem while playing or have any ideas,
            how to make it better, describe everything in the comments.
            If you would like us to contact you, please check the “Contact me” box.</h2>
            <div className={styles.feedBack__checkBoxContainer}>
              <input className={styles.feedBack__checkBoxInput} type="checkbox" checked={connectionCheckboxChecked} onChange={() => setConnectionCheckboxChecked(!connectionCheckboxChecked)} />
              <h2 className={styles.feedBack__text}>
              Contact me
              </h2>
            </div></>
             }
                </div>
              }
              <button
              className={classNames(styles.feedBack__button, {
                [styles.disable]: !isValid,
              })}
              disabled={!isValid && !dirty}
              onClick={handleSubmit}
              type={'submit'}
              >
                Send
              </button>
            </div>
          )}
        </Formik>
        </div>
    </section>
  );
}

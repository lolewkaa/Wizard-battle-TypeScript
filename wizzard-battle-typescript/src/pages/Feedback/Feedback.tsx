import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Formik } from "formik";
import * as yup from "yup";
import styles from "./Feedback.module.css";
import StarRate from "../../components/ui/StarRate/StarRate.tsx";
import Input from "../../components/ui/Input/Input.tsx";
import Checkbox from "../../components/ui/Checkbox/Checkbox.tsx";
import Button from "../../components/ui/Button/Button.tsx";

const Feedback: React.FC = () => {
  const [agreeCheckboxChecked, setAgreeCheckboxChecked] = useState<boolean>(false);
  const [connectionCheckboxChecked, setConnectionCheckboxChecked] = useState<boolean>(false);
  const [isLowRating, setIsLowRating] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<null | number>(null);
  const [, setHoverItem] = useState<number>(0);
  const stars: Array<number> = Array(5).fill(0);

  useEffect(() => {
    if (currentItem !== null && currentItem < 3) {
      setIsLowRating(true);
    } else {
      setIsLowRating(false);
    }
  }, [currentItem]);

  /** Создаем схему валидации */
  const validationsSchema = yup.object().shape({
    name: yup
      .string()
      .typeError("Строка должна содержать только буквы")
      .required("Это обязательное поле"),
    email: yup
      .string()
      .email("Введите корректный E-mail")
      .required("Это обязательное поле"),
    comment: yup.string(),
  });

  return (
    <section className={styles.feedBack}>
      <div className={styles.feedBack__box}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            comment: "",
          }}
          validateOnBlur
          onSubmit={(values) => {
            values.email = "";
            values.name = "";
            values.comment = "";
            setCurrentItem(null);
            localStorage.removeItem("secondOpponentId");
            localStorage.removeItem("firstOpponentId");
            localStorage.removeItem("firstOpponent");
            localStorage.removeItem("secondOpponent");
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
              <Input
                type={"text"}
                name={"name"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {touched.name && errors.name && (
                <p className={styles.feedBack__err}>{errors.name}</p>
              )}
              <Input
                type={"email"}
                name={"email"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {touched.email && errors.email && (
                <p className={styles.feedBack__err}>{errors.email}</p>
              )}
              {
                <div className={styles.feedBack__stars}>
                  <StarRate
                    currentItem={currentItem}
                    setHoverItem={setHoverItem}
                    stars={stars}
                    setCurrentItem={setCurrentItem}
                  />
                  <Input
                    type={"comment"}
                    name={"comment"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.comment}
                  />
                  <Checkbox
                    text={"Consent to personal data processing"}
                    type={"checkbox"}
                    checked={agreeCheckboxChecked}
                    onChange={() => setAgreeCheckboxChecked(!agreeCheckboxChecked)
                    }
                  />
                  {isLowRating && (
                    <>
                      <h2 className={styles.feedBack__subtitle}>
                        We are sorry that you did not like the game. We would
                        like to be better. If you have a problem while playing
                        or have any ideas, how to make it better, describe
                        everything in the comments. If you would like us to
                        contact you, please check the “Contact me” box.
                      </h2>
                      <Checkbox
                        text={"Contact me"}
                        type={"checkbox"}
                        checked={connectionCheckboxChecked}
                        onChange={() => setConnectionCheckboxChecked(
                          !connectionCheckboxChecked,
                        )
                        }
                      />
                    </>
                  )}
                </div>
              }
              <Button
                buttonStyle={classNames(styles.feedBack__button, {
                  [styles.disable]: !isValid,
                })}
                disabled={!isValid && !dirty}
                clickButton={() => handleSubmit()}
                type={"submit"}
                text="Send"
              />
            </div>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Feedback;

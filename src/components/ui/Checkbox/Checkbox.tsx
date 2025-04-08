import React, { ChangeEvent } from "react";
import styles from "./Checkbox.module.css";

type PropsCheckbox = {
  text: string;
  type: string;
  checked: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox: React.FC<PropsCheckbox> = ({
  text, type, checked, onChange,
}) => (
  <div className={styles.checkBoxContainer}>
    <input
      className={styles.checkBoxInput}
      type={type}
      checked={checked}
      onChange={onChange}
    />
    <h2 className={styles.text}>{text}</h2>
  </div>
);

export default Checkbox;

import React, { ChangeEvent } from 'react';
import styles from './Input.module.css';

type Props = {
    type: string,
    name: string,
    // eslint-disable-next-line no-unused-vars
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    // eslint-disable-next-line no-unused-vars
    onBlur: (event: ChangeEvent<HTMLInputElement>) => void,
    value: string,
}

const Input: React.FC<Props> = ({
  type, name, onChange, onBlur, value,
}) => (
    <>
    <label className={styles.text} htmlFor={name}>{name}</label>
    <input
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={styles.input}
    />
    </>
);

export default Input;

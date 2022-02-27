import React from "react";
import styles from "./Select.module.css";
const Select = ({ name, text, options, handleOnChange, value }) => {
  return (
    <div className={styles.form__control}>
      <label htmlFor={name}>{text}:</label>
      <select
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value || ""}
      >
        <option>Select the option</option>
        {options.map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

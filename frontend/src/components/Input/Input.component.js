import React from "react";
import { array, func, string, oneOfType } from "prop-types";
import { Field } from "redux-form";

import RenderInput from "../renderers/RenderInput/RenderInput.renderer";
import RenderTextarea from "../renderers/RenderTextarea/RenderTextarea.renderer";
import RenderSelect from "../renderers/RenderSelect/RenderSelect.renderer";
import RenderDateTimePicker from "../renderers/RenderDateTimePicker/RenderDateTimePicker.renderer";
import RenderTypeahead from "../renderers/RenderTypeahead/RenderTypeahead.renderer";

import styles from "./Inputs.module.scss";

const components = {
  input: RenderInput,
  textarea: RenderTextarea,
  select: RenderSelect,
  datepicker: RenderDateTimePicker,
  typeahead: RenderTypeahead
};

const Input = props => {
  const {
    name,
    type = "text",
    component = "input",
    label = "",
    placeholder = "",
    validate = null,
    classes = "",
    ...rest
  } = props;
  return (
    <div className={[styles.field, classes].join(" ")}>
      <div className={styles.label}>
        {label ? (
          <label className={styles["label-bold"]} htmlFor={"input_" + name}>
            {label}
          </label>
        ) : null}
        <Field
          {...rest}
          id={"input_" + name}
          className={"input"}
          name={name}
          type={type}
          validate={validate}
          label={placeholder}
          component={components[component] || RenderInput}
        />
      </div>
    </div>
  );
};

Input.propTypes = {
  classes: string,
  component: string.isRequired,
  label: string,
  name: string.isRequired,
  options: array,
  placeholder: string,
  type: string,
  validate: oneOfType([func, array])
};

export default Input;

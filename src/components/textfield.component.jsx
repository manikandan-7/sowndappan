import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const Textfield = ({ name, placeholder, value, label, onChange, err, info, type, disabled }) => {
  return (
    <div>
      <div className="form-group">
        <label>{label}</label>
        <input
          type={type}
          className={classnames("form-control input form-control-lg", { "is-invalid": err })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {info && <small className="form-text text-muted">{info}</small>}
        {err && <div className="invalid-feedback">{err}</div>}
      </div>
    </div>
  );
};

Textfield.protoTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  err: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};
Textfield.defaultProps = {
  type: "text"
};
export default Textfield;

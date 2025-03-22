import { ChangeEventHandler } from 'react';

interface InputProps {
  type: string;
  name: string;
  labelText?: string;
  defaultValue?: string | number;
  onChange?: ChangeEventHandler;
}

const FormRow: React.FC<InputProps> = ({
  type,
  name,
  labelText,
  defaultValue,
  onChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor="name" className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue || ''}
        required
        onChange={onChange}
      />
    </div>
  );
};

export default FormRow;

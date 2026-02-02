import React from 'react';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import {
  DEFAULT_BORDER_COLOR,
  TextInput,
} from '../../scenes/Public/login/styles';
import Status from '../../utils/enums/TextInputStatus.enum';

interface LoginFormInputProps {
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: Partial<React.ChangeEvent<any>>) => void;
  status: 'success' | 'failure' | 'default';
  touched?: boolean;
  error?: string;
  errorMessage?: string;
  autoComplete?: string;
}

const LoginFormInput: React.FC<LoginFormInputProps> = ({
  placeholder,
  type,
  name,
  value,
  onChange,
  status,
  autoComplete,
}) => {
  const getBorderColor = () => {
    if (status === Status.Success) return '#4BB543';
    if (status === Status.Failure) return '#D32F2F';
    return undefined;
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <TextInput
        placeholder={placeholder}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        borderColor={getBorderColor() || DEFAULT_BORDER_COLOR}
      />
      {status === Status.Success && type !== 'password' && (
        <CheckCircleRoundedIcon
          style={{
            color: '#4BB543',
            fontSize: 20,
            position: 'absolute',
            right: 10,
            top: '53%',
            transform: 'translateY(-50%)',
          }}
        />
      )}
    </div>
  );
};

export default LoginFormInput;

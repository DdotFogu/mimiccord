type InputFieldProps = {
  className?: string;
  handleChange: (e: React.ChangeEvent) => void;
  value: any;
  type?: string;
  placeholder?: string;
  accept?: string;
};

export const InputField = ({
  className,
  type,
  handleChange,
  value,
  placeholder,
  accept,
}: InputFieldProps) => {
  return (
    <input
      className={
        className
          ? className
          : `bg-darkermist w-full px-3 py-2 rounded-md focus:outline-1 focus:ring-0`
      }
      type={type ? type : ""}
      accept={accept ? accept : ""}
      placeholder={placeholder ? placeholder : ""}
      onChange={(e) => handleChange(e)}
      value={value}
    />
  );
};

export default InputField;

import { useStyles } from "@/hooks/useStyles";
import { FC } from "react";

interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

const Input: FC<InputProps> = ({ id, onChange, value, label, type }) => {
  const styles = useStyles();

  return (
    <div className="relative">
      <input
        value={value}
        type={type}
        onChange={onChange}
        id={id}
        style={styles.backgroundInput}
        className="block rounded-md px-6 pt-6 w-full text-md 
      appearance-none 
      focus:outline-none focus:ring-0 peer leading-[1.5rem] "
        placeholder=" "
      ></input>
      <label
        htmlFor={id}
        style={styles.textTertiary}
        className=" 
        absolute text-md text-zinc-400 duration-150 transform 
        -translate-y-3 scale-75  top-3 z-10 origin-[0] left-6 
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:-translate-x-1"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;

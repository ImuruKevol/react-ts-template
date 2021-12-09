import { FC } from "react";

type checkbox = {
  id: string,
  checked: boolean,
  label?: string,
  size?: number,
  onCheck?: Function,
  onCheckAll?: Function,
}

const Checkbox: FC<checkbox> = (props: checkbox) => {
  const {
    id,
    checked,
    label,
    size,
    onCheck,
    onCheckAll,
  } = props;

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        style={size? {width: `${size}px`, height: `${size}px`}:undefined}
        onChange={e => {
          if(onCheckAll) {
            onCheckAll();
            return;
          }
          if(!onCheck) return;
          const value = e.target.checked;
          onCheck(value);
        }}  
      />
      {label &&
        <label htmlFor={id}>{label}</label>
      }
    </div>
  );
}

export default Checkbox;

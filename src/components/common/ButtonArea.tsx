import { FC, MouseEventHandler } from 'react';

type buttonArea = {
  add?: boolean,
  edit?: boolean,
  del?: boolean,
  cancel?: boolean,
  onAdd?: MouseEventHandler,
  onEdit?: MouseEventHandler,
  onDelete?: MouseEventHandler,
  onCancel?: MouseEventHandler,
  className?: String | String[],
  inline?: boolean,
}

const ButtonArea: FC<buttonArea> = (props) => {
  const {
    add,
    edit,
    del,
    cancel,
    onAdd,
    onEdit,
    onDelete,
    onCancel,
    className,
    inline,
  } = props;

  const cn = typeof className === "string"? className :
              Array.isArray(className)? className.join(" ") : "";
  
  const inlineBlock = {
    display: "inline-block",
    width: "auto",
    verticalAlign: "middle",
  }

  return (
    <div className={"table-row-action " + cn} style={inline?inlineBlock:undefined}>
      {add && 
        <button className="add" onClick={onAdd}>Add</button>
      }
      {edit && 
        <button className="edit" onClick={onEdit}>Edit</button>
      }
      {cancel &&
        <button className="cancel" onClick={onCancel}>Cancel</button>
      }
      {del && 

        <button className="delete" onClick={onDelete}>Delete</button>
      }
    </div>
  );
}

export default ButtonArea;

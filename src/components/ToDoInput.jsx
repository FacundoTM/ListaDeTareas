import { useField } from "formik";
import { Input } from "antd";

const ToDoInput = ({ ...props }) => {
  const [field] = useField(props);

  return (
    <>
      <Input {...field} {...props} />
    </>
  );
};

export default ToDoInput;

import { FieldProps } from "formik";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import debounce from "lodash.debounce";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const FormikMDEditor: React.ComponentType<FieldProps> = ({ field, form }) => {
  const onChangeEditor = useMemo(
    () =>
      debounce((value: string) => {
        form.setFieldValue(field.name, value);
        // console.log(value);
      }, 500),
    [field.name, form]
  );

  return (
    <MdEditor
      style={{ height: "500px" }}
      view={{ html: false, md: true, menu: true }}
      renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
      onChange={({ text }) => onChangeEditor(text)}
      // on
    />
  );
};

export default FormikMDEditor;

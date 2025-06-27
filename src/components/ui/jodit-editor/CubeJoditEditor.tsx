import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

type Props = {
  value: string;
  onChange: (content: string) => void;
  height?: number | string;
  readonly?: boolean;
  placeholder?: string;
  label?: string;
  required?: boolean;
};

export const CubeJoditEditor: React.FC<Props> = ({
  value,
  onChange,
  height = 50,
  readonly = false,
  placeholder = "Start typing...",
  label,
  required,
}) => {
  const editorRef = useRef(null);

  const config = useMemo(
    () => ({
      readonly,
      height,
      placeholder,
      toolbarAdaptive: false,
      toolbarSticky: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
      buttons: [
        "bold",
        "italic",
        "underline",
        "ul",
        "ol",
        "link",
        "image",
      ],
    }),
    [readonly, height, placeholder]
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1 truncate">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 overflow-hidden">
        <JoditEditor
          ref={editorRef}
          value={value}
          config={config}
          onBlur={(newContent) => onChange(newContent)}
          onChange={onChange} 
        />
      </div>
    </div>
  );
};
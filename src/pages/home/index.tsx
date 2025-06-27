import { useForm } from "@mantine/form";
import { renderField } from "../../lib/helpers/render-utils/renderUtils";
import { FieldConfig } from "../../types";
// import { useEffect, useState } from "react";
// import { CubeJoditEditor } from "../../components/ui/jodit-editor/JoditEditor";

export const HomePage = () => {
  const form = useForm({
    initialValues: {
      firstName: "srinivasa",
      lastName: "",
      product: "Google",
      social: ["Mint", "NDS"],
      notes: "",
      iam: false
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      fields.forEach((field) => {
        if (
          field.required &&
          (!field.showCondition || field.showCondition(values))
        ) {
          if (!values[field.name]) {
            errors[field.name] = field.validation?.required || "Required field";
          }
        }
      });
      return errors;
    },
  });

  const fields: FieldConfig[] = [
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      required: true,
      placeholder: "Enter your first name",
      width: 4,
    },
    { type: "text", name: "lastName", label: "Last Name", width: 4 },
    {
      type: "number",
      name: "number",
      label: "Number",
      required: true,
      placeholder: "0",
      width: 2,
    },
    {
      type: "number",
      name: "price",
      label: "Price",
      required: true,
      prefix: "currency",
      width: 2,
    },
    {
      type: "number",
      name: "percent",
      label: "Percent",
      required: true,
      prefix: "percent",
      width: 2,
    },
    {
      type: "date",
      name: "date",
      label: "Date",
      required: true,
      width: 8,
      // validation: {
      //   required: "Please enter your birth date in MM/DD/YYYY format",
      // },
    },
    {
      type: "select",
      name: "product",
      label: "Select",
      required: true,
      width: 2,
      options: [
        { value: "Connectiv", label: "Connectiv" },
        { value: "Google", label: "Google" },
        { value: "Mint", label: "Mint" },
        { value: "NDS", label: "NDS" },
        {
          value: "PortaPottyRentalGuide.com",
          label:
            "PortaPottyRentalGuide.com PortaPottyRentalGuide.com PortaPottyRentalGuide.com",
        },
        { value: "Project Armada", label: "Project Armada" },
        { value: "Search Advisor", label: "Search Advisor" },
        { value: "Triares", label: "Triares" },
        { value: "Advertising Campaign", label: "Advertising Campaign" },
      ],
    },
    {
      type: "multiselect",
      name: "social",
      label: "Multi Select",
      required: true,
      width: 2,
      options: [
        { value: "Connectiv", label: "Connectiv" },
        { value: "Google", label: "Google" },
        { value: "Mint", label: "Mint" },
        { value: "NDS", label: "NDS" },
        {
          value: "PortaPottyRentalGuide.com",
          label:
            "PortaPottyRentalGuide.com PortaPottyRentalGuide.com PortaPottyRentalGuide.com",
        },
        { value: "Project Armada", label: "Project Armada" },
        { value: "Search Advisor", label: "Search Advisor" },
        { value: "Triares", label: "Triares" },
        { value: "Advertising Campaign", label: "Advertising Campaign" },
      ],
    },
    {
      type: "checkbox",
      name: "iam",
      label: "iam",
      required: true,
      width: 2,
    },
    {
      type: "notes",
      name: "notes",
      label: "notes",
      width: 12,
      height: 300,
    },
  ];

  const handleSubmit = (values: typeof form.values) => {
    form.validate();
    if (form.isValid()) {
      console.log("Form values:", values);
    }
  };

  // const [description, setDescription] = useState("");

  // useEffect(() => {
  //   console.log("Description changed:", description);
  // }, [description]);

  return (
    <div className="mx-20 m-5">
      <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {fields.map((field) => (
            <div key={field.name} className={`col-span-${field.width || 12}`}>
              {renderField({ field, form })}
            </div>
          ))}
        </div>

        {/* <CubeJoditEditor value={description} onChange={setDescription} /> */}

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

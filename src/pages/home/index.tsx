import { useForm } from "@mantine/form";
import { renderField } from "../../lib/helpers/render-utils/renderUtils";
import { FieldConfig } from "../../types";
import { useEffect, useRef } from "react";
import { scrollToElement } from "../../lib/helpers";

type HomePageFormValues = {
  firstName: string;
  lastName: string;
  product: string;
  social: string[];
  notes: string;
  iam: boolean;
  number?: number;
  price?: number;
  percent?: number;
  date?: Date | string;
  [key: string]: unknown;
};

 const HomePage = () => {
  const form = useForm<HomePageFormValues>({
    initialValues: {
      firstName: "srinivasa",
      lastName: "",
      product: "Google",
      social: ["Mint", "NDS"],
      notes: "  ",
      iam: false,
      price: 200,
    },
    validate: (values: HomePageFormValues) => {
      const errors: Record<string, string> = {};
      fields.forEach((field) => {
        if (
          field.required &&
          (!field.showCondition || field.showCondition(values))
        ) {
          const value = values[field.name];

          if (
            value === undefined ||
            value === null ||
            value === "" ||
            (Array.isArray(value) && value.length === 0)
          ) {
            errors[field.name] = field.validation?.required || "Required field";
          }
        }
      });
      return errors;
    },
  });

  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const fields: FieldConfig[] = [
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      required: true,
      placeholder: "Enter your first name",
      disabled: true,
      width: 4,
    },
    {
      type: "text",
      name: "lastName",
      label: "Last Name",
      width: 4,
      required: true,
    },
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
      disabled: true,
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
        { value: "abc.com", label: "abc.com" },
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
      showCondition: (state) => state.product === "NDS",
    },
    {
      type: "notes",
      name: "notes",
      label: "Notes",
      width: 12,
      height: 300,
    },
    {
      type: "special-select",
      name: "cars",
      label: "Specilal Select",
      required: true,
      width: 2,
      options: [
        {
          value: "project1",
          label: "E-commerce Platform",
          description: "Online shopping system",
          meta: {
            team: "Frontend",
            progress: "75%",
          },
        },
        {
          value: "project2",
          label: "Analytics Dashboard",
          description: "Data visualization tool",
          meta: {
            team: "Data Science",
            progress: "40%",
          },
        },

      ],
    },
  ];

  const handleSubmit = (values: HomePageFormValues) => {
    form.validate();

    if (!form.isValid()) {
      // Wait for the next render to ensure errors are displayed
      setTimeout(() => {
        const firstErrorField = fields.find((field) => form.errors[field.name]);

        if (firstErrorField) {
          const element = fieldRefs.current[firstErrorField.name];
          if (element) {
            scrollToElement(element);

            const focusable = element.querySelector(
              "input, select, textarea, button, [tabindex]"
            ) as HTMLElement | null;

            if (focusable) {
              focusable.focus();
            }
          }
        }
      }, 100);
      return;
    }

    console.log("Form values:", values);
  };

  useEffect(() => {
    if (Object.keys(form.errors).length > 0) {
      const firstErrorName = Object.keys(form.errors)[0];
      const element = fieldRefs.current[firstErrorName];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [form.errors]);

  const renderFormField = (field: FieldConfig) => {
    const isVisible = !field.showCondition || field.showCondition(form.values);
    if (!isVisible) return null;
    return renderField({ field, form });
  };

  return (
    <div className="mx-20 m-5">
      <form ref={formRef} onSubmit={form.onSubmit(handleSubmit)} noValidate>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {fields.map((field) => (
            <div
              key={field.name}
              className={`col-span-${field.width || 12}`}
              ref={(el) => {
                fieldRefs.current[field.name] = el;
              }}
            >
              {renderFormField(field)}
            </div>
          ))}
        </div>

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

export default HomePage;
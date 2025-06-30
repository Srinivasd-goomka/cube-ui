import React, { useEffect, useRef } from "react";
import { useForm } from "@mantine/form";
import { FieldConfig } from "../../../types";
import { isValidRemovalDate, scrollToElement } from "../../../lib/helpers";
import { renderField } from "../../../lib/helpers/render-utils/renderUtils";
import { productService } from "../../../services/product";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
// import { useNavigate, useParams } from "react-router-dom";

type CubeProductFormProps = {
  onClose: () => void;
  fields: FieldConfig[];
  defaultCategoryOverrides?: Record<string, string[]>;
  defaultBaseValues?: Record<string, unknown>;
  isEdit: boolean;
};

const DEFAULTS = { quantity: "", frequency: "", cycle_time: "" };

export const CubeProductForm: React.FC<CubeProductFormProps> = ({
  onClose,
  fields,
  defaultCategoryOverrides = {},
  defaultBaseValues = {},
  isEdit = false,
}) => {
  //   const navigate = useNavigate();
  //   const { siteId } = useParams();
  const [searchParams] = useSearchParams();
  const productIdParam = searchParams.get("productId");
  const productId = productIdParam ? Number(productIdParam) : null;

  const form = useForm<any>({
    initialValues: Object.fromEntries(
      fields.map((f) => [f.name, defaultBaseValues?.[f.name] ?? ""])
    ),
    validate: (values: any) => {
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

  const { data: productTypeList } = useQuery({
    queryKey: ["productTypeList", [1, 200, 5]],
    queryFn: () =>
      productId !== null
        ? productService.getProductTypesByProductId(1, 200, productId)
        : Promise.resolve([]),
    refetchOnWindowFocus: false,
  });

  const { data: productCodeListData } = useQuery({
    queryKey: ["productCodeList", [1, 100]],
    queryFn: () =>
      productId !== null
        ? productService.getProductCodesByProductId(1, 100, productId)
        : Promise.resolve([]),
    refetchOnWindowFocus: false,
  });

  const { data: ticketCodeListData } = useQuery({
    queryKey: ["ticketCodeList", [1, 100]],
    queryFn: () =>
      productId !== null
        ? productService.getTicketCodesByProductId(1, 100, productId)
        : Promise.resolve([]),
    refetchOnWindowFocus: false,
  });


  const handleSubmit = (values: any) => {
    const isValid = isValidRemovalDate(
      values.removal_date,
      values.delivery_date
    );
    if (!isValid) return;
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

    saveFormData(values, "details");
    form.reset();
  };

  const saveFormData = (values: unknown, type: string) => {
    console.log("Form values:", values);
    console.log("type:", type);
    //TODO SAVE
    //    const selectedProduct = products.find((p) => p.id === data?.product_type);
    // if (!selectedProduct) return;

    // const payload = {};

    // localStorage.setItem("add-product", payload.display_id);
    // dispatch(addProduct({ product: payload }));

    // const vendor = vendors.find((v) => v.display_id === payload.display_id);
    // if (vendor) dispatch(addVendor({ vendor }));

    // if (!isEdit && type !== "add") navigate(`/product-quote/${siteId}`);
    //SAVE
    onClose();
  };

  const saveAndClose = () => {
    const values = form.values;
    const isValid = isValidRemovalDate(
      values.removal_date,
      values.delivery_date
    );
    if (!isValid) return;
    saveFormData(values, "add");
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

      <div className="w-full">
        <div className="flex flex-row flex-wrap justify-between gap-4 my-4">
          {!isEdit && (
            <>
              <div>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => handleSubmit(saveAndClose)}
                >
                  Save & Add New Product
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded opacity-60 cursor-not-allowed"
                  title="Functionality Coming Soon..."
                  disabled
                >
                  Save & Create Fulfillment Ticket
                </button>
              </div>
            </>
          )}
          {isEdit && (
            <div>
              <button
                type="submit"
                onClick={onClose}
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
              >
                Cancel
              </button>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

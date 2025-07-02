import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "@mantine/form";
import { CubeProductFormProps, FormValues, ProductRoot } from "../../../types";
import {
  colSpanClasses,
  formatDate,
  getCurrentDateAndTime,
  isValidRemovalDate,
  scrollToElement,
  uniqId,
} from "../../../lib/helpers";
import { renderField } from "../../../lib/helpers/render-utils/renderUtils";
import { productService } from "../../../services/product";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { CubeTooltip } from "../tooltip/CubeTooltip";
import CubeButton from "../button/CubeButton";
import { debrisTypeList } from "../../../constants";
import useSiteStore from "../../../store/site";
import useCubeStore from "../../../store/cube";
import { useNavigate } from "react-router-dom";

const DEFAULTS = { quantity: "", frequency: "", cycle_time: "" };

export const CubeProductForm: React.FC<CubeProductFormProps> = ({
  onClose,
  fields,
  defaultCategoryOverrides = {},
  defaultBaseValues = {},
  isEdit = false,
}) => {
  const navigate = useNavigate();
  const { site } = useSiteStore();
  const addProduct = useCubeStore((state) => state.addProduct);
  const [searchParams] = useSearchParams();
  const productIdParam = searchParams.get("productId");
  const productId = productIdParam ? Number(productIdParam) : null;
  const [formFields, setFormFields] = useState(fields);
  const [productList, setProductList] = useState<ProductRoot[]>([]);
  const [productCodes, setProductCodes] = useState<unknown[]>([]);
  const [ticketCodes, setTicketCodes] = useState<unknown[]>([]);
  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<FormValues>({
    initialValues: Object.fromEntries(
      formFields
        .filter((f) => f.isField !== false)
        .map((f) => [f.name, defaultBaseValues?.[f.name] ?? ""])
    ),
    validate: (values: FormValues) => {
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

  const fetchProductTypes = async (): Promise<{ data?: unknown[] }> => {
    if (!productId) return { data: [] };
    const response = await productService.getProductTypesByProductId(
      1,
      200,
      Number(productId)
    );
    return response as { data?: unknown[] };
  };

  const { data: productTypeList, isLoading } = useQuery<{ data?: unknown[] }>({
    queryKey: ["productTypeList", [1, 200]],
    queryFn: fetchProductTypes,
    enabled: !!productId,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const fetchProductCodes = async (): Promise<unknown> => {
    if (!productId) return [];
    const response = await productService.getProductCodesByProductId(
      1,
      100,
      Number(productId)
    );
    return response;
  };

  const { data: productCodeDataList } = useQuery({
    queryKey: ["productCodeList", [1, 100]],
    queryFn: fetchProductCodes,
    enabled: !!productId,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const fetchTicketCodes = async (): Promise<unknown> => {
    if (!productId) return [];
    const response = await productService.getTicketCodesByProductId(
      1,
      100,
      Number(productId)
    );
    return response;
  };

  const { data: ticketCodeDataList } = useQuery({
    queryKey: ["ticketCodeList", [1, 100]],
    queryFn: fetchTicketCodes,
    enabled: !!productId,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const { removal_date, delivery_date } = form.values;
    form.setFieldValue("removal_request", !!removal_date);
    if (removal_date) {
      form.setFieldValue("removal_requested_on", getCurrentDateAndTime());
    }

    if (
      !isValidRemovalDate(
        removal_date as string | null | undefined,
        delivery_date as string | null | undefined
      )
    ) {
      return;
    }
  }, [form.values.removal_date]);

  useEffect(() => {
    form.setFieldValue("type_of_gate", form.values.gate ? "" : "none");
  }, [form.values.gate]);

  useEffect(() => {
    if (
      !isLoading &&
      productTypeList &&
      (productTypeList as { data?: unknown[] }).data
    ) {
      setProductList(
        (productTypeList as { data: unknown[] }).data as ProductRoot[]
      );
      setProductCodes(
        productCodeDataList &&
          (productCodeDataList as { data?: unknown[] }).data
          ? (productCodeDataList as { data: unknown[] }).data
          : []
      );
      setTicketCodes(
        ticketCodeDataList && (ticketCodeDataList as { data?: unknown[] }).data
          ? (ticketCodeDataList as { data: unknown[] }).data
          : []
      );
    }
  }, [productTypeList, isLoading, productCodeDataList, ticketCodeDataList]);

  useEffect(() => {
    const category = form.values.category as string;

    // Reset product_type if no category or productTypeList
    if (!category || !productTypeList?.data) {
      form.setFieldValue("product_type", null);
      return;
    }

    // Filter products based on category
    const filtered =
      category === "nocat"
        ? productTypeList.data
        : productTypeList.data.filter(
            (t: unknown) =>
              t &&
              typeof t === "object" &&
              "product_category" in t &&
              (t as { product_category: string }).product_category === category
          );

    // Update products if different
    if (JSON.stringify(filtered) !== JSON.stringify(productList)) {
      let newProducts = filtered;

      // Special case for product ID 9
      if (productId === 9) {
        newProducts = filtered.filter(
          (p: unknown) =>
            p &&
            typeof p === "object" &&
            "product_type" in p &&
            p.product_type !== "Grease"
        );
      }

      setProductList(newProducts as ProductRoot[]);
      form.setFieldValue(
        "product_type",
        defaultBaseValues?.product_type || null
      );
    }

    // Apply category overrides
    if (category !== "nocat") {
      const overrides = {
        ...DEFAULTS,
        ...(defaultCategoryOverrides[category] || {}),
      };

      Object.entries(overrides).forEach(([field, val]) => {
        form.setFieldValue(field, val);
      });
    }
  }, [form.values.category, productTypeList]);

  const formattedProductList = useMemo(() => {
    return (productList || [])
      .sort(
        (a, b) =>
          (a as ProductRoot).product_type?.localeCompare(
            (b as ProductRoot).product_type ?? ""
          ) ?? 0
      )
      .map((product) => {
        const p = product as ProductRoot;
        return {
          value: p?.id,
          label: p?.standard_charge_abbreviation ?? "",
          product_type: p?.product_type,
          category: p?.parent_product_category,
        };
      });
  }, [productList]);

  useEffect(() => {
    const { category } = form.values;
    setFormFields((prev) =>
      prev.map((field) => {
        if (field.name === "product_type") {
          return {
            ...field,
            options: category ? formattedProductList : field.options,
          };
        }
        return field;
      })
    );
  }, [form.values.category, formattedProductList]);

  useEffect(() => {
    const { debris } = form.values;
    const debrisTypes = debrisTypeList();

    setFormFields((prev) =>
      prev.map((field) => {
        if (field.name === "debris_type") {
          return {
            ...field,
            options: debris
              ? debrisTypes.filter((d) => d.category === debris)
              : [],
          };
        }
        return field;
      })
    );
  }, [form.values.debris, debrisTypeList]);

  const handleSubmit = (values: FormValues) => {
    const isValid = isValidRemovalDate(
      values.removal_date as string | null | undefined,
      values.delivery_date as string | null | undefined
    );

    if (!isValid) return;

    const validation = form.validate();
    if (validation.hasErrors) {
      scrollToFirstError(validation.errors);
      return;
    }

    saveFormData(values, "details");
    form.reset();
  };

  const saveFormData = (values: FormValues, type: string) => {
    const selectedProduct = productList.find(
      (p) => (p as ProductRoot).id === values?.product_type
    );
    if (!selectedProduct) return;

    const payload = {
      id: productId,
      product_id: productId,
      ...(typeof values === "object" && values !== null ? values : {}),
      site: site,
      // name: selectedProduct?.product?.product_name,
      product: selectedProduct,

      category: values?.category === "nocat" ? "-" : values?.category,
      display_id: values?.display_id || uniqId(),
      display_status: values?.status || "-",
      // display_product_type: selectedProduct.standard_charge_abbreviation,
      // display_product_type_id: selectedProduct.id,
      // sca: selectedProduct.standard_charge_abbreviation,
      // sca_id: selectedProduct.id,
      // parent_product_category: selectedProduct.parent_product_category,
      date_created: formatDate(new Date()),
      status_value: values.status,
      category_value: values.category,
      vendor_standard_rate: "0",
      hauler_name: "-",
      hauler_phone_number: "-",
      customer_id: site?.customer_id,
      // site_id: site?.id,
      order_type: "quote",
      product_codes: productCodes,
      ticket_codes: ticketCodes,
    };

    localStorage.setItem("add-product", String(payload.display_id));
    addProduct(payload);

    //TODO const vendor = vendors.find((v) => v.display_id === payload.display_id);
    // if (vendor) dispatch(addVendor({ vendor }));

    if (!isEdit && type !== "add") navigate(`/sites/site/product/${site?.id}`);

    onClose();
  };

  const handleSaveAndClose = () => {
    const values = form.values;
    const isValid = isValidRemovalDate(
      values.removal_date as string | null | undefined,
      values.delivery_date as string | null | undefined
    );
    if (!isValid) return;

    const validation = form.validate();
    if (validation.hasErrors) {
      scrollToFirstError(validation.errors);
      return;
    }

    saveFormData(values, "add");
  };

  const scrollToFirstError = (errors: Record<string, React.ReactNode>) => {
    setTimeout(() => {
      const firstErrorField = fields.find((field) => errors[field.name]);
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
  };

  return (
    <form ref={formRef} onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {formFields
          .filter(
            (field) => !field.showCondition || field.showCondition(form.values)
          )
          .map((field) => {
            const spanClass =
              colSpanClasses[field?.width || 12] || "col-span-12";
            return (
              <div
                key={field.name}
                className={spanClass}
                ref={(el) => {
                  fieldRefs.current[field.name] = el;
                }}
                style={{ marginTop: `${field.marginTop}rem` }}
              >
                {renderField({ field, form })}
              </div>
            );
          })}
      </div>

      <div className="w-full">
        <div className="flex flex-row flex-wrap justify-between gap-2 mt-8">
          {!isEdit && (
            <>
              <div>
                <CubeButton
                  type="button"
                  onClick={handleSaveAndClose}
                  variant="primary"
                  label="Save & Add New Product"
                />
              </div>
              <div>
                <CubeTooltip content="Functionality Coming Soon...">
                  <CubeButton
                    type="button"
                    disabled
                    variant="primary"
                    label="Save & Create Fulfillment Ticket"
                  />
                </CubeTooltip>
              </div>
            </>
          )}
          {isEdit && (
            <div>
              <CubeButton
                type="submit"
                onClick={onClose}
                variant="primary"
                label="Cancel"
              />
            </div>
          )}

          <div>
            <CubeButton
              type="submit"
              variant="primary"
              label="Save & Continue"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

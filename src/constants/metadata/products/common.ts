import { quoteCancelationReasonList, quoteStatusList } from "../../static-data";

export function commonProductMetadata() {
  const commonMetadata = [
    {
      type: "select",
      label: "Status",
      name: "status",
      required: true,
      validation: { required: "Status is required" },
      options: quoteStatusList(),
      width: 6,
    },
    {
      type: "select",
      label: "Canceled Reason",
      name: "canceled_reason",
      required: true,
      validation: { required: "Canceled Reason is required" },
      options: quoteCancelationReasonList(),
      showCondition: (state: { status: string }) => state.status === "Canceled",
      width: 6,
    },
    {
      type: "section",
      label: "Service Information",
      name: "Service Information",
      required: true,
      validation: {},
      options: {},
      width: 12,
    },
    {
      type: "text",
      label: "Product Nickname",
      name: "product_nickname",
      validation: {},
      width: 3,
    },
    {
      type: "text",
      label: "PO/Job #",
      name: "po_number",
      validation: {},
      width: 3,
    },
    {
      type: "number",
      label: "PO DNE Amount",
      name: "po_dne_amount",
      validation: {},
      width: 3,
    },
    {
      type: "date",
      label: "PO Provided Date",
      name: "po_provided_date",
      validation: {},
      width: 3,
    },
  ];
  return commonMetadata;
}
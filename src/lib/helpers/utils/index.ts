import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FieldConfig } from "../../../types";
import { toast } from "react-toastify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isEmptyObject = (obj: Record<string, unknown>) => {
  return Object.keys(obj).length === 0;
};

export const scrollToElement = (element: HTMLElement) => {
  const headerOffset = 70;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

export function groupFieldsByRow(fields: FieldConfig[]) {
  const rows: Array<Array<FieldConfig>> = [];
  let currentRow: Array<FieldConfig> = [];
  let widthSum = 0;

  for (const field of fields) {
    const width = field.width || 12;

    if (widthSum + width > 12) {
      rows.push(currentRow);
      currentRow = [field];
      widthSum = width;
    } else {
      currentRow.push(field);
      widthSum += width;
    }
  }

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return rows;
}

export function getInitials(fullName: string | null | undefined): string {
  if (!fullName) return "";

  const names = fullName.trim().split(" ");
  const first = names[0]?.[0] || "";
  const last = names.length > 1 ? names[names.length - 1][0] : "";

  return (first + last).toUpperCase();
}

export function customSortOrder(
  data: Record<string, unknown>[],
  order: unknown[],
  key: string
) {
  return data.sort((a, b) => {
    const indexA = order.indexOf(a[key]);
    const indexB = order.indexOf(b[key]);

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
}

export function isValidRemovalDate(
  removalDate: string | null | undefined,
  deliveryDate: string | null | undefined,
  showToast = true
) {
  if (!removalDate || !deliveryDate) return true;

  const removal = new Date(removalDate);
  const delivery = new Date(deliveryDate);

  if (removal < delivery) {
    if (showToast) {
      toast.error("Removal date cannot be earlier than delivery date");
    }
    return false;
  }

  return true;
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FieldConfig } from "../../../types";
import { toast } from "react-toastify";
import { FormatDateOptions } from "../../../types/interface/common";

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

export const colSpanClasses: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

export function getCurrentDateAndTime() {
  const today = new Date();
  const formattedDate = today.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  return formattedDate;
}

export const uniqId = () => {
  const timestamp = Math.floor(Date.now() / 1000);
  return String(timestamp);
};

export function formatDate(dateTimeString: string | number | Date): string {
  const date = new Date(dateTimeString);
  const dateOptions: FormatDateOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };
  return `${date.toLocaleDateString("en-US", dateOptions)}`;
}

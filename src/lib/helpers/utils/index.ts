import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FieldConfig } from "../../../types";

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

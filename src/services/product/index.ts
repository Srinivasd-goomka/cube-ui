import { productList } from "../../constants";
import { customSortOrder } from "../../lib/helpers";
import { handleRequest } from "../../lib/helpers/requestHandler/handle-request";
import { HelperService } from "../helper";

interface Product {
  product_name: string;
  [key: string]: unknown;
}

interface ProductType {
  id: number;
  name: string;
  // Add other fields as needed based on your API response
}

class ProductService extends HelperService {
  public async getProductsBySiteId(siteId: number): Promise<Product[]> {
    const url = `/customer-wizard/product-price/existing/${siteId}`;
    const response = await handleRequest(this.get<Product[]>(url));
    const removedOther = (response as Product[]).filter((product: Product) =>
      product.product_name === "Other"
        ? (product.product_name = "Grease Trap")
        : product.product_name
    );
    const sortedData = customSortOrder(
      removedOther,
      productList(),
      "product_name"
    );

    return sortedData as Product[];
  }

  public async getProductTypesByProductId(
    page: number,
    limit: number,
    productId: number
  ): Promise<ProductType[]> {
    const url = `/product-types?page=${page}&limit=${limit}&product_id=${productId}`;
    const response = await handleRequest(this.get<ProductType[]>(url));
    return response;
  }

  public async getProductCodesByProductId(
    page: number,
    limit: number,
    productId: number
  ): Promise<ProductType[]> {
    const url = `/product-codes?page=${page}&limit=${limit}&product_id=${productId}`;
    const response = await handleRequest(this.get<ProductType[]>(url));
    return response;
  }

  public async getTicketCodesByProductId(
    page: number,
    limit: number,
    productId: number
  ): Promise<ProductType[]> {
    const url = `/ticket-codes?page=${page}&limit=${limit}&product_id=${productId}`;
    const response = await handleRequest(this.get<ProductType[]>(url));
    return response;
  }
}

export const productService = new ProductService();

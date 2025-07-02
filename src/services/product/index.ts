import { productList } from "../../constants";
import { customSortOrder } from "../../lib/helpers";
import { handleRequest } from "../../lib/helpers/requestHandler/handle-request";
import {
  ProductCodes,
  ProductRoot,
  RootProductList,
  TicketCodes,
} from "../../types";
import { HelperService } from "../helper";

class ProductService extends HelperService {
  public async getProductsBySiteId(siteId: number): Promise<RootProductList[]> {
    const url = `/customer-wizard/product-price/existing/${siteId}`;
    const response = (await handleRequest(
      this.get<RootProductList[]>(url)
    )) as unknown as {
      data: RootProductList[];
    };
    const removedOther = response.data.map((product: RootProductList) =>
      product.product_name === "Other"
        ? { ...product, product_name: "Grease Trap" }
        : product
    );
    const sortedData = customSortOrder(
      removedOther as unknown as Record<string, unknown>[],
      productList(),
      "product_name"
    );

    return sortedData as unknown as RootProductList[];
  }

  public async getProductTypesByProductId(
    page: number,
    limit: number,
    productId: number
  ): Promise<ProductRoot> {
    const url = `/product-types?page=${page}&limit=${limit}&product_id=${productId}`;
    const response = await handleRequest(this.get<ProductRoot>(url));
    return (response as unknown as { data: ProductRoot }).data;
  }

  public async getProductCodesByProductId(
    page: number,
    limit: number,
    productId: number
  ): Promise<ProductCodes> {
    const url = `/product-codes?page=${page}&limit=${limit}&product_id=${productId}`;
    const response = await handleRequest(this.get<ProductCodes>(url));
    return (response as unknown as { data: ProductCodes }).data;
  }

  public async getTicketCodesByProductId(
    page: number,
    limit: number,
    productId: number
  ): Promise<TicketCodes> {
    const url = `/ticket-codes?page=${page}&limit=${limit}&product_id=${productId}`;
    const response = await handleRequest(this.get<TicketCodes>(url));
    return (response as unknown as { data: TicketCodes }).data;
  }
}

export const productService = new ProductService();

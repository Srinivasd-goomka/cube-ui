import { handleRequest } from "../../lib/helpers/requestHandler/handle-request";
import { Site } from "../../types";
import { HelperService } from "../helper";

class SiteService extends HelperService {
  public async getSite(siteId: number): Promise<Site> {
    const url = `/sites/${siteId}`;
    const response = await handleRequest(this.get<{ data: Site }>(url));
    return response.data;
  }
}

export const siteService = new SiteService();

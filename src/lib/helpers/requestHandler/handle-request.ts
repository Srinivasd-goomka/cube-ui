import { handleError } from "./error-handler";

export async function handleRequest<T>(request: Promise<T>): Promise<T> {
  try {
    return await request;
  } catch (error) {
    handleError(error);
    throw new Error("An error occurred while processing the request.");
  }
}

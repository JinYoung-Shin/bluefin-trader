import { getValue } from "@firefly-exchange/library";
import { serializeError } from "eth-rpc-errors";
export type ResponseSchema = {
  ok: boolean;
  data: any;
  message: string;
  code?: number | string;
  stack?: string;
};
interface ProviderRpcError {
  code: number | string;
  message: string;
  data?: unknown;
  stack?: string;
}
export const handleResponse = (
  response: ProviderRpcError,
  ok: boolean
): ResponseSchema => {
  const mutatedResponse: ResponseSchema = {
    // TODO:needs to be implemented properly (BE have to change response model first )
    ok,
    data: getValue(
      response.data as object,
      "originalError.transaction",
      response.data
    ),
    message: getValue(
      response.data as object,
      "originalError.reason",
      response.message
    ),
    code: getValue(
      response.data as object,
      "originalError.code",
      response.code
    ),
    stack: response.message,
  };
  return mutatedResponse;
};

export const TransformToResponseSchema = async (
  contactCall: () => Promise<void>,
  successMessage: string
): Promise<ResponseSchema> => {
  try {
    const result = await contactCall();
    return handleResponse(
      {
        data: result,
        message: successMessage,
        code: 200,
      },
      true
    );
  } catch (error: any) {
    return handleResponse({ ...serializeError(error) }, false);
  }
};

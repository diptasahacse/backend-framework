export interface BaseResponse<T> {
  status: "success" | "error";
  message: string;
  data: T | null;
  statusCode?: number;
}

/**
 * Success response helper
 * @param data - Response data
 * @param message - Optional success message (default: "Success")
 */
export const successResponse = <T>(data: T, message = "Success"): BaseResponse<T> => ({
  status: "success",
  message,
  data,
});

/**
 * Error response helper
 * @param message - Error message
 * @param statusCode - HTTP status code (default: 500)
 */
export const errorResponse = (message: string, statusCode = 500): BaseResponse<null> => ({
  status: "error",
  message,
  data: null,
  statusCode,
});

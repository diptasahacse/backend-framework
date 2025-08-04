import { Response } from "express";

export const successResponse = <T>(
  res: Response,
  data: T,
  status: number = 200
): Response<{ success: true; data: T }> => {
  return res.status(status).json({
    success: true,
    data,
  });
};

export const errorResponse = (
  res: Response,
  error: unknown,
  status: number = 500
): Response<{ success: false; error: string }> => {
  const message =
    error instanceof Error ? error.message : typeof error === "string" ? error : "Internal Server Error";

  return res.status(status).json({
    success: false,
    error: message,
  });
};

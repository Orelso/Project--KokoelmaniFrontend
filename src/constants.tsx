/** e.g. localhost:8888/api/v1/all */
export const BACKEND_URL =
  String(
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_DEV_API_URL
      : process.env.NEXT_PUBLIC_API_URL
  ) + "/v1/all";

export const API_URL = String(
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEV_API_URL
    : process.env.NEXT_PUBLIC_API_URL
);

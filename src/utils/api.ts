export const baseURL = process.env.NODE_ENV === "development"
  ? (process.env.NEXT_PUBLIC_DEV_URL || "http://localhost:3000")
  : "https://utkarshsorathia.in";
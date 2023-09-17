export type SuccessResponse = {
  success: boolean;
  data: any;
};

export type ErrorResponse = {
  statusCode: number;
  msg: any;
};

export type ApiResponse = SuccessResponse | ErrorResponse;

export type CategoryType = {
  id: string;
  name: string;
  url: string;
  visible: boolean;
  deleted: boolean;
};

export type ProductTypesType = {
  id: string;
  name: string;
  category: CategoryType;
};

export type ProductType = {
  title: string;
  featured: boolean;
  visible: boolean;
  deleted: boolean;
};

export type ToastType = "info" | "success" | "error" | "warn" | undefined;

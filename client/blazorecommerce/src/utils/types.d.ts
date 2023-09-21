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
  _id: string;
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

type VariantType = {
  id?: number;
  price: number;
  originalPrice: number;
  productType: ProductTypesType;
  visible: boolean;
  deleted: boolean;
};

export type ProductType = {
  _id?: string;
  title: string;
  imageUrl: string;
  description: string;
  featured: boolean;
  category: CategoryType;
  variants: VariantType[];
  visible: boolean;
  deleted: boolean;
};

export type ToastType = "info" | "success" | "error" | "warn" | undefined;

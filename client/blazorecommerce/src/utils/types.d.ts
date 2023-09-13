export type SuccessResponse = {
  success: boolean;
  data: any;
};

export type ErrorResponse = {
  statusCode: number;
  msg: string;
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

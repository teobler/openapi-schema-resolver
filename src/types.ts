import { Schema } from "@openapi-integration/openapi-schema";

export interface IResolvedPath {
  url: string;
  method: string;
  TResp: any;
  TReq: any;
  THeader: Record<string, any>;
  requestBody?: string;
  operationId?: string;
  pathParams: string[];
  queryParams: string[];
  bodyParams: string[];
  formDataParams: string[];
}

export type TDictionary<T> = { [key: string]: T };

export interface ISchemaResolverInputs {
  results: TDictionary<any>;
  schema?: Schema;
  key?: string;
  parentKey?: string;
}

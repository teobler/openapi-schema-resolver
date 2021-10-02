import { Parameter, Schema } from "@openapi-integration/openapi-schema";

export interface IResolvedParams {
  pathParams: string[];
  queryParams: string[];
  bodyParams: string[];
  formDataParams: string[];
}

export interface IResolvedPath extends IResolvedParams {
  THeader: Record<string, any>;
  TReq: Record<string, any> | undefined;
  TResp: Record<string, any> | string;
  bodyParams: string[];
  pathParams: string[];
  queryParams: string[];
  formDataParams: string[];
  method: string;
  operationId?: string;
  requestBody?: string;
  url: string;
}

export interface IParameters {
  pathParams: Parameter[];
  queryParams: Parameter[];
  bodyParams: Parameter[];
  formDataParams: Parameter[];
}

export type TDictionary<T> = { [key: string]: T };

export interface ISchemaResolverInputs {
  results: TDictionary<any>;
  schema?: Schema;
  key?: string;
  parentKey?: string;
}

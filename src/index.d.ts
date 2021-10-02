import {
  Components,
  Operation,
  Parameter,
  Path,
  Paths,
  Reference,
  RequestBody,
  Response,
  Schema,
} from "@openapi-integration/openapi-schema";
import { IParameters, IResolvedParams, IResolvedPath, ISchemaResolverInputs, TDictionary } from "./types";

export class SchemaResolver {
  private schemaType: TDictionary<any> | string;

  static of(inputs: ISchemaResolverInputs): SchemaResolver;

  constructor(private inputs: ISchemaResolverInputs) {}

  getSchemaType(): TDictionary<any> | string;

  resolve(type?: string): this;

  resolveNullable(): this;

  getEnumName(propertyName: string, parentKey: string = ""): string;

  resolveRef($ref?: string, type?: string): string;

  getBasicType(basicType: string = "", advancedType?: string): string;

  getTypeForArray(advancedType?: string): string;

  pickTypeByRef(str?: string): string | undefined;

  resolveItems(
    items?: Schema | Schema[],
    type?: string,
    key?: string,
    parentKey?: string,
  ): Record<string, any> | string;

  resolveProperties(
    properties: { [propertyName: string]: Schema } = {},
    required: string[] = [],
    parentKey?: string,
  ): TDictionary<any>;
}

export class DefinitionsResolver {
  resolvedDefinitions: any;

  constructor(private components?: Components);

  static of(components?: Components): DefinitionsResolver;

  scanDefinitions(): this;

  toDeclarations(): string[];
}

export class PathResolver {
  resolvedPaths: IResolvedPath[] = [];
  extraDefinitions = {};
  contentType: { [operationId: string]: string } = {};

  static of(paths: Paths): PathResolver;

  constructor(private paths?: Paths);

  resolve(): this;

  resolvePath(path: Path, pathName: string): IResolvedPath[];

  getRequestURL(pathName: string): string;

  isPathParam(str: string): boolean;

  resolveOperation(operation: Operation): Omit<IResolvedPath, "url" | "method">;

  getParamsNames(params: IParameters): IResolvedParams;

  getRequestTypes(params: IParameters, operationId: string, requestBody?: RequestBody | Reference): Record<string, any>;

  getPathParamsTypes(pathParams: Parameter[]): Record<string, any>;

  getBodyAndQueryParamsTypes(bodyParams: Parameter[]): Record<string, any>;

  getFormDataParamsTypes(formDataParams: any[]): Record<string, any>;

  getRequestBodyTypes(operationId: string, requestBody?: RequestBody | Reference): Record<string, any>;

  getResponseTypes(responses: { [responseName: string]: Response | Reference }): TDictionary<any> | string;

  pickParams(parameters: Parameter[]): (type: "path" | "query" | "body" | "cookie" | "header") => Parameter[];

  getContentType(operationId: string, key: string): { [operationId: string]: string };

  getRequestBodyName(requestBody?: RequestBody | Reference, operationId?: string): { requestBody: string } | undefined;
}

# OpenAPI schema resolver

this is a tool for resolving OpenAPI schema.

For the first part, it can convert json format OpenAPI schema to TypeScript type definition.

from

```json
 {
  "components": {
    "schemas": {
      "ScheduleVO": {
        "type": "object",
        "properties": {
          "team": {
            "type": "string"
          },
          "schedules": {
            "type": "array",
            "nullable": true,
            "items": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/BookVO"
              }
            }
          },
          "shiftId": {
            "type": "string"
          }
        },
        "title": "ScheduleVO"
      },
      "BookVO": {
        "type": "object",
        "properties": {
          "price": {
            "type": "string"
          },
          "address": {
            "type": "string",
            "nullable": true
          }
        },
        "title": "BookVO"
      }
    }
  }
}
```

to

```typescript
const definitions = {
  ScheduleVO: {
    "schedules?": "IBookVo[][] | null",
    "shiftId?": "string",
    "team?": "string",
  },
  BookVO: {
    "address?": "string | null",
    "price?": "string",
  },
};
```

Secondly, it can resolve json OpenAPI 'path' to request params and response material.

These material can help you generate request function you need in your project.

Example:

- [swr-request-generator](https://github.com/teobler/swr-request-generator)

## How to use

### Install

`npm install @openapi-integration/schema-resolver`

or

`yarn add @openapi-integration/schema-resolver`

### Functional(all the usage can find in unit test code)

There are three function in this tool:

- SchemaResolver
- DefinitionsResolver
- PathResolver

#### SchemaResolver

SchemaResolver can resolve a OpenAPI schema object as its type:

```typescript
SchemaResolver.of({
  results: {},
  schema,
  key,
  parentKey,
})
  .resolve()
  .getSchemaType();
```

##### input:

- results(Record): Will assign enum resolved type to this field(will change this operation)
- schema(Schema): OpenAPI schema object
- key(string): OpenAPI schema object key name
- parentKey(string): current schema's parent key name, will use this parent key to join enum name

##### output - a string(for one field) or a json object(for record type) for resolved schema's type:

```typescript
"IBookDetailVo"
```

or

```json
{
  "authorName?": "string | null"
}
```

#### DefinitionsResolver

DefinitionsResolver can organize all resolved schema in OpenAPI.components as interface in TypeScript.

```typescript
DefinitionsResolver.of(openAPI.components)
  .scanDefinitions()
  .toDeclarations();
```

##### output:

```typescript
const definitions = DefinitionsResolver
  .of(openAPI.components)
  .scanDefinitions()
  .resolvedDefinitions;

console.log(definitions);
// {
//   AttachmentBO: {
//     "authorName?": "string",
//     "createdDate?": "number",
//     "fileName?": "string",
//     "id?": "string",
//     "mimeType?": "string",
//     "path?": "string",
//   },
// }

const interfaceStrings = DefinitionsResolver
  .of(openAPI.components)
  .scanDefinitions()
  .toDeclarations()

console.log(interfaceStrings);
// ["export interface IAttachmentBo {\n        'authorName'?: string;\n'createdDate'?: number;\n'fileName'?: string;\n'id'?: string;\n'mimeType'?: string;\n'path'?: string;\n      }",]
```

#### PathResolver

PathResolver can resolve OpenAPI.paths to object which contain all definition for request.

```typescript
PathResolver.of(openAPI.paths).resolve();
```

##### output:

resolvedPaths:
- THeader(record): request header for request
- TReq(record): request function params for request
- TResp(record | string): response type
- bodyParams(array): request body params
- pathParams(array): request path params
- queryParams(array): request query params
- formDataParams(array): request form data params
- method(string): request method
- operationId(string): request id, a unique identifier for a request
- requestBody(string): request body type name
- url(string): request url with params

```typescript
const resolvedPaths = PathResolver.of(openAPI.paths).resolve().resolvedPaths;

console.log(resolvedPaths);
// [{
//   THeader: {
//     Authorities: "string",
//     "User-Id": "string",
//     "User-Name": "string",
//   },
//   TReq: {
//     uploadAttachmentUsingPOSTRequest: {
//       attachment: "FormData",
//     },
//   },
//   TResp: "IAttachmentBo",
//   bodyParams: [],
//   formDataParams: [],
//   method: "post",
//   operationId: "uploadAttachmentUsingPOST",
//   pathParams: [],
//   queryParams: [],
//   requestBody: "uploadAttachmentUsingPOSTRequest",
//   url: "/",
// },]
```

contentType - contentType for each request:

record - key: operationId, value: contentType

```typescript
const contentType = PathResolver.of(openAPI.paths).resolve().contentType

console.log(contentType);
// {
//   UpdateBookJourneyUsingPOST: "application/json",
//   updateBookByIdUsingPUT: "application/json",
//   uploadAttachmentUsingPOST: "multipart/form-data",
//   uploadDocumentUsingPOST: "multipart/form-data",
// }
```

extraDefinitions - definitions for enum type

```typescript
const extraDefinitions = PathResolver.of(openAPI.paths).resolve().extraDefinitions;

console.log(extraDefinitions);
// {
//   "FromFrom#EnumTypeSuffix": [
//   "AAA",
//   "BBB"
// ]
// }
```

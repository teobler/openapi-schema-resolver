import { PathResolver } from "../PathResolver";
import openAPI from "./mock-data/openAPI.json";

describe("PathResolver", () => {
  it("should get resolved paths by openAPI schema", () => {
    expect(PathResolver.of((openAPI as any).paths).resolve().resolvedPaths).toEqual(expectedPathResolvedData);
  });

  it("should get correct content type for different operation id", () => {
    expect(PathResolver.of((openAPI as any).paths).resolve().contentType).toEqual(expectedContentType);
  });

  it("should get correct content type for different operation id", () => {
    expect(PathResolver.of((openAPI as any).paths).resolve().extraDefinitions).toEqual(expectedExtraDefinitions);
  });
});

const expectedPathResolvedData = [
  {
    THeader: {
      Authorities: "string",
      "User-Id": "string",
      "User-Name": "string",
    },
    TReq: {
      uploadAttachmentUsingPOSTRequest: {
        attachment: "FormData",
      },
    },
    TResp: "IAttachmentBo",
    bodyParams: [],
    formDataParams: [],
    method: "post",
    operationId: "uploadAttachmentUsingPOST",
    pathParams: [],
    queryParams: [],
    requestBody: "uploadAttachmentUsingPOSTRequest",
    url: "/",
  },
  {
    THeader: {
      Accept: "string",
    },
    TReq: {
      id: "string",
    },
    TResp: "IResource",
    bodyParams: [],
    formDataParams: [],
    method: "get",
    operationId: "downloadUsingGET",
    pathParams: ["id"],
    queryParams: [],
    url: "/${id}",
  },
  {
    THeader: {
      Authorities: "string",
      "User-Id": "string",
      "User-Name": "string",
    },
    TReq: {
      id: "string",
    },
    TResp: "",
    bodyParams: [],
    formDataParams: [],
    method: "delete",
    operationId: "deleteAttachmentUsingDELETE",
    pathParams: ["id"],
    queryParams: [],
    url: "/${id}",
  },
  {
    THeader: {},
    TReq: {
      UpdateBookJourneyUsingPOSTRequest: "IStatusFormData",
      journeyId: "string",
      journeyType: "string",
    },
    TResp: "{[key:string]:any}",
    bodyParams: [],
    formDataParams: [],
    method: "post",
    operationId: "UpdateBookJourneyUsingPOST",
    pathParams: ["journeyId", "journeyType"],
    queryParams: [],
    requestBody: "UpdateBookJourneyUsingPOSTRequest",
    url: "/book-journey/${journeyId}/${journeyType}",
  },
  {
    THeader: {},
    TReq: {
      id: "string",
    },
    TResp: "IBookDetailVo",
    bodyParams: [],
    formDataParams: [],
    method: "get",
    operationId: "findBookByIdUsingGET",
    pathParams: ["id"],
    queryParams: [],
    url: "/book/${id}",
  },
  {
    THeader: {},
    TReq: {
      id: "string",
      updateBookByIdUsingPUTRequest: "IUpdateBookRequest",
    },
    TResp: "",
    bodyParams: [],
    formDataParams: [],
    method: "put",
    operationId: "updateBookByIdUsingPUT",
    pathParams: ["id"],
    queryParams: [],
    requestBody: "updateBookByIdUsingPUTRequest",
    url: "/book/${id}",
  },
  {
    THeader: {},
    TReq: {
      "roleId?": "string",
      scheduleDate: "number",
    },
    TResp: "IScheduleVo[]",
    bodyParams: [],
    formDataParams: [],
    method: "get",
    operationId: "getScheduleDetailsByDateUsingGET",
    pathParams: [],
    queryParams: ["scheduleDate", "roleId"],
    url: "/schedules",
  },
  {
    THeader: {},
    TReq: {
      uploadDocumentUsingPOSTRequest: "IFileUploadReq",
    },
    TResp: "",
    bodyParams: [],
    formDataParams: [],
    method: "post",
    operationId: "uploadDocumentUsingPOST",
    pathParams: [],
    queryParams: [],
    requestBody: "uploadDocumentUsingPOSTRequest",
    url: "/documents",
  },
  {
    THeader: {},
    TReq: {
      documentId: "string",
      "from?": "FromFrom#EnumTypeSuffix",
    },
    TResp: "IDocumentVo",
    bodyParams: [],
    formDataParams: [],
    method: "get",
    operationId: "getDocumentByIdUsingGET",
    pathParams: ["documentId"],
    queryParams: ["from"],
    url: "/documents/${documentId}/doc",
  },
];

const expectedContentType = {
  UpdateBookJourneyUsingPOST: "application/json",
  updateBookByIdUsingPUT: "application/json",
  uploadAttachmentUsingPOST: "multipart/form-data",
  uploadDocumentUsingPOST: "multipart/form-data",
};

const expectedExtraDefinitions = {
  "FromFrom#EnumTypeSuffix": [
    "AAA",
    "BBB"
  ]
}

// import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { generateApi } from "swagger-typescript-api";

// const PATH_TO_OUTPUT_DIR  = "src/services/"
/* NOTE: all fields are optional expect one of `input`, `url`, `spec` */
generateApi({
  name: "pets.ts",
  // set to `false` to prevent the tool from writing to disk
  output: path.resolve(process.cwd(), "./src/services/pets"),
  url: "http://api.com/swagger.json",
//   input: path.resolve(process.cwd(), "./foo/swagger.json"),
  spec: {
    swagger: "2.0",
    info: {
      version: "1.0.0",
      title: "Swagger Petstore",
    },
    // ...
  },
//   templates: path.resolve(process.cwd(), "./api-templates"),
//   httpClientType: "axios", // or "fetch"
  defaultResponseAsSuccess: false,
  generateClient: true,
  generateRouteTypes: false,
  generateResponses: true,
  toJS: false,
  extractRequestParams: true,
  extractRequestBody: true,
  extractEnums: false,
//   unwrapResponseData: false,
  prettier: {
    // By default prettier config is load from your project
    printWidth: 120,
    tabWidth: 2,
    trailingComma: "all",
    parser: "typescript",
  },
//   defaultResponseType: "void",
  singleHttpClient: false,
  cleanOutput: true,
//   enumNamesAsValues: false,
//   moduleNameFirstTag: false,
  generateUnionEnums: true,
//   typePrefix: "",
//   typeSuffix: "",
//   enumKeyPrefix: "",
//   enumKeySuffix: "",
  addReadonly: false,
  sortTypes: false,
  sortRouters: false,
  extractingOptions: {
    requestBodySuffix: ["Payload", "Body", "Input"],
    requestParamsSuffix: ["Params"],
    responseBodySuffix: ["Data", "Result", "Output"],
    responseErrorSuffix: [
      "Error",
      "Fail",
      "Fails",
      "ErrorData",
      "HttpError",
      "BadResponse",
    ],
  },
  /** allow to generate extra files based with this extra templates, see more below */
  extraTemplates: [],
  anotherArrayType: false,
  fixInvalidTypeNamePrefix: "Type",
  fixInvalidEnumKeyPrefix: "Value",

  primitiveTypeConstructs: (constructs) => ({
    ...constructs,
    string: {
      "date-time": "Date",
    },
  }),

})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .then(({ files, configuration }) => {
    files.forEach(({ content, name }) => {
        console.log(name, content)
    //   fs.writeFile(path, content, ()=>{
    //     console.log(name)
    //   });
    });
  })
  .catch((e) => console.error(e));

// generateTemplates({
//   cleanOutput: false,
//   output: PATH_TO_OUTPUT_DIR,
//   httpClientType: "fetch",
//   modular: false,
//   silent: false,
//   rewrite: false,
// });
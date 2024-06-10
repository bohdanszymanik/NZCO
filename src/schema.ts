/********* THIS IS AN AUTO GENERATED FILE *********/
/* eslint-disable */
import * as path from 'path';

// prettier-ignore
export const schema = {
  /** The path to the original schema file. */
  schemaPath: path.resolve(__dirname, "schema.xml"),
  entityTypes: {
    AnalystsNotebookChart: {
      id: "CHART",
      isLink: false,
      propertyTypes: {
        "Name": { id: "CHART1", logicalType: "singleLineString", },
        "Description": { id: "CHART2", logicalType: "multipleLineString", },
      }
    },
    Company: {
      id: "ET1",
      isLink: false,
      propertyTypes: {
        "NZBN": { id: "PT1", logicalType: "singleLineString", },
        "Name": { id: "PT2", logicalType: "singleLineString", },
        "Number": { id: "PT3", logicalType: "integer", },
        "Incorporated": { id: "PT5", logicalType: "date", },
        "Type": { id: "PT6", logicalType: "singleLineString", },
      }
    },
    Person: {
      id: "ET3",
      isLink: false,
      propertyTypes: {
        "name": { id: "PT4", logicalType: "singleLineString", },
        "firstName": { id: "PT7", logicalType: "singleLineString", },
        "roleType": { id: "PT8", logicalType: "singleLineString", },
        "status": { id: "PT9", logicalType: "singleLineString", },
        "physicalAddress": { id: "PT10", logicalType: "singleLineString", },
      }
    },
  },
  linkTypes: {
    DirectorCompany: {
      id: "LT1",
      isLink: true,
      propertyTypes: {

      }
    },
  }
} as const;

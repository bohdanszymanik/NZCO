/*!
 * i2, i2 Group, the i2 Group logo, and i2group.com are trademarks of N.Harris Computer Corporation.
 * © N.Harris Computer Corporation (2023)
 * SPDX-License-Identifier: MIT
 */

import {
  addService,
  // DetailedError,
  createLogger,
  records,
  services,
  startConnector
} from '@i2analyze/i2connect';

import {logger} from "./globals";

import {addCompanyService} from "./company";

// logger.info("I am a log from index.ts");
// logger.warn("I am a warn log from index.js with a json object:", {foo: "bar"});

const i2Logger = createLogger('i2Logger')
// i2Logger.debug('debug log')
// i2Logger.info("i2Logger Info log")
// i2Logger.warn("i2Logger Warn log")
// i2Logger.error("i2Logger Error log")

// import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
// import * as jwt from 'jsonwebtoken';
import {
  Company,
  Person,
  requestNZBN
} from './data-access';


import {userInfo} from 'os';
import {schema as exampleSchema} from './schema';

const {
  Person,
  Company
} = exampleSchema.entityTypes;

const {DirectorCompany} = exampleSchema.linkTypes;

const wildcardSearchTerm = '%';
const nameContainsSearchCondition = {
  label: 'Name contains',
  isMandatory: true,
  logicalType: 'singleLineString',
  defaultValue: wildcardSearchTerm,
} as const

const idQueryCondition = {
  label: 'Id =',
  isMandatory: true,
  logicalType: 'singleLineString',
  defaultValue: '',
} as const


/**
 * Extracts identifiers from the keys of connected seeds
 * @param connectorKeys - The connector keys to query
 * @returns The set of data identifiers from connected sources
 */
function extractIdsFromConnectorKeys(connectorKeys: readonly records.IConnectorKey[]) {
  const ids = connectorKeys.map((connectorKey) => connectorKey.id);
  return new Set(ids);
}

const NZCOSourceReference = {
  name: 'NZCO',
  type: 'Intelligence',
  description: 'NZ Companies Office Register'
}

/*
NZCO
*/

/**
 * Adds a company to the result object and sets properties to a Company record using the external data.
 * @param company - The company data from the external source.
 * @param result - The Result object.
 * @param idFactory - An optional identifier factory.
 * @param id - The id of the company.
 */
function addCompanyToResult(
  company: Company,
  result: services.IResult,
  idFactory: (id: string) => records.ResultRecordIdType = (id) => id
) {

  const {NAME} = company

  console.log(requestNZBN({'search-term': 'bs%consult'}))

  const resultEntity = result.addEntity(Company, 'abcdef')

  resultEntity.setProperties({
    'Name': NAME
  })

  resultEntity.setSourceReference(NZCOSourceReference)

  return resultEntity;

}


/**
 * Adds a person to the result object and sets properties to a Person record using the external data.
 * @param person - The person data from the external source.
 * @param result - The Result object.
 * @param idFactory - An optional identifier factory.
 * @param id - The id of the person.
 */
function addPersonToResult(
  person: Person,
  result: services.IResult,
  idFactory: (id: string) => records.ResultRecordIdType = (id) => id
) {
  const {name,
    firstName} = person

  const id = idFactory(`p${person.id}`)
  const resultEntity = result.addEntity(Person, id)

  resultEntity.setProperties({
    'name': name
  })

  resultEntity.setSourceReference(NZCOSourceReference)

  return resultEntity;
}

// /**
//  * Adds the link between an organisation and a person
//  * @param orgFrom - The person data from the external source.
//  * @param personTo - The person data from the external source.
//  * @param result - The Result object.
//  * @param id - The id of the link.
//  */
// function addOrgPersonLinkToResult(
//   sourceOrg: records.IResultEntityRecord,
//   targetPerson: records.IResultEntityRecord,
//   linkName: string,
//   result: services.IResult,
//   id: string) {

//   const resultLink = result.addLink(Link, id, sourceOrg, targetPerson)

//   resultLink?.setProperty('LinkCode', linkName)

//   return resultLink
// }



addCompanyService()



addService(
  {
    id: 'personSearch',
    name: 'Person',
    description: `Search people in the Companies Register by searching on name text`,
    hasPersistentResultIds: true,
    resultItemTypes: [Person],
    form: {
      nameCriteria: {
        label: 'Name contains',
        isMandatory: false,
        logicalType: 'singleLineString',
        defaultValue: '',
        formIsMandatory: true,
      }
    },
  },
  ({conditions: {nameCriteria}, result}) => {

    if (nameCriteria !== undefined) {
      logger.info(`person search, criteria:${nameCriteria}, user:${userInfo().username}, ${(new Date()).toISOString()}`)

      const p1 = result.addEntity(Person, 'some person id')
      p1.setProperty("name", "some name")
      p1.setProperty("firstName", "some first name")

      // const data = getPeopleByNameFragment(nameCriteria)

      // data.forEach(function (item: Person) {
      //   item.id = item.firstName
      //   addPersonToResult(item, result)
      // })

    } else {
      // what now!
    }
  }
)



startConnector({
  schemas: {
    connector: {
      ...exampleSchema,
      schemaShortName: 'NZCO Connector',
    },
  },
  hasPersistentResultIds: true,
})






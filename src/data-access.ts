import {settings} from '@i2analyze/i2connect';
// import fetch from 'node-fetch';
import {URL} from 'url';

import exp = require('constants');


// logger.info("I am a log from index.ts");
// logger.warn("I am a warn log from index.js with a json object:", {foo: "bar"});


export interface Person {
  id: string;
  readonly name: string;
  readonly firstName: string;
  readonly roleType: string;
  readonly status: string;
  readonly physicalAddress: string;
  readonly kind: 'person'
}

export type NZBNEntityLink = {
  rel: string;
  href: string;
  methods: string[]
}

export type NZBNEntity = {
  entityStatusCode: number;
  entityName: string;
  nzbn: number;
  entityTypeCode: string;
  entityTypeDescription: string;
  entityStatusDescription: string;
  tradingNames: any[];
  classifications: any[];
  previousEntityNames: string[];
  registrationDate: string;
  sourceRegisterUniqueId: number;
  links: NZBNEntityLink[]
}

export type NZBN = {
  pageSize: number;
  page: number;
  totalItems: number;
  sortBy: any;
  sortOrder: any;
  items: NZBNEntity[]
}

export interface Company {
  id: string;
  readonly NAME: string;
  readonly NZBN: string;
  readonly NUMBER: string;
  readonly INCORPORATED: string;
  readonly TYPE: string;
  readonly kind: 'org'
}


export type Entities = Person | Company

/**
 * Queries Company Office  to find all people linked to a organisation.
 * @param orgId - The id of the org.
 * @returns The linked people.
 */
// export function getOrgLinkedPeople(orgId: string): LinkedPerson[] {
// }

// thinking of ways of splitting on different linked entity types
// ie for discriminated union
export type LDEP = {
  entityType: Person
  linkId: string
  linkName: string
}

export type LDEC = {
  entityType: Company
  linkId: string
  linkName: string
}

export type LDE = LDEP | LDEC


const baseUrl = settings.getString('nzbnUrl', true);
const token = settings.getString('nzbnToken', true);

// export interface NZBN {
//   readonly entityStatusCode: string;
//   readonly entityName: string;
//   readonly nzbn: string;
//   readonly entityTypeCode: string;
//   readonly entityTypeDescription: string;
//   readonly entityStatusDescription: string;
// }

/**
 * Request some data from the Companies Office NZBN service
 *
 * @param queryParams - The NZBN parameters request object which will be encoded in to the query parameters
 *
 */
export async function requestNZBN(queryParams: Record<string, string>): Promise<NZBN> {
  const url = new URL(baseUrl);

  for (const [key, value] of Object.entries(queryParams)) {
    url.searchParams.append(key, value);
  }

  console.log(`url=${url}`)

  const response = await fetch(url.href, {
    method: "GET",
    mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Ocp-Apim-Subscription-Key": token //"b65d8a28768041b9b025d59ab3b02a36"
      // "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
    // redirect: "follow", // manual, *follow, error
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  if (response.ok) {
    console.log("got 200")
    console.log('await Response json after ok response cast to NZBN[]')
    const nzbnResults = (await response.json()) as NZBN
    console.log(`nzbnResults: ${nzbnResults}`)
    console.log('done')
    // return (await response.json()) as NZBN[];
    return nzbnResults
  } else {
    throw new Error(response.statusText);
  }
}


export function getCompaniesByNameFragment(nameFrag: string): Company[] {
  return []
}




import {settings} from '@i2analyze/i2connect';
import fetch from 'node-fetch';
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
const token = settings.getString('nzbnToken');

export interface NZBNDto {
  readonly entityStatusCode: string;
  readonly entityName: string;
  readonly nzbn: string;
  readonly entityTypeCode: string;
  readonly entityTypeDescription: string;
  readonly entityStatusDescription: string;
}

/**
 * Request some data from the Companies Office NZBN service
 *
 * @param queryParams - The NZBN parameters request object which will be encoded in to the query parameters
 *
 */
export async function requestNZBN(queryParams: Record<string, string>): Promise<INZBNDto[]> {
  const url = new URL(baseUrl);

  for (const [key, value] of Object.entries(queryParams)) {
    url.searchParams.append(key, value);
  }

  // Append the token value if it exists.
  if (token) {
    url.searchParams.append('$$app_token', token);
  }

  const response = await fetch(url.href);
  if (response.status === 200) {
    return (await response.json()) as IComplaintDto[];
  } else {
    throw new Error(response.statusText);
  }
}


export function getCompaniesByNameFragment(nameFrag: string): Company[] {

}




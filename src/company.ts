import {addService} from '@i2analyze/i2connect';
import {userInfo} from 'os';
import {requestNZBN} from './data-access';
import {logger} from "./globals";
import {schema} from './schema';

function addCompanyToResult(name: string, nzbn: string, result: any) {
  console.log(nzbn)
  const b1 = result.addEntity(schema.entityTypes.Company, name)
  b1.setProperty("Name", name)
  b1.setProperty("NZBN", nzbn)
}


export function addCompanyService(this: any) {
  addService(
    {
      id: 'companySearch',
      name: 'Company',
      description: `Search companies in the Companies Register by searching on name text`,
      hasPersistentResultIds: true,
      // resultItemTypes: [Company],
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
    async ({conditions: {nameCriteria}, result}) => {

      if (nameCriteria !== undefined) {
        logger.info(`company search, criteria:${nameCriteria}, user:${userInfo().username}, ${(new Date()).toISOString()}`)

        // requestNZBN({'search-term': 'bs%consult'}).then((data) => {console.log(data)})

        const nzbnResult = await requestNZBN({'search-term': 'bs%consult'})
        console.log(`nzbnResult: ${nzbnResult}`)

        for (const b of nzbnResult.items) {
          addCompanyToResult(b.entityName, b.nzbn.toString(), result)
        }

        const n1 = [1, 2, 3]
        console.log(n1)
        n1.forEach(function (n) {console.log(n)})

        const c1 = result.addEntity(schema.entityTypes.Company, 'some company id')
        c1.setProperty("Name", "some name")
        c1.setProperty("NZBN", "abcdef123")

        // const data = getCompaniesByNameFragment(nameCriteria)

        // data.forEach(function (item: Company) {
        //   item.id = item.NZBN
        //   addCompanyToResult(item, result)
        // })

      } else {
        // what now!
      }
    }
  )

}

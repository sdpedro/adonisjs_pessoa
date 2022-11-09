import Database, { DatabaseContract } from '@ioc:Adonis/Lucid/Database'

/**
  * @swagger
  * components:
  *   schemas:
  *     PeopleAddressRepo:
  *       type: object
  *       properties:
  *         name:
  *           type: string
  *         last_name:
  *           type: string
  *         document:
  *           type: string
  *         zip_code:
  *           type: string
  *         street:
  *           type: string
  *         district:
  *           type: string
  *         uf:
  *           type: string
  */
export default class PeopleAddressRepo {
  public async query (): Promise<DatabaseContract[]> {
    const result = await Database
      .query()
      .from('people as A')
      .leftJoin('addresses as B', 'B.id', '=', 'A.address_id')
      .select(
        'A.name',
        'A.last_name',
        'A.document',
        'B.zip_code',
        'B.street',
        'B.district',
        'B.uf'
      )
    return result
  }
}

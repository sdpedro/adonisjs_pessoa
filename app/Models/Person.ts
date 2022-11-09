import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'

/**
 * @swagger
 * components:
 *  schemas:
 *    Person:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        name:
 *          type: string
 *        last_name:
 *          type: string
 *        document:
 *          type: string
 *        address_id:
 *          type: number
 *        createdAt:
 *          type: DateTime
 *        dateTime:
 *          type: DateTime
 */
export default class Person extends BaseModel {
  public static table = 'people'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public last_name: string

  @column()
  public document: string

  @column()
  public addressId: number | null

  @hasOne(() => Address)
  public address: HasOne<typeof Address>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

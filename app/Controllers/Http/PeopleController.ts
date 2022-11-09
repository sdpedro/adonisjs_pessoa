import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePerson from 'App/Validators/PeopleCreateValidator'
import PeopleService from 'App/Services/PeopleService'
import {inject} from '@adonisjs/fold'

@inject()
export default class PeopleController {
  constructor (private readonly peopleService: PeopleService) {}

  /**
		* @swagger
		* /api/people:
		*   get:
		*     tags:
		*       - Pessoas
		*     produces:
		*       - application/json
		*     responses:
		*       200:
		*         content:
		*           application/json:
		*             schema:
		*               $ref: '#/components/schemas/PeopleAddressRepo'
		*/
  public async index ({ response }: HttpContextContract) {
    try {
      const people = await this.peopleService.findAll()
      response.send({ people: people })
    } catch (error) {
      console.log(error)
      response.status(500)
      response.send({ error: error.message })
    }
  }

  /**
		* @swagger
		* /api/people:
		*   post:
    *     description: cadastra pessoa e o endereço
		*     tags:
		*       - Pessoas
    *     parameters:
    *       - name: name
    *         in: body
    *         type: string
    *         required: true
    *       - name: last_name
    *         in: body
    *         type: string
    *         required: true
    *       - name: document
    *         in: body
    *         type: string
    *         required: true
    *       - name: zip_code
    *         in: body
    *         type: string
    *         required: true
		*     produces:
		*       - application/json
		*     responses:
		*       200:
		*         content:
		*           application/json:
		*             schema:
		*               $ref: '#/components/schemas/Person'
		*/
  public async store ({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreatePerson)
    try {
      let person = await this.peopleService.generate(payload)
      response.status(200)
      response.send(person)
    } catch (error) {
      response.status(500)
      response.send({ error: error.message })
    }
  }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {
  public async notFound ({ response }: HttpContextContract) {
    response.status(404)
    response.send({ error: 'Page not found' })
  }
}

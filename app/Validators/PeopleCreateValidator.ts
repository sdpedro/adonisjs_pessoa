import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PeopleCreateValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.maxLength(80),
    ]),
    last_name: schema.string([
      rules.maxLength(80),
    ]),
    document: schema.string([
      rules.minLength(11),
      rules.maxLength(11),
    ]),
    zip_code: schema.string([
      rules.minLength(8),
      rules.maxLength(8),
    ]),
  })

  public messages: CustomMessages = {
    required: 'O campo {{ field }} é obrigatorio!',
    'document.minLength': 'Documento menor que 11 caracteres',
    'document.maxLength': 'Documento maior que 11 caracteres',
    'zip_code.minLength': 'CEP menor que 8 caracteres',
    'zip_code.maxLength': 'CEP maior que 8 caracteres',
  }
}

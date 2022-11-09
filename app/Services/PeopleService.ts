import Person from 'App/Models/Person'
import CreatePersonDto from 'App/Dtos/CreatePersonDto'
import {inject} from '@adonisjs/fold'
import ViaCepService from './ViaCepService'
import ResultRequestViaCepDto from 'App/Dtos/ResultRequestViaCepDto'
import Address from 'App/Models/Address'
import PeopleAddressRepo from 'App/Repos/PeopleAddressRepo'

@inject()
export default class PeopleService {
  constructor (
    private readonly viaCepService: ViaCepService,
    private readonly peopleAddressRepo: PeopleAddressRepo
  ) {}

  public async findAll (): Promise<PeopleAddressRepo[]> {
    const list = await this.peopleAddressRepo.query()
    return list
  }

  public async generate (payload: CreatePersonDto): Promise<Person|null> {
    const address = await this.generateAddress(payload.zip_code)
    const persolModel = await Person.create({
      name: payload.name,
      last_name: payload.last_name,
      document: payload.document,
      addressId: address,
    })
    return persolModel.$isPersisted ?
      persolModel :
      null
  }

  private async getZipCode (zipCode: string): Promise<ResultRequestViaCepDto> {
    return await this.viaCepService.addressByZipCode(zipCode)
  }

  private async generateAddress (zipCode: string): Promise<number|null> {
    if (!zipCode) {
      return null
    }
    const payloadAddress = await this.getZipCode(zipCode)
    if (payloadAddress.cep === '') {
      return null
    }
    const AddressModel = await Address.create({
      zip_code: payloadAddress.cep.replace(/[^0-9]/g,''),
      street: payloadAddress.logradouro,
      district: payloadAddress.bairro,
      uf: payloadAddress.uf,
    })
    return AddressModel.$isPersisted ?
      AddressModel.id :
      null
  }
}

import ResultRequestViaCepDto from 'App/Dtos/ResultRequestViaCepDto'
import axios from 'axios'

export default class ViaCepService {
  private readonly URL = 'https://viacep.com.br/ws/##ZIP_CODE##/json/'

  public async addressByZipCode (zipCode: string): Promise<ResultRequestViaCepDto> {
    const url = this.URL.replace('##ZIP_CODE##', zipCode)
    try {
      const result = await axios.get(url)
      return result.data
    } catch (error) {
      console.log(error)
      return {
        cep: '',
        logradouro: '',
        complemento: '',
        bairro: '',
        localidade: '',
        uf: '',
        ibge: '',
        gia: '',
        ddd: '',
        siafi: '',
      }
    }
  }
}

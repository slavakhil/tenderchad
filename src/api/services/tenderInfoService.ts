import axios from 'axios';
import { IDocument, ITender } from '../../types/models';
import { $api } from '../http';

export default class TenderInfoService {
  static async getTenderInfo(number: string) {
    const infoTender = await $api
      .get(`${process.env.REACT_APP_API_URL}/tender-info`, {
        params: {
          number: number,
        },
      })
      .then((res) => res.data);
    const docsTender = await $api
      .get<IDocument[]>(`${process.env.REACT_APP_API_URL}/tender-docs`, {
        params: {
          number: number,
        },
      })
      .then((res) => res.data);
    const info: ITender = {
      ...infoTender,
      documents: docsTender,
    };
    return info;
  }
  static async getTenderInfoAndDocs(number: string) {
    return await $api
      .get<ITender>(`${process.env.REACT_APP_API_URL}/tender-info-and-docs`, {
        params: {
          number: number,
        },
      })
      .then((res) => res.data);
  }
}

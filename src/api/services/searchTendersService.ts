import axios from 'axios';
import { ITechsAndSuppliers, ITendersList } from '../../types/models';
import { suppliers, tags } from '../../data';
import { $api } from '../http';
import { setErrorServerMessage } from '../../store/errors';

export default class SearchTendersService {
  static async getTechsAndSuppliers() {
    return await $api
      .get<ITechsAndSuppliers>(
        `${process.env.REACT_APP_API_URL}/get-techs-and-suppliers`,
      )
      .then((res) => {
        if (res.status === 204) {
          setErrorServerMessage(true);
          return {
            suppliers: [],
            techs: [],
          };
        } else return res.data;
      });
  }

  static async getSuppliers() {
    return await axios
      .get(`${process.env.REACT_APP_API_URL}/get-suppliers/`)
      .then((res) => res.data);
    //.catch(() => suppliers);
  }

  static async getTenderList(params: URLSearchParams) {
    const request = {
      params: params,
    };
    return await $api
      .get<ITendersList>(`${process.env.REACT_APP_API_URL}/search`, request)
      .then((res) => {
        if (res.status === 204)
          return {
            length: 0,
            data: [],
            isRelevance: false,
            status: 'NOCONTENT',
          };
        else
          return {
            length: res.data.length,
            data: res.data.data,
            isRelevance: false,
          };
      });
  }

  static async getAnalysysTenderList(params: URLSearchParams) {
    const request = {
      params: params,
    };

    const key = await $api
      .get(`${process.env.REACT_APP_API_URL}/analysis`, request)
      .then((res) => res)
      .catch((er) => {
        return er.response.status;
      });

    if (key.status === 204) {
      return {
        link: '',
        length: 0,
        data: [],
        isRelevance: false,
        status: 'NOCONTENT',
      };
    }
    if (key === 429) {
      return {
        link: '',
        length: 0,
        data: [],
        isRelevance: false,
        status: 'LIMITATION',
      };
    }

    const checkStatus = async (): Promise<string> => {
      const statusPromise = await $api
        .get<string>(`${process.env.REACT_APP_API_URL}/status?id=${key.data}`)
        .then((res) => res.data);

      if (statusPromise === 'SUCCESS') {
        return statusPromise;
      } else if (statusPromise === 'FAILURE') {
        return 'FAILURE';
      } else
        return new Promise<string>((resolve) => {
          setTimeout(async () => {
            resolve(await checkStatus());
          }, 5000);
        });
    };

    const status = await checkStatus();

    if (status === 'FAILURE') {
      return {
        link: '',
        length: 0,
        data: [],
        isRelevance: false,
        status: 'FAILURE',
      };
    }

    return await $api
      .get<ITendersList>(
        `${process.env.REACT_APP_API_URL}/result?id=${key.data}`,
      )
      .then((res) => {
        console.log(res);
        return {
          link: res.data.link,
          length: res.data.length,
          data: res.data.data,
          isRelevance: true,
        };
      });
  }
}

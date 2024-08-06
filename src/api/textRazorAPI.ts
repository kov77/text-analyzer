import axios, {AxiosResponse} from "axios";
import {TextRazorApiResponse} from "../types/textRazor";

const API_KEY = "13e757697a1b97498c8903d61079d0f2059a01dba5b35cfd336393ad";

export const processText = (text: string): Promise<AxiosResponse<TextRazorApiResponse, any>> => {
  const data = {
    extractors: 'entities',
    text: text
  };

  const response = axios.post<TextRazorApiResponse>('/', new URLSearchParams(data), {
    headers: {
      'x-textrazor-key': API_KEY,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  return response
};



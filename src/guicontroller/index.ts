import axios from "axios";
import { MediumArticle, RequestOptions } from "../model";
import { config as inputConfig } from "../config";

const config = inputConfig.mediumRequest;

let request: RequestOptions = {
  method: config.method,
  url: "",
  headers: config.headers,
};

const fetchMediumData = async (options: RequestOptions) => {
  const res = await axios.request(options);
  return res.data;
};

const getUserId = async (mediumUsername: string) => {
  request.url = "https://medium2.p.rapidapi.com/user/id_for/" + mediumUsername;
  const data = await fetchMediumData(request);
  return data.id;
};

export const getArticlesIds = async (mediumUsername: string) => {
  const userId = await getUserId(mediumUsername);

  request.url = "https://medium2.p.rapidapi.com/user/" + userId + "/articles";
  const data = await fetchMediumData(request);
  return data.associated_articles;
};

export const getArtcileInfo = async (articleId: string) => {
  request.url = "https://medium2.p.rapidapi.com/article/" + articleId;
  const data = await fetchMediumData(request);
  return data;
};

export const getArtcileMarkdown = async (articleId: string) => {
  request.url =
    "https://medium2.p.rapidapi.com/article/" + articleId + "/markdown";
  const data = await fetchMediumData(request);
  return data.markdown;
};

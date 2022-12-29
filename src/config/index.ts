import { MEDIUM_KEY } from "./keys";

export let config = {
  appName: "medium-to-subsocial",
  substrateNodeUrl: `wss://rco-para.subsocial.network`,
  ipfsNodeUrl: `https://ipfs.infura.io:5001`,
  ipfs: {
    host: "ipfs.infura.io",
    ipfsUrl: "https://graphenet-test.infura-ipfs.io",
    port: 5001,
    protocol: "https",
    timeout: 10000,
  },
  mediumRequest: {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": MEDIUM_KEY,
      "X-RapidAPI-Host": "medium2.p.rapidapi.com",
    },
  },
};

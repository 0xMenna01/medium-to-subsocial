import axios from "axios";
import CID from "cids";
import { create } from "ipfs-http-client";
import { INFURA_ID, INFURA_SECRET_KEY } from "../config/keys";

type IpfsConfig = {
  host: string;
  ipfsUrl: string;
  port: number;
  protocol: string;
  timeout?: number;
};

export class IpfsConnect {
  private client: import("ipfs-http-client/src/types").IPFSHTTPClient;
  private ipfsUrl: string;

  constructor(config: IpfsConfig) {
    this.ipfsUrl = config.ipfsUrl;

    const auth =
      "Basic " +
      Buffer.from(INFURA_ID + ":" + INFURA_SECRET_KEY).toString("base64");

    this.client = create({
      host: config.host,
      port: config.port,
      protocol: config.protocol,
      timeout: config?.timeout,
      headers: {
        authorization: auth,
      },
    });
  }

  saveContent = async (data: any) => {
    const json = JSON.stringify(data);
    const content = await this.client.add(json);
    const cid = await this.client.pin.add(content.cid);
    return cid.toString();
  };

  getContent = async (contentId: string) => {
    const cid = new CID(contentId);
    const cidV0 = cid.toV0();

    const url = `${this.ipfsUrl}/ipfs/${cidV0}`;
    const res = await axios.get(url);
    return res.data;
  };

  loadContent = (contentId: string) => {
    const cid = new CID(contentId);
    const cidV0 = cid.toV0();
    return cidV0 ? `${this.ipfsUrl}/ipfs/${cidV0}` : "";
  };
}

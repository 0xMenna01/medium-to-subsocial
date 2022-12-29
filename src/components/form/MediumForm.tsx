import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Input,
  Box,
} from "@chakra-ui/react";

import { MediumArticle } from "../../model";
import { MainButton } from "../button/MainButton";
import { useState } from "react";
import {
  getArtcileInfo,
  getArtcileMarkdown,
  getArticlesIds,
} from "../../guicontroller";
import { useAccount, useApi, useTransaction } from "../../contexts";
import { IpfsContent } from "@subsocial/api/substrate/wrappers";
import { TransactionModal } from "../transaction-modal/TransactionModal";

export const MediumForm = () => {
  const [userName, setUsername] = useState("");

  const { api, substrateApi } = useApi();
  const { account } = useAccount();
  const { send, setTx } = useTransaction();

  const fetchAndUpdate = async () => {
    send(true);
    const data = await getArticlesIds(userName);
    const article: MediumArticle = await getArtcileInfo(data[0]);
    article.content = await getArtcileMarkdown(article.id);
    const cid = await api.ipfs.saveContent(article);

    const spaceId = "1040"; // The space in which you're posting.
    const postTransaction = substrateApi.tx.posts.createPost(
      spaceId,
      { RegularPost: null }, // Creates a regular post.
      IpfsContent(cid)
    );

    setTx(postTransaction);
  };

  return (
    <Card margin="auto">
      <CardHeader>
        <Heading size="lg"> Update your Medium articles to Subsocial</Heading>
        <Heading size="sm" margin="10px">
          Input your Medium username
        </Heading>
      </CardHeader>
      <CardBody>
        <Input
          padding="20px"
          background="main"
          placeholder="Username"
          borderColor="main"
          focusBorderColor={"hover"}
          _hover={{ borderColor: "hover" }}
          onChange={(event) => setUsername(event.target.value)}
        />
      </CardBody>
      <CardFooter>
        <Box w="100%" display="flex" justifyContent="center">
          <TransactionModal>
            <MainButton text="Update Article" onClick={fetchAndUpdate} />
          </TransactionModal>
        </Box>
      </CardFooter>
    </Card>
  );
};

import React, { createContext, useContext, useEffect, useState } from "react";
import { MediumArticle } from "../model";

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  posts: MediumArticle[];
  updatePosts: (posts: MediumArticle[]) => void;
};
export const PostsContext = createContext<ContextType>({
  posts: [] as MediumArticle[],
  updatePosts: () => {},
});

export const PostsProvider = ({ children }: Props) => {
  const [posts, updatePosts] = useState<MediumArticle[]>([]);

  return (
    <PostsContext.Provider value={{ posts, updatePosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export function usePosts() {
  return useContext(PostsContext);
}

import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { User } from "./types";

type UserCardProps = {
  user: User;
  getPosts: (id: number) => void;
  posts: number;
  postsIsLoading: boolean;
};

const Posts = styled.p<{ isShown: boolean; postsIsLoading: boolean }>`
  color: red;
  margin: 0;
  margin-left: auto;
  font-size: 14px;
  transition: 0.4s ease-in-out;
  opacity: ${({ isShown, postsIsLoading }) =>
    isShown && !postsIsLoading ? "100%" : "0"};
`;

const ActivityIcon = styled.div<{ isActive: string }>`
  background-color: ${({ isActive }) =>
    isActive === "active" ? "green" : "red"};
  height: 10px;
  width: 10px;
  border-radius: 50%;
`;

export const UserCard = React.forwardRef<any, UserCardProps>(
  ({ user, getPosts, posts, postsIsLoading,}, ref): ReactElement => {
    const [isShown, setIsShown] = useState(false);
    const onEmailHover = () => {
      getPosts(user.id);
      setIsShown(true);
    };
    const onEmailLeave = () => {
      setIsShown(false);
    }
    return (
      <>
        <span>{user.name}</span>
        <span
          onMouseEnter={() => onEmailHover()}
          onMouseLeave={() => onEmailLeave()}
        >
          <a href="#">{user.email}</a>
        </span>
        <span>{user.gender}</span>
        <span>
          <ActivityIcon isActive={user.status} />
        </span>
        <span ref={ref}>
          <Posts isShown={isShown} postsIsLoading={postsIsLoading}>
            {posts}
          </Posts>
        </span>
      </>
    );
  }
);

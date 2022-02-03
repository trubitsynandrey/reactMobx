import { ReactElement, useState } from "react";
import styled from "styled-components";
import { User } from "./types";

type UserCardProps = {
  user: User;
  getPosts: (id: number) => void;
  posts: any;
};

const Posts = styled.p<{ isShown: boolean }>`
  color: red;
  margin: 0;
  margin-left: auto;
  font-size: 14px;
  transition: 0.3s ease-in-out;
  opacity: ${({ isShown }) => (isShown ? "100%" : "0")};
`;

export const UserCard = ({
  user,
  getPosts,
  posts,
}: UserCardProps): ReactElement => {
  const [isShown, setIsShown] = useState(false);
  const onEmailHover = () => {
    setIsShown(true);
    getPosts(user.id);
  };
  return (
    <>
      <span>{user.name}</span>
      <span
        onMouseEnter={() => onEmailHover()}
        onMouseLeave={() => setIsShown(false)}
      >
        <a href="#">{user.email}</a>
      </span>
      <span>{user.gender}</span>
      <span>{user.status}</span>
      <span>
        {isShown && (
          <Posts isShown={isShown}>{posts}</Posts>
        )}
      </span>
    </>
  );
};

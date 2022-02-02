import { ReactElement, useState } from "react";
import styled from "styled-components";
import { User } from "./types";

type UserCardProps = {
  user: User;
  getPosts:  (id: number) => void;
  posts: any;
};
const Card = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  border: 2px dashed #0260e8;
  border-radius: 5px;
  @media (max-width: 430px) {
    padding: 5px;
  }
`;

const CardField = styled.div`
  margin: 0;
  margin-bottom: 10px;
  color: #052555;
  & span {
    color: #5199ff;
  }
  &:last-child {
    margin-bottom: 0px;
  }
`;

const CardFieldName = styled(CardField)`
  display: flex;
`;

const CardFieldEmail = styled(CardField)`
`;

const Posts = styled.div<{ isShown: boolean }>`
  color: red;
  margin: 0;
  margin-left: auto;
  font-size: 14px;
  transition: 0.3s ease-in-out;
  opacity: ${({ isShown }) => (isShown ? "100%" : "0")};
`;

export const UserCard = ({ user, getPosts, posts }: UserCardProps): ReactElement => {
  const [isShown, setIsShown] = useState(false);
  const onEmailHover = () => {
    setIsShown(true)
    getPosts(user.id)
  }
  return (
    <Card>
      <CardFieldName>
        <span>name: </span>
        {user.name}
        <Posts isShown={isShown}>Posts: {posts}</Posts>
      </CardFieldName>
      <CardFieldEmail
        onMouseEnter={() => onEmailHover()}
        onMouseLeave={() => setIsShown(false)}
      >
        <span>email: </span>
        {user.email}
      </CardFieldEmail>
      <CardField>
        <span>gender: </span>
        {user.gender}
      </CardField>
      <CardField>
        <span>status: </span>
        {user.status}
      </CardField>
    </Card>
  );
};

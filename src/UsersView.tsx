import { observer } from "mobx-react-lite";
import { ReactElement, useEffect } from "react";
import { dataStorage } from "./dataStorage";
import styled from "styled-components";
import { UserCard } from "./UserCard.tsx";

type UsersViewProps = {
  dataStorage: dataStorage;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
`

const Container = styled.div`
  display: grid;
  max-width: 1200px;
  grid-template-columns: repeat(2, 1fr) 0.5fr 0.5fr 0.2fr;
  border-top: 1px solid black;
  border-right: 1px solid black;
  & > span {
    padding: 8px 4px;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
  }
`;


const User = styled.li`
  list-style: none;
`;

export const UsersView = observer(
  ({ dataStorage }: UsersViewProps): ReactElement => {
    useEffect(() => {
      dataStorage.getUsers();
    }, []);

    if (dataStorage.isLoading) {
      return <h2>Loading...</h2>
    }

    return (
      <Wrapper>
        {!dataStorage.isLoading && (<Container>
          <span>Name</span>
          <span>Email</span>
          <span>Gender</span>
          <span>Status</span>
          <span>Posts</span>
          {dataStorage.usersData &&
            dataStorage.usersData.map((item) => (
              <UserCard
                key={item.id}
                user={item}
                getPosts={dataStorage.getUserPost}
                posts={dataStorage.userPosts}
              />
            ))}
        </Container>)}
      </Wrapper>
    );
  }
);

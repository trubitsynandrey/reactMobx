import { observer } from "mobx-react-lite";
import { ReactElement, useEffect, useRef, useCallback, useState } from "react";
import { dataStorage } from "./dataStorage";
import styled from "styled-components";
import { UserCard } from "./UserCard.tsx";

type UsersViewProps = {
  dataStorage: dataStorage;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
`;

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

export const UsersView = observer(
  ({ dataStorage }: UsersViewProps): ReactElement => {
    const isLoading = dataStorage.isLoading;
    const [pageNumber, setPageNumber] = useState(1);
    const watcher = useRef<IntersectionObserver>(null);
    const lastUserRef = useCallback((node) => {
      if (isLoading) return;
      if (watcher.current) watcher.current.disconnect()
      watcher.current = new IntersectionObserver( entries => {
        if (entries[0].isIntersecting) {
          setPageNumber(prevPageNumber => prevPageNumber + 1)
        }
      })
      if (node) watcher.current.observe(node)
    }, [isLoading]);

    useEffect(() => {
      dataStorage.getUsers(pageNumber);
    }, [pageNumber]);

    return (
      <Wrapper>
          <Container>
            <span>Name</span>
            <span>Email</span>
            <span>Gender</span>
            <span>Status</span>
            <span>Posts</span>
            {dataStorage.usersData.map((user, index) => {
              if (dataStorage.usersData.length === index + 1) {
                return (
                    <UserCard  
                      ref={lastUserRef}
                      key={user.id}
                      user={user}
                      getPosts={dataStorage.getUserPost}
                      posts={dataStorage.userPosts}
                    />
                );
              } else {
                return (
                  <UserCard
                    key={user.id}
                    user={user}
                    getPosts={dataStorage.getUserPost}
                    posts={dataStorage.userPosts}
                  />
                );
              }
            })}
          </Container>
          {isLoading && <h2>the content is loading...</h2>}
      </Wrapper>
    );
  }
);

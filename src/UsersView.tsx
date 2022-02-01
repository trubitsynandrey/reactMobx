import { observer } from "mobx-react-lite";
import { ReactElement, useEffect } from "react";
import { dataStorage } from "./dataStorage";
import styled from "styled-components";
import { UserCard } from "./UserCard.tsx";

type UsersViewProps = {
  dataStorage: dataStorage;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const UsersList = styled.ul`
  padding: 0px;
  width: 100%;
  display: grid;
  padding-right: 10%;
  padding-left: 10%;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  @media (max-width: 600px) {
    padding-left: 10%;
    padding-right: 0;
  }
  @media (max-width: 430px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const User = styled.li`
  list-style: none;
`

export const UsersView = observer(
  ({ dataStorage }: UsersViewProps): ReactElement => {
    useEffect(() => {
      dataStorage.getUsers();
    }, []);

    return (
      <>
        <Container>
          <UsersList>
            {dataStorage.usersData &&
              dataStorage.usersData.map((item) => (
                <UserCard key={item.id} user={item} />
              ))}
          </UsersList>
        </Container>
      </>
    );
  }
);

import { observer } from "mobx-react-lite";
import { ReactElement, useEffect } from "react";
import { dataStorage } from "./dataStorage";

type UsersViewProps = {
  dataStorage: dataStorage;
};

export const UsersView = observer(
  ({ dataStorage }: UsersViewProps): ReactElement => {
    useEffect(() => {
      dataStorage.getUsers();
    }, []);

    return (
      <>
        <ul>
          {dataStorage.usersData &&
            dataStorage.usersData.map((item) => <li key={item.id}>{item.name}</li>)}
        </ul>
      </>
    );
  }
);

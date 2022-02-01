import { makeAutoObservable, runInAction } from "mobx";

const apiUrl = "https://gorest.co.in/public-api/users";

type User = {
    id: number,
    name: string,
    email: string,
    gender: string,
    status: string,
}

export class dataStorage {
  usersData: User[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  getUsersAwait = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.data;
  };

  setUsers = apiData => {
      this.usersData = [...apiData];
  }

  getUsers = () => {
    this.getUsersAwait().then(data => {
      runInAction(() => {
        this.setUsers(data);
      });
    });
  };
}

export const dataStorageInstance = new dataStorage();

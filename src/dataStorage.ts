import { makeAutoObservable, runInAction } from "mobx";

const apiUrl = "https://gorest.co.in/public-api/users";

export class dataStorage {
  usersData = [];
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

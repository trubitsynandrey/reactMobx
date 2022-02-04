import { makeAutoObservable, runInAction } from "mobx";

const apiUrl = "https://gorest.co.in/public-api/users";
const apiPostsUrl = "https://gorest.co.in/public-api/posts?user_id=";
type User = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
};

export class dataStorage {
  usersData: User[] = [];
  userPosts: number;
  isLoading = true;
  constructor() {
    makeAutoObservable(this);
  }

  getUsersAwait = async (page) => {
    const response = await fetch(`${apiUrl}?page=${page}`);
    const data = await response.json();
    runInAction(() => {
      this.isLoading = false;
    });
    return data.data;
  };

  getUserPostAwait = async (id: number) => {
    const response = await fetch(`${apiPostsUrl}${id}`);
    const data = await response.json();
    return data.data;
  };

  setUsers = (apiData) => {
    this.usersData = [...apiData];
  };

  setUserPosts = (apiData) => {
    this.userPosts = apiData.length;
  };

  getUsers = (page=1) => {
    this.getUsersAwait(page).then((data) => {
      runInAction(() => {
        this.setUsers([...this.usersData , ...data]);
      });
    });
  };

  getUserPost = (id: number) => {
    this.getUserPostAwait(id).then((data) => {
      runInAction(() => {
        this.setUserPosts(data);
      });
    });
  };
}

export const dataStorageInstance = new dataStorage();

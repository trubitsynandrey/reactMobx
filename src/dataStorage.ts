import { makeAutoObservable, runInAction } from "mobx";

const apiUrl = "https://gorest.co.in/public-api/users";
const apiPostsUrl = "https://gorest.co.in/public-api/posts?user_id="
type User = {
    id: number,
    name: string,
    email: string,
    gender: string,
    status: string,
}

export class dataStorage {
  usersData: User[] = [];
  userPosts: any [];
  isLoading = true;
  constructor() {
    makeAutoObservable(this);
  }

  getUsersAwait = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    this.isLoading = false;
    return data.data;
  };

  getUserPostAwait = async (id: number) => {
    const response = await fetch(`${apiPostsUrl}${id}`);
    const data = await response.json();
    return data.data;
  }

  setUsers = apiData => {
      this.usersData = [...apiData].slice(0, 10);
  }

  setUserPosts = apiData => {
    this.userPosts = apiData.length
  }

  getUsers = () => {
    this.getUsersAwait().then(data => {
      runInAction(() => {
        this.setUsers(data);
      });
    });
  };

  getUserPost = (id: number) => {
    this.getUserPostAwait(id).then(data => {
      runInAction(() => {
        this.setUserPosts(data)
      })
    })
  }
}

export const dataStorageInstance = new dataStorage();

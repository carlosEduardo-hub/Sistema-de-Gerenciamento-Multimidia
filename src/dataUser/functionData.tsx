import { UserData } from "./userData";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createUser(data: any): UserData {
  return {
    id: data.id,
    email: data.email,
    username: data.username,
    name: data.name,
    description: data.description,
    date_joined: data.date_joined,
    date_of_birth: data.date_of_birth,
    profile_picture: data.profile_picture,
  };
}

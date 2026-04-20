import React, { useContext, useEffect, useState } from "react";
import { User, Presence } from "../types/user";
import pfpDefault from "../assets/pfps/default-grey.webp";

const UsersContext = React.createContext<{
  users: Record<string, User>;
  getUser: (target: string) => User;
}>({
  users: {},
  getUser: () => new User(),
});

const UsersUpdateContext = React.createContext<{
  addUser: (user: User) => void;
  removeUser: (target: User | string) => void;
  modUser: (mod: UserModSelection, target: User | string, value: any) => void;
}>({
  addUser: () => {},
  removeUser: () => {},
  modUser: () => {},
});

export function useUsers() {
  return useContext(UsersContext);
}

export function useUsersUpdate() {
  return useContext(UsersUpdateContext);
}

export const UserModSelection = {
  Username: 0,
  Display: 1,
  PFP: 2,
  Bio: 3,
  Status: 4,
  JoinDate: 5,
  Presence: 6,
} as const;
export type UserModSelection =
  (typeof UserModSelection)[keyof typeof UserModSelection];

const MOD_METHOD_MAP: Record<UserModSelection, keyof User> = {
  [UserModSelection.Username]: "setUsername",
  [UserModSelection.Display]: "setDisplayname",
  [UserModSelection.PFP]: "setPfp",
  [UserModSelection.Bio]: "setBio",
  [UserModSelection.Status]: "setStatus",
  [UserModSelection.JoinDate]: "setJoinDate",
  [UserModSelection.Presence]: "setPresence",
};

export function UserProvider({ children }: any) {
  const [users, setUsers] = useState<Record<string, User>>({
    superuser: new User(
      "ddot2009",
      "Ddot",
      pfpDefault,
      "Welcome to Mimiccord!",
      "Use this panel to edit my details.",
      new Date(),
      Presence.Online,
      "superuser",
    ),
  });

  // add a throw error is user is null
  const modUser = (
    mod: UserModSelection,
    target: User | string,
    value: any,
  ) => {
    const user = users[typeof target === "string" ? target : target.id];
    const method = MOD_METHOD_MAP[mod];

    if (!user || !method) return;

    const updatedUser = user.clone();
    (updatedUser[method] as Function)(value);

    const updatedRecord = {
      ...users,
      [updatedUser.id]: updatedUser,
    };
    setUsers(updatedRecord);
  };

  const addUser = (user: User = new User()): User => {
    setUsers({
      ...users,
      [user.id]: user,
    });
    return user;
  };

  const removeUser = (target: User | string) => {
    const idToRemove =
      users[typeof target === "string" ? target : target.id].id;
    if (!users[idToRemove]) return;

    const updatedRecord = Object.fromEntries(
      Object.entries(users).filter(([key]) => key !== idToRemove),
    );
    setUsers(updatedRecord);
  };

  const getUser = (target: string): User => {
    return users[target];
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <UsersContext.Provider value={{ users, getUser }}>
      <UsersUpdateContext.Provider value={{ addUser, removeUser, modUser }}>
        {children}
      </UsersUpdateContext.Provider>
    </UsersContext.Provider>
  );
}

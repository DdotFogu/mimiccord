import React, {useContext, useEffect, useState} from 'react';
import { User, Presence } from '../types/user';
import { DM } from '../types/directmessage';

const DataContext = React.createContext(undefined);
const DataUpdateContext = React.createContext(undefined);

export function useData() {
    return useContext(DataContext)
}

export function useDataUpdate() {
    return useContext(DataUpdateContext)
}

export const UserModSelection = {
    Username: 0,
    Display: 1,
    PFP: 2,
    Bio: 3,
    Status: 4,
    JoinDate: 5,
    Presence: 6
} as const;
export type UserModSelection = typeof UserModSelection[keyof typeof UserModSelection];

const MOD_METHOD_MAP: Record<UserModSelection, keyof User> = {
  [UserModSelection.Username]:  'setUsername',
  [UserModSelection.Display]:   'setDisplayname',
  [UserModSelection.PFP]:       'setPfp',
  [UserModSelection.Bio]:       'setBio',
  [UserModSelection.Status]:    'setStatus',
  [UserModSelection.JoinDate]:  'setJoinDate',
  [UserModSelection.Presence]:  'setPresence',
};


export function DataProvider({ children }: any) {
    const [dms, setDms] = useState<DM[]>()

    const modDMs = () => {

    }

    const addDM = () => {

    }

    const removeDM = () => {

    }

    // maybe instead use a record/map of UUID: user
    // make UUID of user its unique identifier
    const [users, setUsers] = useState<User[]>(
    [
        new User(
            "ddot2009",
            "ddot",
            "set the pfp here lol",
            "",
            "",
            new Date(2019, 3, 29),
            Presence.Online
        )
    ]
    );

    // add a throw error is user is null
    const modUser = (mod: UserModSelection, target: User | number, value: any) => {
        const userIndex = target instanceof User 
        ? users.findIndex(u => u === target)
        : target as number;

        if (userIndex === -1) return;
        
        const method = MOD_METHOD_MAP[mod];
        if (!method) return;

        const updatedUser = users[userIndex].clone();
        (updatedUser[method] as Function)(value);

        setUsers(prev => {
            const updated = [...prev];
            updated[userIndex] = updatedUser;
            return updated;
        });
    }

    const addUser = (user: User): User => {
        setUsers([...users, user]);
        return user;
    }

    const removeUser = (target: User | number) => {
        const indexToRemove = target instanceof User 
        ? users.findIndex(u => u === target)
        : target as number; // <- turn this into a func

        if (indexToRemove === -1 || users[(target as number)] === undefined) return;

        setUsers(prevUsers => prevUsers.filter((_, index) => index !== indexToRemove));
    }

    useEffect(() => {
        console.log(users)
    }, [users])

    return(
        <DataContext.Provider value={ { users } }>
            <DataUpdateContext.Provider value={ {addUser, removeUser, modUser} }>
                {children}
            </DataUpdateContext.Provider>
        </DataContext.Provider>
    )
}

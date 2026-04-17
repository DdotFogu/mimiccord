import React, { useContext, useState, useEffect } from "react";
import { DM } from "../types/directmessage";
import { useUsers } from "./UserContext";

const DMContext = React.createContext<{
  dms: Map<string, DM>;
  getDM: (target: string) => DM;
}>({
  dms: new Map(),
  getDM: () => new DM(),
});

const DMUpdateContext = React.createContext<{
  addDM: (dm: DM) => void;
  removeDM: (target: string) => void;
  modDM: (mod: DMModSelection, target: DM | string, value: any) => void;
}>({
  addDM: () => {},
  removeDM: () => {},
  modDM: () => {},
});

export function useDMs() {
  return useContext(DMContext);
}

export function useDMsUpdate() {
  return useContext(DMUpdateContext);
}

export const DMModSelection = {
  Name: 0,
  PFP: 1,
  AddMember: 2,
  RemoveMember: 3,
  AddMessage: 4,
  RemoveMessage: 5,
  SetMessage: 6,
  SwapMessages: 7,
} as const;
export type DMModSelection =
  (typeof DMModSelection)[keyof typeof DMModSelection];

const MOD_METHOD_MAP: Record<DMModSelection, keyof DM> = {
  [DMModSelection.Name]: "setName",
  [DMModSelection.PFP]: "setPfp",
  [DMModSelection.AddMember]: "addMember",
  [DMModSelection.RemoveMember]: "removeMember",
  [DMModSelection.AddMessage]: "addMessage",
  [DMModSelection.RemoveMessage]: "removeMessage",
  [DMModSelection.SetMessage]: "setMessage",
  [DMModSelection.SwapMessages]: "swapMessages",
};

export function DMProvider({ children }: any) {
  const { users } = useUsers();

  const [dms, setDms] = useState<Map<string, DM>>(new Map());

  const modDM = (mod: DMModSelection, target: DM | string, value: any) => {
    const dm = dms.get(typeof target === "string" ? target : target.id);
    const method = MOD_METHOD_MAP[mod];

    if (!method || !dm) return;

    const updated = dm.clone();
    (updated[method] as Function)(value);

    setDms(new Map(dms.set(updated.id, updated)));
  };

  const addDM = (dm: DM = new DM([], [users["superuser"]])): DM => {
    setDms(new Map(dms).set(dm.id, dm));
    return dm;
  };

  const removeDM = (target: string) => {
    if (!dms.get(target)) return;

    const updatedMap = new Map(dms);
    updatedMap.delete(target);
    setDms(updatedMap);
  };

  const getDM = (target: string): DM => {
    return dms.get(target)!;
  };

  useEffect(() => {
    console.log(dms);
  }, [dms]);

  return (
    <DMContext.Provider value={{ dms, getDM }}>
      <DMUpdateContext.Provider value={{ addDM, removeDM, modDM }}>
        {children}
      </DMUpdateContext.Provider>
    </DMContext.Provider>
  );
}

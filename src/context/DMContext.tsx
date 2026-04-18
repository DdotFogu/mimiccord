import React, { useContext, useState, useEffect } from "react";
import { DM } from "../types/directmessage";

const initalDmId: string = crypto.randomUUID();

const DMContext = React.createContext<{
  dms: Map<string, DM>;
  selectedDm: string;
  getDm: (target: string) => DM;
}>({
  dms: new Map(),
  selectedDm: initalDmId,
  getDm: () => new DM(),
});

const DMUpdateContext = React.createContext<{
  addDm: (dm: DM) => void;
  removeDm: (target: string) => void;
  modDm: (mod: DMModSelection, target: DM | string, value: any) => void;
  selectDm: (target: string | DM) => void;
}>({
  addDm: () => {},
  removeDm: () => {},
  modDm: () => {},
  selectDm: () => {},
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
  const [dms, setDms] = useState<Map<string, DM>>(
    new Map([[initalDmId, new DM(initalDmId)]]),
  );

  const [selectedDm, setSelectedDm] = useState<string>(initalDmId);

  const selectDm = (target: string | DM) => {
    var id = typeof target === "string" ? target : target.id;
    setSelectedDm(id);
    console.log("Selected direct messages of id: ", id);
  };

  const modDm = (mod: DMModSelection, target: DM | string, value: any) => {
    const dm = dms.get(typeof target === "string" ? target : target.id);
    const method = MOD_METHOD_MAP[mod];

    if (!method || !dm) return;

    const updated = dm.clone();
    (updated[method] as Function)(value);

    setDms(new Map(dms.set(updated.id, updated)));
  };

  const addDm = (dm: DM = new DM()): DM => {
    setDms(new Map(dms).set(dm.id, dm));
    return dm;
  };

  const removeDm = (target: string) => {
    if (!dms.get(target)) return;

    const updatedMap = new Map(dms);
    updatedMap.delete(target);
    setDms(updatedMap);
  };

  const getDm = (target: string): DM => {
    return dms.get(target)!;
  };

  useEffect(() => {
    console.log(dms);
  }, [dms]);

  // useEffect(() => {
  //   console.log(selectedDm);
  // }, [selectedDm]);

  return (
    <DMContext.Provider value={{ dms, selectedDm, getDm }}>
      <DMUpdateContext.Provider value={{ addDm, removeDm, modDm, selectDm }}>
        {children}
      </DMUpdateContext.Provider>
    </DMContext.Provider>
  );
}

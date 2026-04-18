import pfpDefault from "../assets/pfps/default-grey.webp";

import { User } from "./user";
import { Message } from "./message";

// add prints for debugging
// there must always be an owner,
// undef owner is fine for now as I prototype the first build

export class DM {
  public messages: Message[];
  public members: Map<string, { user: User }>;
  public owner: User | undefined;
  public group: boolean;
  public name: string;
  public pfp: string;
  readonly id: string;

  constructor(
    _id: string = crypto.randomUUID(),
    _messages: Message[] = [],
    _members: User[] | Map<string, { user: User }> = [],
    _owner: User | undefined = undefined,
    _group: boolean = false,
    _name: string = "Name",
    _pfp: string = pfpDefault,
  ) {
    this.messages = _messages;
    this.members = new Map<string, { user: User }>();
    this.owner = _owner;
    this.group = _group;
    this.name = _name;
    this.pfp = _pfp;
    this.id = _id;

    if (Array.isArray(_members)) {
      _members.forEach((user) => {
        if (!this.members.has(user.id)) {
          this.members.set(user.id, { user: user });
        }
      });
    } else {
      this.members = _members;
    }

    this.updateGroup();
  }

  clone(): DM {
    return new DM(
      this.id,
      this.messages,
      this.members,
      this.owner,
      this.group,
      this.name,
      this.pfp,
    );
  }

  // should be able to pass in nothing with new Message

  public addMessage(_message: Message): void {
    this.messages.push(_message);
  }

  public removeMessage(_target: number | Message): void {
    const idxToRemove = this.getMessageIdx(_target);

    if (this.messages.length >= idxToRemove) {
      this.messages.splice(idxToRemove, 1);
    }
  }

  public swapMessages(target1: Message | number, target2: Message | number) {
    const idx1 = this.getMessageIdx(target1);
    const idx2 = this.getMessageIdx(target2);
    if (
      idx1 < 0 ||
      idx2 < 0 ||
      idx1 >= this.messages.length ||
      idx2 >= this.messages.length
    )
      return;

    [this.messages[idx1], this.messages[idx2]] = [
      this.messages[idx2],
      this.messages[idx1],
    ];
  }

  public setMessage(_target: number | Message, value: Message): void {
    const idxToSet = this.getMessageIdx(_target);

    if (this.messages.length >= idxToSet) {
      this.messages[idxToSet] = value;
    }
  }

  public getMessageIdx(target: Message | number): number {
    return target instanceof Message
      ? this.messages.findIndex((el) => el === target)
      : target;
  }

  public addMember(_user: User) {
    if (!this.members.has(_user.id)) {
      this.members.set(_user.id, { user: _user });
      this.updateGroup();
    }
  }

  public removeMember(_target: User | string) {
    const idToRemove: string = this.getMemberId(_target);

    if (this.members.has(idToRemove)) {
      this.members.delete(idToRemove);
      this.updateGroup();
    }
  }

  public getMemberId(target: User | string): string {
    return target instanceof User ? target.id : target;
  }

  public setName(_name: string) {
    this.name = _name;
  }

  public setPfp(_pfp: string) {
    this.pfp = _pfp;
  }

  public updateGroup() {
    const size: number = this.members.size;

    if (size === 2) {
      this.group = false;

      const user = Array.from(this.members.values())[1].user;
      this.setName(user.displayname);
      this.setPfp(user.pfp);
    } else {
      this.group = true;
    }
  }

  public allNames(): string {
    return Array.from(this.members.values())
      .map((m) => m.user.displayname)
      .join(", ");
  }
}

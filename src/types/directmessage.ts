import pfpDefault from "../assets/pfps/default-grey.webp";

import { Message } from "./message";

export class DM {
  public messages: Message[];
  public members: Set<string>;
  public owner: string | undefined;
  public group: boolean;
  public name: string;
  public pfp: string;
  readonly id: string;

  constructor(
    _id: string = crypto.randomUUID(),
    _messages: Message[] = [],
    _members: Set<string> = new Set(["superuser"]),
    _owner: string | undefined = "superuser",
    _group: boolean = false,
    _name: string = "New Direct Messages",
    _pfp: string = pfpDefault,
  ) {
    this.messages = _messages;
    this.members = new Set();
    this.owner = _owner;
    this.group = _group;
    this.name = _name;
    this.pfp = _pfp;
    this.id = _id;
    this.members = _members;

    this.updateGroup();
  }

  clone(): DM {
    return new DM(
      this.id,
      [...this.messages],
      new Set(this.members),
      this.owner,
      this.group,
      this.name,
      this.pfp,
    );
  }

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

  public addMember(id: string) {
    if (!this.members.has(id)) {
      this.members.add(id);
      this.updateGroup();
    }
  }

  public removeMember(target: string) {
    if (this.members.has(target)) {
      if (target === this.owner) this.owner = undefined;
      this.members.delete(target);
      this.updateGroup();
    }
  }

  public setName(_name: string) {
    this.name = _name;
  }

  public setPfp(_pfp: string) {
    this.pfp = _pfp;
  }

  public setOwner(target: string) {
    if (this.members.has(target)) this.owner = target;
  }

  public isOwner(target: string): boolean {
    return this.owner === target;
  }

  public updateGroup() {
    const size: number = this.members.size;

    if (size === 2) {
      this.group = false;

      // const user = Array.from(this.members.values())[1];
      // this.setName(user.displayname);
      // this.setPfp(user.pfp);
    } else {
      this.group = true;
    }

    if (!this.owner && this.members.size > 0)
      this.setOwner(this.members.values().next().value!);
  }
}

import { User } from "./user";
import { Message } from "./message";

// add prints for debugging
// add check for when user count is below 2

export class DM {
  public messages: Message[];
  public users: Map<string, { user: User; occurance: number }>;
  public name: string;
  public pfp: string;

  constructor(
    _messages: Message[] = [],
    _users: User[] = [],
    _name: string = "Unknown",
    _pfp: string = "Unknown",
  ) {
    this.messages = _messages;
    this.users = new Map<string, { user: User; occurance: number }>();
    this.name = _name;
    this.pfp = _pfp;

    _users.forEach((user) => {
      if (!this.users.has(user.id)) {
        this.users.set(user.id, { user: user, occurance: 0 });
      }
    });

    this._update();
  }

  public _update() {
    if (!DM.IsGroup(this.users)) {
      const users = [...this.users.values()];

      this.name = users[1].user.displayname;
      this.pfp = users[1].user.pfp;

      // make a get user func that returns user in array
    }
  }

  public addMessage(_message: Message) {
    this.messages.push(_message);
    this.users.get(_message.owner.id)!.occurance++;
  }

  public removeMessage(_message: number | Message): void {
    if (_message instanceof Message) {
      this.users.get(_message.owner.id)!.occurance--;
      this.messages = this.messages.filter((msg) => msg !== _message);
    } else {
      this.users.get(this.messages[_message as number].owner.username)!
        .occurance--;
      this.messages = this.messages.filter((_, index) => index !== _message);
    }
  }

  public popMessage(): Message | undefined {
    const popped = this.messages.pop();
    if (popped) {
      this.users.get(popped.owner.id)!.occurance--;
      return popped;
    } else return undefined;
  }

  public addUser(_user: User) {
    if (!this.users.has(_user.id)) {
      this.users.set(_user.id, { user: _user, occurance: 0 });
    }

    this._update();
  }

  public removeUser(_user: User) {
    if (this.users.has(_user.id)) {
      this.messages = this.messages.filter(
        (message) => message.owner.id !== _user.id,
      );
      this.users.delete(_user.id);
    }

    this._update();
  }

  public setName(_name: string) {
    if (!DM.IsGroup(this.users)) return;

    this.name = _name;
  }

  public setPfp(_pfp: string) {
    if (!DM.IsGroup(this.users)) return;

    this.name = _pfp;
  }

  public static IsGroup(
    users: Map<string, { user: User; occurance: number }>,
  ): boolean {
    const isGroup = users.size > 2 ? true : false;

    return isGroup;
  }
}

import { User, Presence } from "./user";
import { Message, Content } from "./message";

// add prints for debugging 
// add check for when user count is below 2

export class DM {
    public messages: Message[];
    public users: Map<string, [User, number]>;
    public name: string;
    public pfp: string;
    
    constructor(
        _messages: Message[] = [],
        _users: User[] = [],
        _name: string = "Unknown",
        _pfp: string = "Unknown",
    ) {
        this.messages = _messages;
        this.users = new Map<string, [User, number]>();
        this.name = _name;
        this.pfp = _pfp;

        _users.forEach((user) => {
            if(!this.users.has(user.username)) {
                this.users.set(user.username, [user, 0]);   
            }
        })

        this._update();
    }

    public _update() {
        if (!DM.IsGroup(this.users)) {
            const users = [...this.users.values()];
            
            this.name = users[1][0].displayname;
            this.pfp = users[1][0].pfp;;

            // make a get user func that returns user in array
        }
    }

    public addMessage(_message: Message) {
        this.messages.push(_message);
        this.users[_message.owner.username].occurance++;
    }

    public removeMessage(_message: number | Message): void {
        if (_message instanceof Message) {
            this.users[_message.owner.username].occurance--;
            this.messages = this.messages.filter(msg => msg !== _message);
        } else {
            this.users[this.messages[_message as number].owner.username].occurance--;
            this.messages = this.messages.filter((_, index) => index !== _message);
        }
    }

    public popMessage(): Message {
        const popped: Message = this.messages.pop();
        this.users[popped.owner.username].occurance--;
        return popped;
    }

    public addUser(_user: User) {
        if(!this.users.has(_user.username)) {
            this.users.set(_user.username, [_user, 0]);   
        }

        this._update();
    }

    public removeUser(_user: User) {
        if(this.users.has(_user.username)) {
            this.messages = this.messages.filter(message => message.owner.username !== _user.username);
            this.users.delete(_user.username);
        }

        this._update();
    }

    public setName(_name: string) {
        if (!DM.IsGroup(this.users)) return

        this.name = _name;
    }

    public setPfp(_pfp: string) {
        if (!DM.IsGroup(this.users)) return

        this.name = _pfp;
    }

    public static IsGroup(users: Map<string, [User, number]>): boolean {
        const isGroup =
            users.size > 2 ?
            true :
            false

        return isGroup;
    }
}

// remove this later

export const runDemo = () => {
    let ddot = new User(
        "ddot2009",
        "ddot",
        "ddot PFP",
        "Mr Beany Boi",
        "no status",
        new Date(),
        Presence.Online
    )

    let chairguy = new User(
        "typeshiitt33",
        "chairguy",
        "cg PFP",
        "no bio",
        "no status",
        new Date(),
        Presence.Online
    )

    let nails = new User(
        "nails",
        "lin",
        "nails PFP",
        "no bio",
        "no status",
        new Date(),
        Presence.Online
    )

    let zeuz = new User(
        "zeuz",
        "zuez",
        "zeuz PFP",
        "no bio",
        "no status",
        new Date(),
        Presence.Online
    )

    const textMsg : Message = new Message(nails, new Date(), new Content("hello this is waffles speakling"))

    let newDm = new DM([textMsg, textMsg], [ddot, chairguy, nails, zeuz], "cool name", "cool pfp")
    newDm.removeUser(nails);
    console.log(newDm)
}

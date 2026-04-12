export const Presence = {
    Offline: 0,
    Online: 1,
    DND: 2,
    Idle: 3,
} as const;

export type Presence = typeof Presence[keyof typeof Presence];

export class User {
    public username: string;
    public displayname: string;
    public pfp: string;
    public bio: string;
    public status: string;
    public joinDate: Date;
    public presence: Presence;

    constructor(
        username: string = "Unknown",
        displayname: string = "Unknown",
        pfp: string = "",
        bio: string = "",
        status: string = "Offline",
        joinDate: Date = new Date(),
        presence: Presence = Presence.Offline
    ) {
        this.username = username;
        this.displayname = displayname;
        this.pfp = pfp;
        this.bio = bio;
        this.status = status;
        this.joinDate = joinDate;
        this.presence = presence;
    }

    public setUsername(username: string) {
        this.username = username;
    }

    public setDisplayname(displayname: string) {
        this.displayname = displayname;
    }

    public setPfp(pfp: string) {
        this.pfp = pfp;
    }

    public setBio(bio: string) {
        this.bio = bio;
    }

    public setStatus(status: string) {
        this.status = status;
    }

    public setJoinDate(joinDate: Date) {
        this.joinDate = joinDate;
    }

    public setPresence(presence: Presence) {
        this.presence = presence;
    }

    // make this only return without seconds mins and hours
    public getDate(): Date {
        return this.joinDate
    }

    public isEqual(_user: User) {
        return this === _user;
    }
}
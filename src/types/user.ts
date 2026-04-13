import { use } from "react";

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

    clone(): User {
        return new User(
            this.username,
            this.displayname,
            this.pfp,
            this.bio,
            this.status,
            this.joinDate,
            this.presence
        )
    }

    public setUsername(_username: string): void {
        if (typeof _username !== "string") return;
        this.username = _username;
    }

    public setDisplayname(_displayname: string) {
        if (typeof _displayname !== "string") return;
        this.displayname = _displayname;
    }

    public setPfp(_pfp: string) {
        if (typeof _pfp !== "string") return;
        this.pfp = _pfp;
    }

    public setBio(_bio: string) {
        if (typeof _bio !== "string") return;
        this.bio = _bio;
    }

    public setStatus(_status: string) {
        if (typeof _status !== "string") return;
        this.status = _status;
    }

    public setJoinDate(_joinDate: Date) {
        if (!(_joinDate instanceof Date)) return;
        this.joinDate = _joinDate;
    }

    public setPresence(_presence: Presence) {
        if (!Object.values(Presence).includes(_presence)) return;
        this.presence = _presence;
    }

    // make this only return without seconds mins and hours
    public getDate(): Date {
        return this.joinDate
    }

    public isEqual(_user: User) {
        return this === _user;
    }
}
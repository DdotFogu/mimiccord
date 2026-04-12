import { User } from "./user";

// add support for images, gifs, and vids

export class Content {
    public text: string;

    constructor(
        _text: string = "Lorem Ispum",
    ) {
        this.text = _text;
    }

    public setText(_text: string) {
        this.text = _text;
    }
}

// add support for reactions and replys

export class Message {
    public owner: User;
    public sentDate: Date;
    public content: Content;

    constructor(
        owner: User,
        sentDate: Date = new Date(),
        content: Content = new Content(),
    ) {
        this.owner = owner;
        this.sentDate = sentDate;
        this.content = content;
    }

    public setOwner(_owner: User) {
        this.owner = _owner;
    }

    public setSentDate(_date: Date) {
        this.sentDate = _date;
    }

    // setText instead
    
    public setContent(_content: Content) {
        this.content = _content;
    }
}
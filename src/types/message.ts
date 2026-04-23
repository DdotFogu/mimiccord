// add support for images, gifs, and vids

export class Content {
  public text: string;

  constructor(_text: string = "Lorem Ispum") {
    this.text = _text;
  }

  copy(): Content {
    return new Content(this.text);
  }

  public setText(_text: string) {
    this.text = _text;
  }

  public isEmpty(): boolean {
    return this.text == "";
  }
}

// add support for reactions and replys

export class Message {
  public owner: string; // <- change this to id string
  public sentDate: Date;
  public content: Content;

  constructor(
    owner: string,
    sentDate: Date = new Date(),
    content: Content = new Content(),
  ) {
    this.owner = owner;
    this.sentDate = sentDate;
    this.content = content;
  }

  copy(): Message {
    return new Message(this.owner, this.sentDate, this.content.copy());
  }

  public setOwner(_owner: string) {
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

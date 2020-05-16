export class ChatMessage {
    private _content: string;
    private _sender: string;
    private _timestamp: Date;
    private _type: string;

    constructor(content: string, parseNeeded: boolean, sender?: string, timestamp?: Date, type?: string) {
        if (parseNeeded) {
            let parsedContent = JSON.parse(content);
            this._content = parsedContent._content;
            this._sender = parsedContent._sender;
            this._timestamp = parsedContent._timestamp;
            this._type = parsedContent._type;
        } else {
            this._content = content;
            this._sender = sender;
            this._timestamp = timestamp;
            this._type = type;
        }
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }


    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
    }

    get sender(): string {
        return this._sender;
    }

    set sender(value: string) {
        this._sender = value;
    }

    get timestamp(): Date {
        return this._timestamp;
    }

    set timestamp(value: Date) {
        this._timestamp = value;
    }
}
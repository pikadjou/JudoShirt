export class Response {
    public Identifier: string;
    public Content: any;

    constructor(identifier: string, content: any) {
        this.Identifier = identifier;
        this.Content = content;
    }
}

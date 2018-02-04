export class Request {
    public Type: string;
    public Id: string;
    public Identifier: string;
    public Controller: string;
    public View: string;
    public Content: {};

    constructor(type: string, identifier: string, controller: string, view: string, content: any) {
        this.Type = type;
        // this.Id = MartialShirt.Init.Application.NewGuid();
        this.Identifier = identifier;
        this.Controller = controller;
        this.View = view;
        this.Content = content;
    }
}

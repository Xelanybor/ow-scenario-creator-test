class Rule {

    public name: string;
    public event: string;
    public conditions: string;
    public actions: string;

    public constructor(name: string, event: string, conditions: string, actions: string) {
        this.name = name;
        this.event = event;
        this.conditions = conditions;
        this.actions = actions;
    }

    public toString() {
        return `rule("${this.name}")
{
    event
    {
        ${this.event}
    }
    conditions
    {
        ${this.conditions}
    }
    actions
    {
        ${this.actions}
    }
}`;
    }

}

export default Rule;
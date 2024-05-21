class Rule {

    constructor(name, event, conditions, actions) {
        this.name = name;
        this.event = event;
        this.conditions = conditions;
        this.actions = actions;
    }

    toString() {
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
class Rule {

    public name: string;
    public event: string;
    public conditions: string;
    public actions: string;

    public constructor(name: string, event: string, conditions: string = '', actions: string = '') {
        this.name = name;
        this.event = event;
        this.conditions = conditions;
        this.actions = actions;
    }

    public toString() {
        let code = `rule("${this.name}")
{
    event
    {
        ${this.event}
    }`
        if (this.conditions)
            code += `

    conditions
    {
        ${this.conditions}
    }`
        if (this.actions)
            code += `

    actions
    {
        ${this.actions}
    }`
        code += `
}`;

        return code;
    }

}

export default Rule;
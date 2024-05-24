import Rule from "./rule";
import { Hero, setHeroes } from "./heroes";
import { OverwatchMap, setMap } from "./maps";
import Workshop from "./workshop_code";

type vec3 = [number, number, number];

class Scenario {

    private team1: Hero[] = [];
    private team2: Hero[] = [];

    private positions1: vec3[] = [];
    private positions2: vec3[] = [];

    private facing1: vec3[] = [];
    private facing2: vec3[] = [];

    private hasUltimate1: boolean[] = [];
    private hasUltimate2: boolean[] = [];

    private map: OverwatchMap = OverwatchMap.KingsRow;
    private point: number = -1;

    private rules: Rule[] = [];

    constructor() {}

    public setTeam1(heroes: Hero[], positions: vec3[], facing: vec3[], hasUltimate: boolean[]): void {
        this.team1 = heroes;
        this.positions1 = positions;
        this.facing1 = facing;
        this.hasUltimate1 = hasUltimate;
    }

    public setTeam2(heroes: Hero[], positions: vec3[], facing: vec3[], hasUltimate: boolean[]): void {
        this.team2 = heroes;
        this.positions2 = positions;
        this.facing2 = facing;
        this.hasUltimate2 = hasUltimate;
    }

    public setMap(map: OverwatchMap): void {
        this.map = map;
    }

    public setPoint(point: number): void {
        this.point = point;
    }

    public generateCode(): string {
        
        let code = new Workshop();
        let subroutines: string[] = [];

        // create a rule for each player to put them in the right place
        for (let i = 0; i < this.team1.length; i++) {
            subroutines.push(`init${i}`);
            code.addRule(new Rule(
                `Initialise Team 1 ${this.team1[i]}`,
                `Subroutine;
        init${i};`,
                '',
                `Set Ultimate Charge(Players On Hero(Hero(${this.team1[i]}), Team 1), ${this.hasUltimate1[i] ? 100 : 0});
                    Teleport(Players On Hero(Hero(${this.team1[i]}), Team 1), Vector(${this.positions1[i][0]}, ${this.positions1[i][1]}, ${this.positions1[i][2]}));
                    Set Facing(Players On Hero(Hero(${this.team1[i]}), Team 1), Vector(${this.facing1[i][0]}, ${this.facing1[i][1]}, ${this.facing1[i][2]}), To World);`
            ))
        }

        for (let i = 0; i < this.team2.length; i++) {
            subroutines.push(`init${i + 10}`);
            code.addRule(new Rule(
                `Initialise Team 2 ${this.team2[i]}`,
                `Subroutine;
        init${i + 10};`,
                '',
                `Set Ultimate Charge(Players On Hero(Hero(${this.team2[i]}), Team 2), ${this.hasUltimate2[i] ? 100 : 0});
                    Teleport(Players On Hero(Hero(${this.team2[i]}), Team 2), Vector(${this.positions2[i][0]}, ${this.positions2[i][1]}, ${this.positions2[i][2]}));
                    Set Facing(Players On Hero(Hero(${this.team2[i]}), Team 2), Vector(${this.facing2[i][0]}, ${this.facing2[i][1]}, ${this.facing2[i][2]}), To World);`
            ))
        }

        code.setTeam1(this.team1);
        code.setTeam2(this.team2);
        code.setMap(this.map);
        code.setPoint(this.point);

        subroutines.forEach(subroutine => {
            code.addSubroutine(subroutine);
        });

        let initPlayersActions = '';
        for (let i = 0; i < subroutines.length; i++) {
            initPlayersActions += `Call Subroutine(${subroutines[i]});\n`;
        }

        this.rules.forEach(rule => {
            code.addRule(rule);
        });

        code.addRule(new Rule(
            'Initialise Players',
            `Ongoing - Each Player;
                All;
                All;`,
            `Is Button Held(Event Player, Button(Interact)) == True;
            Is Button Held(Event Player, Button(Melee)) == True;`,
            initPlayersActions
        ));

        return code.toCode();
    }

}

export default Scenario;
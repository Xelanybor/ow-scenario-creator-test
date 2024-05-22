import Rule from "./rule.js";
import { Hero, setHeroes } from "./heroes.js";
import { OverwatchMap, setMap } from "./maps.js";

console.log('settings\n{')

let map = OverwatchMap.Nepal;
console.log(setMap(map, 2));

let team1 = [Hero.JunkerQueen, Hero.Cassidy, Hero.Bastion, Hero.Moira, Hero.Baptiste];
let team2 = [Hero.Doomfist, Hero.Tracer, Hero.Sombra, Hero.Ana, Hero.Brigitte];

console.log(setHeroes(team1, team2));
console.log('}');

console.log(`subroutines
{
	0: init0
}`)

let r1 = new Rule(
    "Initialise Cassidy",
    `Subroutine;
        init0;`,
    "",
    `Set Ultimate Charge(Event Player, 100);
        Teleport(Event Player, Vector(-192.270, 17.426, 12.783));
        Set Facing(Event Player, Vector(1, 0, -1), To World);`
);


let r2 = new Rule(
    "Rule 2",
    `Ongoing - Each Player;
All;
All;`,
    "Is Button Held(Event Player, Button(Interact)) == True;Is Button Held(Event Player, Button(Melee)) == True;",
    "Call Subroutine(init0);"
);

console.log(r1.toString());
console.log(r2.toString());
import Rule from "./rule.js";
import { Hero, setHeroes } from "./heroes.js";

let r = new Rule(
    "Rule 2",
    "Ongoing - Each Player;All;All;",
    "Is Button Held(Event Player, Button(Interact)) == True;Is Button Held(Event Player, Button(Melee)) == True;",
    "Call Subroutine(init0);"
);
// console.log(r.toString());

let team1 = [Hero.JunkerQueen, Hero.Cassidy, Hero.Bastion, Hero.Moira, Hero.Baptiste];
let team2 = [Hero.Doomfist, Hero.Tracer, Hero.Sombra, Hero.Ana, Hero.Brigitte];

console.log(setHeroes(team1, team2));
import Rule from "./rule";
import { Hero, setHeroes } from "./heroes";
import { OverwatchMap, setMap } from "./maps";
import Workshop from "./workshop_code";

let workshop = new Workshop();
workshop.setMap(OverwatchMap.Oasis);
workshop.setPoint(2);
workshop.setTeam1([Hero.JunkerQueen, Hero.Cassidy, Hero.Bastion, Hero.Moira, Hero.Baptiste]);
workshop.setTeam2([Hero.Doomfist, Hero.Tracer, Hero.Sombra, Hero.Ana, Hero.Brigitte]);

workshop.addRule(
    new Rule(
        "Initialise Cassidy",
        `Subroutine;
            init0;`,
        "",
        `Set Ultimate Charge(Event Player, 100);
            Teleport(Event Player, Vector(-192.270, 17.426, 12.783));
            Set Facing(Event Player, Vector(1, 0, -1), To World);`
    )
);

workshop.addRule(
    new Rule(
        "Rule 2",
        `Ongoing - Each Player;
    All;
    All;`,
        "Is Button Held(Event Player, Button(Interact)) == True;Is Button Held(Event Player, Button(Melee)) == True;",
        "Call Subroutine(init0);"
    )
);

console.log(workshop.toCode());
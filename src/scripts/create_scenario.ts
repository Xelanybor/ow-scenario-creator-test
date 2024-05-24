import { Hero } from "../scenarios/heroes";
import { OverwatchMap } from "../scenarios/maps";
import Scenario from "../scenarios/scenario";

let scenario = new Scenario();

scenario.setMap(OverwatchMap.Oasis);
scenario.setPoint(2);
scenario.setTeam1([Hero.Cassidy], [[-192.270, 17.426, 12.783]], [[1, 0, -1]], [true]);
scenario.setTeam2([Hero.Venture], [[-192.270, 17.426, 12.783]], [[-1, 0, 1]], [false]);

let b = document.getElementById("testButton");
if (!b) {
    b = document.createElement("button");
    b.id = "testButton";
    document.body.appendChild(b);
}
b.onclick = printCode;

export function printCode() {
    console.log(scenario.generateCode());
}

console.log(document);
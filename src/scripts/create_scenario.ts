import { Hero } from "../scenarios/heroes";
import { OverwatchMap } from "../scenarios/maps";
import Scenario from "../scenarios/scenario";

let scenario = new Scenario();

scenario.setMap(OverwatchMap.Oasis);
scenario.setPoint(2);
scenario.setTeam1([Hero.Cassidy, Hero.Bastion], [[-192.270, 17.426, 12.783], [-192.270, 17.426, 12.783]], [[1, 0, -1], [1, 0, -1]], [true, true]);
scenario.setTeam2([Hero.Venture], [[-192.270, 17.426, 12.783]], [[-1, 0, 1]], [false]);

let b = document.getElementById("testButton");
if (!b) {
    b = document.createElement("button");
    b.id = "testButton";
    document.body.appendChild(b);
}
b.onclick = printCode;

let d = document.createElement("select");
d.id = "heroSelect";
document.body.appendChild(d);

for (let hero of Object.keys(Hero)) {
    let o = document.createElement("option");
    o.value = hero;
    o.text = (Hero as any)[hero];
    d.appendChild(o);
}

export function printCode() {
    let hero = (Hero as any)[(document.getElementById("heroSelect") as HTMLSelectElement).value];
    scenario.setTeam1([hero], [[-192.270, 17.426, 12.783]], [[1, 0, -1]], [true]);
    console.log(scenario.generateCode());
}
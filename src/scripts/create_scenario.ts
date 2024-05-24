import { Hero } from "../scenarios/heroes";
import { OverwatchMap } from "../scenarios/maps";
import Scenario from "../scenarios/scenario";

let scenario = new Scenario();

scenario.setMap(OverwatchMap.Oasis);
scenario.setPoint(2);
scenario.setTeam1([Hero.Cassidy], [[-192.270, 17.426, 12.783]], [[1, 0, -1]], [true]);
scenario.setTeam2([Hero.Venture], [[-192.270, 17.426, 12.783]], [[-1, 0, 1]], [false]);

console.log(scenario.generateCode());
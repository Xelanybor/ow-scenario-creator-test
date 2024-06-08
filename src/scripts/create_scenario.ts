import { Hero } from "../scenarios/heroes";
import { OverwatchMap } from "../scenarios/maps";
import Scenario from "../scenarios/scenario";

type vec3 = [number, number, number];

var team1: HTMLElement[] = [];
var team2: HTMLElement[] = [];

let b = document.getElementById("testButton");
if (!b) {
    b = document.createElement("button");
    b.id = "testButton";
    document.body.appendChild(b);
}
b.onclick = printCode;

// Map selection

let mapDropdown = document.getElementById("mapSelect") as HTMLSelectElement;
if (mapDropdown) {
    for (let map of Object.keys(OverwatchMap)) {
        let o = document.createElement("option");
        o.value = map;
        o.text = (OverwatchMap as any)[map];
        mapDropdown.appendChild(o);
    }
}


// Team 1 hero selection

function addTeam1Hero() {
    let component = document.createElement("div");
    component.className = "hero-settings team1";
    
    let dropdown = document.createElement("select");
    team1.push(dropdown);
    let team1Div = document.getElementById("team1-heroes");
    if (team1Div) {team1Div.appendChild(component)};
    
    for (let hero of Object.keys(Hero)) {
        let o = document.createElement("option");
        o.value = hero;
        o.text = (Hero as any)[hero];
        dropdown.appendChild(o);
    }
    
    let icon = document.createElement("img");
    icon.className = "hero-icon";
    icon.src = `../images/heroes/${dropdown.value}.png`;

    dropdown.onchange = function() {
        icon.src = `../images/heroes/${dropdown.value}.png`;
    }
    
    component.appendChild(icon);
    component.appendChild(dropdown);

}

let addTeam1HeroButton = document.getElementById("addTeam1Hero");
if (addTeam1HeroButton) {addTeam1HeroButton.onclick = addTeam1Hero;}

// Team 2 hero selection

function addTeam2Hero() {

    let component = document.createElement("div");
    component.className = "hero-settings team2";
    
    let dropdown = document.createElement("select");
    team2.push(dropdown);
    let team2Div = document.getElementById("team2-heroes");
    if (team2Div) {team2Div.appendChild(component)};
    
    for (let hero of Object.keys(Hero)) {
        let o = document.createElement("option");
        o.value = hero;
        o.text = (Hero as any)[hero];
        dropdown.appendChild(o);
    }
    
    let icon = document.createElement("img");
    icon.className = "hero-icon";
    icon.src = `../images/heroes/${dropdown.value}.png`;

    dropdown.onchange = function() {
        icon.src = `../images/heroes/${dropdown.value}.png`;
    }
    
    component.appendChild(icon);
    component.appendChild(dropdown);

}

let addTeam2HeroButton = document.getElementById("addTeam2Hero");
if (addTeam2HeroButton) {addTeam2HeroButton.onclick = addTeam2Hero;}

// Change Map

function changeMap() {

    let map = (OverwatchMap as any)[(mapDropdown as HTMLSelectElement).value];
    let mapImage = document.getElementById("map-image") as HTMLImageElement;
    mapImage.src = `../images/maps/${map}2.png`;



}

if (mapDropdown) {mapDropdown.onchange = changeMap;}



export function printCode() {
    let scenario = new Scenario();
    scenario.setMap((OverwatchMap as any)[(mapDropdown as HTMLSelectElement).value]);
    scenario.setPoint(2);
    
    // set team 1
    let heroes1: Hero[] = team1.map(dropdown => (Hero as any)[(dropdown as HTMLSelectElement).value]);
    let position1: vec3[] = heroes1.map(hero => [-192.270, 17.426, 12.783]);
    let facing1: vec3[] = heroes1.map(hero => [1, 0, -1]);
    let hasUlt1: boolean[] = heroes1.map(hero => true);
    scenario.setTeam1(heroes1, position1, facing1, hasUlt1);

    // set team 2
    let heroes2: Hero[] = team2.map(dropdown => (Hero as any)[(dropdown as HTMLSelectElement).value]);
    let position2: vec3[] = heroes2.map(hero => [-192.270, 17.426, 12.783]);
    let facing2: vec3[] = heroes2.map(hero => [-1, 0, 1]);
    let hasUlt2: boolean[] = heroes2.map(hero => false);
    scenario.setTeam2(heroes2, position2, facing2, hasUlt2);

    // copy workshop code to clipboard
    navigator.clipboard.writeText(scenario.generateCode());
    alert("Code copied to clipboard!")
}
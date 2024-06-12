import { Hero } from "../scenarios/heroes";
import { OverwatchMap } from "../scenarios/maps";
import Scenario from "../scenarios/scenario";

type vec2 = [number, number];
type vec3 = [number, number, number];

var team1Heroes: HTMLSelectElement[] = [];
var team2Heroes: HTMLSelectElement[] = [];
var team1Ultimates: HTMLInputElement[] = [];
var team2Ultimates: HTMLInputElement[] = [];



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
    team1Heroes.push(dropdown);
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

    let ultCheckbox = document.createElement("input");
    team1Ultimates.push(ultCheckbox);
    ultCheckbox.type = "checkbox";
    ultCheckbox.checked = false;
    let ultLabel = document.createElement("label");
    ultLabel.innerHTML = "Has Ultimate";
    component.appendChild(ultCheckbox);
    component.appendChild(ultLabel);

}

let addTeam1HeroButton = document.getElementById("addTeam1Hero");
if (addTeam1HeroButton) {addTeam1HeroButton.onclick = addTeam1Hero;}

// Team 2 hero selection

function addTeam2Hero() {

    let component = document.createElement("div");
    component.className = "hero-settings team2";
    
    let dropdown = document.createElement("select");
    team2Heroes.push(dropdown);
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

    let ultCheckbox = document.createElement("input");
    team2Ultimates.push(ultCheckbox);
    ultCheckbox.type = "checkbox";
    ultCheckbox.checked = false;
    let ultLabel = document.createElement("label");
    ultLabel.innerHTML = "Has Ultimate";
    component.appendChild(ultCheckbox);
    component.appendChild(ultLabel);

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

// Move Map

let mapImageDiv = document.getElementById("map");

let mapMoveStart: vec2 = [0, 0];
let mouseDown: boolean = false;

let mapFrame = document.getElementById("map-frame");
    
if (mapFrame && mapImageDiv) {

    if (mapImageDiv) {mapFrame.style.width = 2 * mapImageDiv.offsetWidth + "px";}

    mapImageDiv.onwheel = (event: WheelEvent) => {
        if (!mapImageDiv) {return;}
        event.preventDefault();
        let width = parseInt(mapFrame.style.width.split("px")[0]);
        
        let delta = event.deltaY;
        mapFrame.style.width = (width - delta) + "px";
        mapImageDiv.scrollLeft -= (delta > 0 ? 1 : -1) * 50;
        // console.log(mapImageDiv.offsetHeight)
        // console.log(mapImageDiv.offsetWidth);
        mapImageDiv.scrollTop -= (delta > 0 ? 1 : -1) * (mapImageDiv.offsetHeight / mapImageDiv.offsetWidth) * 25;
    }

    mapImageDiv.onmousedown = (event: MouseEvent) => {
        // console.log("start moving map");
        event.preventDefault();
        mapMoveStart = [event.clientX, event.clientY];
        mouseDown = true;
        mapFrame.style.cursor = "grabbing";
    }

    document.onmouseup = (event: MouseEvent) => {
        // console.log("stop moving map");
        mouseDown = false;
        mapFrame.style.cursor = "grab";
    }

    document.onmousemove = (event: MouseEvent) => {

        if (!mouseDown) {return;}
        if (!mapImageDiv) {return;}
        event.preventDefault();
        let x = event.clientX - mapMoveStart[0];
        let y = event.clientY - mapMoveStart[1];

        mapImageDiv.scrollLeft -= x;
        mapImageDiv.scrollTop -= y;

        mapMoveStart = [event.clientX, event.clientY];

    }

}

export function printCode() {
    let scenario = new Scenario();
    scenario.setMap((OverwatchMap as any)[mapDropdown.value]);
    scenario.setPoint(2);
    
    // set team 1
    let heroes1: Hero[] = team1Heroes.map(dropdown => (Hero as any)[dropdown.value]);
    let position1: vec3[] = heroes1.map(hero => [-192.270, 17.426, 12.783]);
    let facing1: vec3[] = heroes1.map(hero => [1, 0, -1]);
    let hasUlt1: boolean[] = team1Ultimates.map(checkbox => checkbox.checked);
    scenario.setTeam1(heroes1, position1, facing1, hasUlt1);

    // set team 2
    let heroes2: Hero[] = team2Heroes.map(dropdown => (Hero as any)[dropdown.value]);
    let position2: vec3[] = heroes2.map(hero => [-192.270, 17.426, 12.783]);
    let facing2: vec3[] = heroes2.map(hero => [-1, 0, 1]);
    let hasUlt2: boolean[] = team2Ultimates.map(checkbox => checkbox.checked);
    scenario.setTeam2(heroes2, position2, facing2, hasUlt2);

    // copy workshop code to clipboard
    navigator.clipboard.writeText(scenario.generateCode());
    alert("Code copied to clipboard!")
}
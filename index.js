import Rule from "./rule.js";

let r = new Rule(
    "Rule 2",
    "Ongoing - Each Player;All;All;",
    "Is Button Held(Event Player, Button(Interact)) == True;Is Button Held(Event Player, Button(Melee)) == True;",
    "Call Subroutine(init0);"
);
console.log(r.toString());
import Rule from './rule';
import { Hero, setHeroes } from './heroes';
import { OverwatchMap, setMap } from './maps';

class Workshop {
  
  private team1: Hero[] = [];
  private team2: Hero[] = [];

  private map: OverwatchMap = OverwatchMap.KingsRow;
  private point: number = -1;

  private subroutines: string[] = [];
  private lobbySettings: string[] = [];

  private rules: Rule[] = [];

  constructor() {}

  setTeam1(heroes: Hero[]): void {
    this.team1 = heroes;
  }

  setTeam2(heroes: Hero[]): void {
    this.team2 = heroes;
  }

  setMap(map: OverwatchMap): void {
    this.map = map;
  }

  setPoint(point: number): void {
    this.point = point;
  }

  addSubroutine(subroutine: string): void {
    this.subroutines.push(subroutine);
  }

  addRule(rule: Rule): void {
    this.rules.push(rule);
  }

  addLobbySetting(lobby: string): void {
    this.lobbySettings.push(lobby);
  }

  toCode(): string {
    let code = 'settings\n{\n';
    code += 'lobby\n{\n';
    for (let i = 0; i < this.lobbySettings.length; i++) {
      code += this.lobbySettings[i] + '\n';
    }
    code += '}\n';
    code += setHeroes(this.team1, this.team2) + '\n';
    code += setMap(this.map, this.point) + '\n';
    code += '}\n';
    code += 'subroutines\n{\n';
    for (let i = 0; i < this.subroutines.length; i++) {
      code += `${i}: ${this.subroutines[i]}\n`;
    }
    code += '}\n';
    this.rules.forEach(rule => {
      code += rule.toString() + '\n';
    });

    return code;
  }

}

export default Workshop;
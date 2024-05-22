import Rule from './rule';
import { Hero, setHeroes } from './heroes';
import { OverwatchMap, setMap } from './maps';

class Workshop {
  
  private team1: Hero[] = [];
  private team2: Hero[] = [];

  private map: OverwatchMap = OverwatchMap.KingRow;
  private point: number = -1;

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

  addRule(rule: Rule): void {
    this.rules.push(rule);
  }

  toCode(): string {
    let code = 'settings\n{\n';
    code += setHeroes(this.team1, this.team2);
    code += setMap(this.map, this.point);
    code += '}\n';
    code += 'subroutines\n{\n';
    code += '0: init0\n';
    code += '}\n';
    this.rules.forEach(rule => {
      code += rule.toString();
    });

    return code;
  }

}

export default Workshop;
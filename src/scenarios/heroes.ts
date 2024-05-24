enum Hero {
    Ana = 'Ana',
    Ashe = 'Ashe',
    Baptiste = 'Baptiste',
    Bastion = 'Bastion',
    Brigitte = 'Brigitte',
    Cassidy = 'Cassidy',
    Dva = 'D.Va',
    Doomfist = 'Doomfist',
    Echo = 'Echo',
    Genji = 'Genji',
    Hanzo = 'Hanzo',
    Illari = 'Illari',
    JunkerQueen = 'Junker Queen',
    Junkrat = 'Junkrat',
    Kiriko = 'Kiriko',
    Lifeweaver = 'Lifeweaver',
    Lucio = 'Lúcio',
    Mauga = 'Mauga',
    Mei = 'Mei',
    Mercy = 'Mercy',
    Moira = 'Moira',
    Orisa = 'Orisa',
    Pharah = 'Pharah',
    Ramattra = 'Ramattra',
    Reaper = 'Reaper',
    Reinhardt = 'Reinhardt',
    Roadhog = 'Roadhog',
    Sigma = 'Sigma',
    Sojourn = 'Sojourn',
    Soldier76 = 'Soldier: 76',
    Sombra = 'Sombra',
    Symmetra = 'Symmetra',
    Torbjorn = 'Torbjörn',
    Tracer = 'Tracer',
    Venture = 'Venture',
    Widowmaker = 'Widowmaker',
    Winston = 'Winston',
    WreckingBall = 'Wrecking Ball',
    Zarya = 'Zarya',
    Zenyatta = 'Zenyatta'
}

function setHeroes(team1: Hero[], team2: Hero[]): string {
    return `    heroes
    {
        Team 1
        {
            enabled heroes
            {
                ${team1.map(hero => hero.valueOf()).join('\n                ')}
            }
        }

        Team 2
        {
            enabled heroes
            {
                ${team2.map(hero => hero.valueOf()).join('\n                ')}
            }
        }
    }`
}

export { Hero, setHeroes };
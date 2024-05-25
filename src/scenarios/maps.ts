enum OverwatchMap {
    AntarcticPeninsula = 'Antarctic Peninsula',
    Busan = 'Busan',
    Ilios = 'Ilios',
    LijiangTower = 'Lijiang Tower',
    Nepal = 'Nepal',
    Oasis = 'Oasis',
    Samoa = 'Samoa',
    CircuitRoyal = 'Circuit Royal',
    Dorado = 'Dorado',
    Havana = 'Havana',
    Junkertown = 'Junkertown',
    Rialto = 'Rialto',
    Route66 = 'Route 66',
    ShambaliMonastery = 'Shambali Monastery',
    WatchpointGibraltar = 'Watchpoint: Gibraltar',
    NewJunkCity = 'New Junk City',
    Suravasa = 'Suravasa',
    BlizzardWorld = 'Blizzard World',
    Eichenwalde = 'Eichenwalde',
    Hollywood = 'Hollywood',
    KingsRow = 'King\'s Row',
    Midtown = 'Midtown',
    Numbani = 'Numbani',
    Paraiso = 'Paraíso',
    Colosseo = 'Colosseo',
    Esperanca = 'Esperança',
    NewQueenStreet = 'New Queen Street'
}

const control = [
    OverwatchMap.AntarcticPeninsula,
    OverwatchMap.Busan,
    OverwatchMap.Ilios,
    OverwatchMap.LijiangTower,
    OverwatchMap.Nepal,
    OverwatchMap.Oasis,
    OverwatchMap.Samoa
]

const escort = [
    OverwatchMap.CircuitRoyal,
    OverwatchMap.Dorado,
    OverwatchMap.Havana,
    OverwatchMap.Junkertown,
    OverwatchMap.Rialto,
    OverwatchMap.Route66,
    OverwatchMap.ShambaliMonastery,
    OverwatchMap.WatchpointGibraltar
]

const flashpoint = [
    OverwatchMap.NewJunkCity,
    OverwatchMap.Suravasa
]

const hybrid = [
    OverwatchMap.BlizzardWorld,
    OverwatchMap.Eichenwalde,
    OverwatchMap.Hollywood,
    OverwatchMap.KingsRow,
    OverwatchMap.Midtown,
    OverwatchMap.Numbani,
    OverwatchMap.Paraiso
]

const push = [
    OverwatchMap.Colosseo,
    OverwatchMap.Esperanca,
    OverwatchMap.NewQueenStreet
]

function getMode(map: OverwatchMap): string {
    if (control.includes(map)) { return 'Control'; }
    else if (escort.includes(map)) { return 'Escort'; }
    else if (flashpoint.includes(map)) { return 'Flashpoint'; }
    else if (hybrid.includes(map)) { return 'Hybrid'; }
    else if (push.includes(map)) { return 'Push'; }
    else return '';
}

function setMap(map: OverwatchMap, point: number = -1): string {

    let mode = getMode(map);

    return `    modes
    {
        ${mode}
        {
            enabled maps
            {
                ${map}
            }
        }

        General
        {
            Competitive Rules: On
            ${point > -1 ? 'Limit Valid Control Points: ' + ['First', 'Second', 'Third'][point] : ''}
        }

    }
`
}

export { OverwatchMap, setMap, getMode };
const { Game, Biodata, History } = require("./models");

// Game.create ({
//     username: "yeremibe",
//     password: "yes123",
// });

// Biodata.create ({
//     name: 'Yeremibe',
//     hobby: 'tulis',
//     GameId: 2
// });

// // Biodata.create ({
//      name: 'Bento',
//      hobby: 'tulis',
//      GameId: 2,
//  });

 History.create ({
     playedAt: Date.now(),
     score: 85,
     GameID: 1
 })

 History.create ({
     playedAt: Date.now(),
     score: 90,
     GameID: 2
 })
const connection = require('../connection/GameConnection');
const Format = require('../tools/format');

module.exports.getGames = async(req, res)=>{
        try{
            // Query data dari connection
            let games = await connection.getGames(req.query);
            if(!games.bindings.length){
                return res.status(200).json({
                    data:[],
                    message: "Data tidak ditemukan"
                });
            }

            games = games.bindings.map((game)=>Format(game));

            if(req.params.id){
                let game = games.filter((game)=>{
                    return game.id == req.params.id
                });
                res.status(200).json({
                    data:game[0],
                    message: game.length ? 'Data game berhasil didapatkan' : 'Tidak ada hasil dari pencarian'
                })
            }else{
                res.status(200).json({
                    data: games,
                    message: "Show all games"
                })
            }
        }catch(err){
            res.status(400).json(err);
        }
}

module.exports.getSearch = async(req, res)=>{
    try{
        let inputs = req.query.search.split(" ");
        let outputs = []
        // Query data dari connection
        await Promise.all(
            inputs.map(async (input)=>{
                let games = await connection.getSearch({search: input});
                games = games.bindings.map((game)=>Format(game));
                games.map(async (game)=>{
                    const find = outputs.find(({id})=> id === game.id)
                    if(!find){
                        outputs.push(game);
                    }
                })
            })
        )
        if(!outputs.length){
            return res.status(200).json({
                data:[],
                message: "Data tidak ditemukan"
            });
        }else{
            res.status(200).json({
                data: outputs,
                message: "Show all games"
            })
        }
        
    }catch(err){
        res.status(400).json(err);
    }
}

module.exports.getSuggestion = async(req, res)=>{
    try{
        // Query data dari connection

        let games = await connection.getSuggestion(req.query);

        if(!games.bindings.length){
            return res.status(200).json({
                data:[],
                message: "Data tidak ditemukan"
            });
        }

        games = games.bindings.map((game)=>Format(game));
        res.status(200).json({
            data: games,
            message: "Show all games"
        })

    }catch(err){
        res.status(400).json(err);
    }
}
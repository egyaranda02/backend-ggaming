const GameRepo = require('../repo/GameRepo');
const Format = require('../tools/format');

module.exports.getGames = async(req, res)=>{
        try{
            console.log("function starting")
            // Query data dari repo
            let games = await GameRepo.getGames(req.query);

            if(!games.bindings.length){
                return res.status(200).json({
                    data:[],
                    message: "Data tidak ditemukan"
                });
            }

            books = books.bindings.map((book) => BookFormatter(book));
            games = games.bindings.map((game)=>Format(game));

            if(req.params.id){
                let game = games.filter((game)=>{
                    return game.id == req.params.id
                });
                res.status(200).json({
                    data:game[0],
                    message: game.length ? 'Data buku berhasil didapatkan' : 'Tidak ada hasil dari pencarian'
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
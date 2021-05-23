const axios = require('axios');
const qs = require('qs');

const DATA_URL = "http://localhost:3030";

const headers = {
    'Accept': 'application/sparql-results+json,*/*;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

module.exports.getGames = async(param)=>{
    // Query
    const queryData = {
    query: `PREFIX data:<http://example.com/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    SELECT ?id ?title ?platform ?genre ?publisher ?developer ?urlFoto
    WHERE{
        ?sub rdf:type data:game
        OPTIONAL {?sub data:id ?id.}
        OPTIONAL {?sub data:title ?title.}
        OPTIONAL {?sub data:platform ?platform.}
        OPTIONAL {?sub data:genre ?genre.}
        OPTIONAL {?sub data:publisher ?publisher.}
        OPTIONAL {?sub data:developer ?developer.}
        OPTIONAL {?sub data:urlFoto ?urlFoto.}
        FILTER regex(?title, "${param.title ? param.title : ''}", "i")
        FILTER regex(?genre, "${param.genre ? param.genre : ''}", "i")
        FILTER regex(?platform, "${param.platform ? param.platform : ''}", "i")
    }`
    };
    try{
        const {data} = await axios(`${DATA_URL}/ggeming/query`,{
            method: 'POST',
            headers,
            data: qs.stringify(queryData)
        });
        console.log(data.results);
        return data.results;
    }catch(err){
        res.status(400).json(err);
    }
};



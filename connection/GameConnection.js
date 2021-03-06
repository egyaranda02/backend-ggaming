require('dotenv').config({ path: '../.env' })
const axios = require('axios');
const qs = require('qs');

const DATA_URL = process.env.BASE_URL || "http://localhost:3030";
const headers = {
    'Accept': 'application/sparql-results+json,*/*;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

module.exports.getGames = async(param)=>{
    // Query
    const queryData = {
    query: `PREFIX data:<http://example.com/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    SELECT ?id ?title ?platformName ?genreName ?publisher ?developer ?urlFoto
    WHERE{
        ?sub rdf:type data:game
        OPTIONAL {?sub data:id ?id.}
        OPTIONAL {?sub data:title ?title.}
        OPTIONAL {?sub data:publisher ?publisher.}
        OPTIONAL {?sub data:developer ?developer.}
        OPTIONAL {?sub data:urlFoto ?urlFoto.}
        OPTIONAL {?sub data:onPlatform ?platformID.}
        OPTIONAL {?platformID data:platformName ?platformName.}
        OPTIONAL {?sub data:haveGenre ?genreID.}
        OPTIONAL {?genreID data:genreName ?genreName.}
        FILTER regex(?genreName, "${param.genre ? param.genre : ''}", "i")
        FILTER regex(?title, "${param.title ? param.title : ''}", "i")
        FILTER regex(?platformName, "${param.platform ? param.platform : ''}", "i")
        FILTER regex(?publisher, "${param.publisher ? param.publisher : ''}", "i")
        FILTER regex(?developer, "${param.developer ? param.developer : ''}", "i")
    }`
    };
    try{
        const {data} = await axios(`${DATA_URL}/ggeming/query`,{
            method: 'POST',
            headers,
            data: qs.stringify(queryData)
        });
        return data.results;
    }catch(err){
        res.status(400).json(err);
    }
};

module.exports.getSuggestion = async(param)=>{
    // Query
    const queryData = {
    query: `PREFIX data:<http://example.com/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    SELECT ?id ?title ?platformName ?genreName ?publisher ?developer ?urlFoto
    WHERE{
        ?sub rdf:type data:game
        OPTIONAL {?sub data:id ?id.}
        OPTIONAL {?sub data:title ?title.}
        OPTIONAL {?sub data:publisher ?publisher.}
        OPTIONAL {?sub data:developer ?developer.}
        OPTIONAL {?sub data:urlFoto ?urlFoto.}
        OPTIONAL {?sub data:onPlatform ?platformID.}
        OPTIONAL {?platformID data:platformName ?platformName.}
        OPTIONAL {?sub data:haveGenre ?genreID.}
        OPTIONAL {?genreID data:genreName ?genreName.}
        FILTER regex(?genreName, "${param.genre ? param.genre : ''}", "i")
    } ORDER BY RAND() LIMIT 5`
    };
    try{
        const {data} = await axios(`${DATA_URL}/ggeming/query`,{
            method: 'POST',
            headers,
            data: qs.stringify(queryData)
        });
        return data.results;
    }catch(err){
        res.status(400).json(err);
    }
};

module.exports.getSearch = async(param)=>{
    // Query
    const queryData = {
    query: `PREFIX data:<http://example.com/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    SELECT ?id ?title ?platformName ?genreName ?publisher ?developer ?urlFoto
    WHERE{
        {
            ?sub rdf:type data:game
            OPTIONAL {?sub data:id ?id.}
            OPTIONAL {?sub data:title ?title.}
            OPTIONAL {?sub data:publisher ?publisher.}
            OPTIONAL {?sub data:developer ?developer.}
            OPTIONAL {?sub data:urlFoto ?urlFoto.}
            OPTIONAL {?sub data:onPlatform ?platformID.}
            OPTIONAL {?platformID data:platformName ?platformName.}
            OPTIONAL {?sub data:haveGenre ?genreID.}
            OPTIONAL {?genreID data:genreName ?genreName.}
            FILTER REGEX(?title, "${param.search ? param.search : ''}", "i")
        } UNION {
            ?sub rdf:type data:game
            OPTIONAL {?sub data:id ?id.}
            OPTIONAL {?sub data:title ?title.}
            OPTIONAL {?sub data:publisher ?publisher.}
            OPTIONAL {?sub data:developer ?developer.}
            OPTIONAL {?sub data:urlFoto ?urlFoto.}
            OPTIONAL {?sub data:onPlatform ?platformID.}
            OPTIONAL {?platformID data:platformName ?platformName.}
            OPTIONAL {?sub data:haveGenre ?genreID.}
            OPTIONAL {?genreID data:genreName ?genreName.}
            FILTER REGEX(?genreName, "${param.search ? param.search : ''}", "i")
        } UNION {
            ?sub rdf:type data:game
            OPTIONAL {?sub data:id ?id.}
            OPTIONAL {?sub data:title ?title.}
            OPTIONAL {?sub data:publisher ?publisher.}
            OPTIONAL {?sub data:developer ?developer.}
            OPTIONAL {?sub data:urlFoto ?urlFoto.}
            OPTIONAL {?sub data:onPlatform ?platformID.}
            OPTIONAL {?platformID data:platformName ?platformName.}
            OPTIONAL {?sub data:haveGenre ?genreID.}
            OPTIONAL {?genreID data:genreName ?genreName.}
            FILTER REGEX(?platformName, "${param.search ? param.search : ''}", "i")
        } 
    }`
    };
    try{
        const {data} = await axios(`${DATA_URL}/ggeming/query`,{
            method: 'POST',
            headers,
            data: qs.stringify(queryData)
        });
        console.log(data.results)
        return data.results;
    }catch(err){
        res.status(400).json(err);
    }
};
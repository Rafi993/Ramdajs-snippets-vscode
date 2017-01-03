/**
 *  This Script gives a list of all fn for snippet have not been added 
 */

'use strict';

const fs = require('fs'),
      R = require('ramda');
      
const functionList = R.keys(R);
const snippetfn = JSON.parse(fs.readFileSync('./snippet.json', 'utf8'));
const presentfn = R.values(R.map((snippet)=>snippet.prefix.substring(2), snippetfn));
const missingfn = R.difference(functionList,presentfn)

if(R.isEmpty(missingfn))
    console.log(':) snippets for all function have been generated');

fs.writeFile("./missingfn.txt", missingfn, (err)=>{
    if(err) {
        return console.log(err);
    }
}); 
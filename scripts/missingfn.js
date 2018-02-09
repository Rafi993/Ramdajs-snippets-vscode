/**
 *  If new functions have been added to ramda and snippets have not been geneated for them
 *  run this to get list of missing functions
 */

'use strict';

const fs = require('fs'),
      R = require('ramda');
      
const functionList = R.keys(R);
const snippetfn = JSON.parse(fs.readFileSync('./snippet.json', 'utf8'));
const presentfn = R.values(R.map((snippet)=>snippet.prefix.substring(2), snippetfn));
const missingfn = R.difference(functionList,presentfn)

// check if there is no missing function
if(R.isEmpty(missingfn))
    console.log(':) snippets for all function have been generated');

// write missing function names to missingfn.txt
fs.writeFile("./missingfn.txt", missingfn, (err)=>{
    if(err) {
        return console.log(err);
    }
}); 
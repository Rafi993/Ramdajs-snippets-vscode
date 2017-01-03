/**
 *  This Script gives a list of all fn for snippet have not been added 
 */

'use strict';

const fs = require('fs'),
      R = require('ramda'),
      stripJsonComments = require('strip-json-comments');
      
const functionList = R.keys(R);
const snippetfn = JSON.parse(stripJsonComments(fs.readFileSync('./javascript.json', 'utf8')));
const presentfn = R.values(R.map((snippet)=>snippet.prefix.substring(2), snippetfn));
const missingfn = R.difference(functionList,presentfn)

console.log(missingfn)

fs.writeFile("./missingfn.txt", missingfn, (err)=>{
    if(err) {
        return console.log(err);
    }

    console.log("missingfn has been saved to text file");
}); 
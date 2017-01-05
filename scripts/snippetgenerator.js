/***
 *  This file is used to generate snippets from JSDOCS of RamdaJS
 *  
 * */

const R = require('ramda'),
     fs = require('fs') ;

let snippets = {};
const filepahts = fs.readdirSync('../node_modules/ramda/src').filter(file => file.includes('.js'));

const docExtractor = (file) => {

  let filedata = fs.readFileSync('../node_modules/ramda/src/'+file, "utf-8");
  let comments = filedata
                    .split('/*')
                    .pop()
                    .split('*/')[0]
  
  file.replace('.js','');

  snippets[file.replace('.js','')] = {
                      "prefix": "R"+file.replace('.js',''),
                      "body":["R."+file.replace('.js','')+"($value)"],
                      "description":comments.replace(/[*]/g, '')
                    }
}

R.map(docExtractor,filepahts)

fs.writeFile("../snippets/snippet.json", JSON.stringify(snippets, null,2), (err)=>{
    if(err) {
        return console.log(err);
    }

    console.log("Snippets generated for Ramda");
});
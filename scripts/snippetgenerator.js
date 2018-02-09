/***
 *  This file is used to generate snippets from JSDOCS of RamdaJS
 **/

const R = require('ramda'),
     fs = require('fs') ;

let snippets = {};
const filepahts = fs.readdirSync('../node_modules/ramda/src').filter(file => file.includes('.js'));

/**
 * This extracts the jsdocs from given file
 * @param {String} file "Name of the ramda js function file"
 */
const docExtractor = file => {

  // read the file data
  let filedata = fs.readFileSync('../node_modules/ramda/src/'+file, "utf-8");

  // extract comment section
  let comments = filedata
                    .split('/**')
                    .pop()
                    .split('*/')[0]
                    .replace(/[*]/g, '')
  
  file.replace('.js','');

  // get argument list for the functions
  let params = comments.match(/\s@param {([^}]*)}/g)

   if(params!==null)
     params = params.map(x=>x.replace(' @param ','')
                    .replace('{','')
                    .replace('}',''))
   else
     params = []

  console.log(file, params)
  

  snippets[file.replace('.js','')] = {
                      "prefix": "R" + file.replace('.js',''),
                      "body":["R." + file.replace('.js','') + "("+
                                     params.reduce((acc,val, i) => {
                                      if(val==='') val='[any]'
                                      return i!==0 ? acc +', $'+ val : '$'+ val
                                     }
                                      ,'') + ")" ],
                      "description":comments
                    }
}

// Map all the files in the src and extract jsdocs for it
R.map(docExtractor,filepahts)

// write the extracted docs back to the the file
fs.writeFile("../snippets/snippets.json", JSON.stringify(snippets, null,2), (err)=>{
    if(err) {
        return console.log(err);
    }

    console.log("Snippets generated for Ramda");
});

var readline = require('readline');
var fs= require('fs');

var fRead = readline.createInterface({
  input: fs.createReadStream('./taxon_orig.txt')
});

var wStream = fs.createWriteStream('./taxon_new.txt');

var idx = 0;
fRead.on('line', function (row) {
    idx++;
    //<id index="0" />
    //<field index="1" term="http://rs.tdwg.org/dwc/terms/taxonID"/>
    var arr = row.split("\t");
    var mod = arr.slice(); //using .slice() copies by value, not by reference
    mod.splice(1, 1, `ITIS-${mod[1]}`);
    var out = mod.join("\t");
    wStream.write(`${out}\n`);
    //console.log(`Line ${idx} Length: ${mod.length} => mod: ${mod}`);
});

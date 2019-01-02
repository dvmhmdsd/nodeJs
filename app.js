var events = require('events');
var util = require('util');
var fs = require('fs');
var http = require('http');

//to make acustom event and emit it
var emitter = new events.EventEmitter();

emitter.on('someEvent', function(mssge) { //create the event
    console.log(mssge);
});

emitter.emit('someEvent', 'i\'ve been emitted'); //emit it

// to use util.inherits
function Person(name) {
    this.name = name;
}

util.inherits(Person, events.EventEmitter); // to inherit our event emitter in our constructor function

var james = new Person('James');
var mohamed = new Person('mohamed');

var people = [james, mohamed];

people.forEach(function(person) {
    person.on('speak', function(mssge) {
        //console.log(`${person.name} said: ${mssge}`);
    })
});

james.emit('speak', 'hello from node js');

// read and write files
//var read = fs.readFileSync('readme.txt', 'utf8');

//fs.writeFileSync('writeme.txt', read);

fs.readFile('./readme.txt', 'utf8', function(err, data) {
    console.log(data);
});

console.log('test'); // this will run before the above method because it's async method




//remove a file
// fs.unlink('writme.txt');

// create dir
//fs.mkdirSync('stuff'); // it can be sync without Sync word

// remove dir
//fs.rmdirSync('stuff'); 

// create dir and remove it

/* fs.mkdir('stuff', function() {
    fs.readFile('readme.txt', 'utf8', function(err, data) {
        fs.writeFile('./stuff/writeMe.txt', data, function() {
            console.log('done!');
        });
    })
}) */

/* fs.unlink('./stuff/writeMe.txt', function() {
    fs.rmdir('./stuff', function() {
        return 'done';
    })
}); */


//create a server
/* 
var server = http.createServer(function(req, res) {
    console.log('you requested: ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('hey from the server !');
});

server.listen(3000, '127.0.0.1'); */

/* var readStream = fs.createReadStream(__dirname + '/readme.txt', 'utf8');
var writeStream = fs.createWriteStream(__dirname + '/writeMe.txt'); */

/* readStream.on('data', function(chunk) {
    //console.log(chunk);
    writeStream.write(chunk);
}); */

//readStream.pipe(writeStream);

/* var server = http.createServer(function(req, res) {
    console.log('you requested: ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});

   var readStream = fs.createReadStream(__dirname + '/readme.txt', 'utf8');

    readStream.pipe(res);
});

server.listen(3000, '127.0.0.1'); */


/* // to serve a html file
var server = http.createServer(function(req, res) {
    console.log('you requested: ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/html'});

   var readStream = fs.createReadStream(__dirname + '/index.html', 'utf8');

    readStream.pipe(res);
});

server.listen(3000, '127.0.0.1'); */


/* // to serve a json file
var server = http.createServer(function(req, res) {
    console.log('you requested: ' + req.url);
    res.writeHead(200, {'Content-Type': 'application/json'});

    var object = {
        name: 'mohamed',
        age: 19
    };

    res.end(JSON.stringify(object));

});

server.listen(3000, '127.0.0.1'); */

//to set a routing
var server = http.createServer(function(req, res) {
    console.log('you requested: ' + req.url);
    
    if (req.url === '/' || req.url === '/home') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var stream = fs.createReadStream(__dirname + '/index.html');

        stream.pipe(res);
    } else if (req.url === '/story') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        var stream = fs.createReadStream(__dirname + '/readme.txt');

        stream.pipe(res);
    } else if (req.url === '/api') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        var object = [{name: 'mohamed', age: 27}, {name: 'ahmed', age: 29}];

        res.end(JSON.stringify(object));
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});

        res.end('Oops! something went wrong');
    }

});

server.listen(3000, '127.0.0.1'); 
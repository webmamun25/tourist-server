"use strict";

var express = require('express');

var app = express();
var port = process.env.PORT || 7000;

var cors = require('cors');

var _require = require('mongodb'),
    MongoClient = _require.MongoClient;

var ObjectId = require('mongodb').ObjectId;

require('dotenv').config();

var bodyParser = require('body-parser');

var req = require('express/lib/request');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var uri = "mongodb+srv://".concat(process.env.DB_USER, ":").concat(process.env.DB_PASS, "@cluster0.eorxc.mongodb.net/VacationDB?retryWrites=true&w=majority");
var client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: false
});
console.log(uri);
app.get('/', function (req, res) {
  res.send('Hello World!');
});

function run() {
  var database, PlaceCollection, OrderCollection;
  return regeneratorRuntime.async(function run$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(client.connect());

        case 3:
          database = client.db('VacationDB'); // Specifying a Schema is optional, but it enables type hints on
          // finds and inserts

          PlaceCollection = database.collection('Places');
          OrderCollection = database.collection('Orders');
          app.get('/places', function _callee(req, res) {
            var result;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(PlaceCollection.find({}).toArray());

                  case 2:
                    result = _context.sent;
                    res.send(result);

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });
          app.post('/placeorder', function _callee2(req, res) {
            var result;
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return regeneratorRuntime.awrap(OrderCollection.insertOne(req.body));

                  case 2:
                    result = _context2.sent;
                    res.send(result);

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          });
          app.post('/newservice', function _callee3(req, res) {
            var result;
            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return regeneratorRuntime.awrap(PlaceCollection.insertOne(req.body));

                  case 2:
                    result = _context3.sent;
                    res.json(result);

                  case 4:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          });
          app.get('/myorders/:useremail', function _callee4(req, res) {
            var result;
            return regeneratorRuntime.async(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return regeneratorRuntime.awrap(OrderCollection.find({
                      useremail: req.params.useremail
                    }).toArray());

                  case 2:
                    result = _context4.sent;
                    res.send(result);

                  case 4:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          });
          app.get('/myorders', function _callee5(req, res) {
            var result;
            return regeneratorRuntime.async(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return regeneratorRuntime.awrap(OrderCollection.find({}).toArray());

                  case 2:
                    result = _context5.sent;
                    res.send(result);

                  case 4:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          });
          app["delete"]('/myorders/:useremail/:id', function _callee6(req, res) {
            var id, query, result;
            return regeneratorRuntime.async(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    id = req.params.id;
                    query = {
                      _id: id
                    };
                    _context6.next = 4;
                    return regeneratorRuntime.awrap(OrderCollection.deleteOne(query));

                  case 4:
                    result = _context6.sent;
                    console.log(result);
                    res.send(result);

                  case 7:
                  case "end":
                    return _context6.stop();
                }
              }
            });
          });
          app["delete"]('/myorders/:id', function _callee7(req, res) {
            var id, query, result;
            return regeneratorRuntime.async(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    id = req.params.id;
                    query = {
                      _id: id
                    };
                    _context7.next = 4;
                    return regeneratorRuntime.awrap(OrderCollection.deleteOne(query));

                  case 4:
                    result = _context7.sent;
                    console.log(result);
                    res.send(result);

                  case 7:
                  case "end":
                    return _context7.stop();
                }
              }
            });
          });

        case 13:
          _context8.prev = 13;
          return _context8.finish(13);

        case 15:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0,, 13, 15]]);
}

run()["catch"](console.dir);
app.listen(port, function () {
  console.log("Example app listening at http://localhost:".concat(port));
});
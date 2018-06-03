"use strict";

const http = require('http');
const async = require('async');

function Options(p, m) {
    this.hostname = 'localhost';
    this.port = 5984;
    this.method = m || 'GET';
    this.path = p || '/userdb';
}

function User(name, password) {
    this.username = name;
    this.password = password;
}
/*
 * callback's descriptor: (Error, User) => void
 */
exports.get = function(id, callback) {
    const opt = new Options('/userdb/' + id);
    const request = http.request(opt, resp => {
        let result = '';
        resp.on('error', callback);
        resp.on('data', data => result += data);
        resp.on('end', () => callback(null, JSON.parse(result)));

    });
    request.on('error', callback);
    request.end();
};

/*
 * callback's descriptor: (Error, User[]) => void
 */
exports.getAll = function(callback) {
    const opt = new Options('/userdb/_all_docs');
    let operations = [];
    const request = http.request(opt, resp =>
    {
        let result = '';
        resp.on('error', callback);
        resp.on('data', data => result += data);
        resp.on('end', ()=>
        {
            result = JSON.parse(result);
            for(let val of result.rows){
                operations.push((finish) => exports.get(val.id, finish));
            }
            async.parallel(operations,callback);
        });
    });
    request.on('error', callback);
    request.end();
};

exports.insert = function(userName, userPassword, callback) {
    const opt = new Options('/userdb', 'POST');
    opt.headers = { 'Content-Type': 'application/json'};
    const request = http.request(opt, resp => {
        let result = '';
        resp.on('error', callback);
        resp.on('data', data => result += data);
        resp.on('end', () => callback(null))
    });
    const u = new User(userName,userPassword);
    request.write(JSON.stringify(u));
    request.on('error', callback);
    request.end();
};
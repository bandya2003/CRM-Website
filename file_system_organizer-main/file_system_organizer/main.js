#!/usr/bin/env node
let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");
let helpObj = require("./commands/help");
let treeObj = require("./commands/tree");
let organizeObj = require("./commands/organize");
// console.log(inputArr);
// 1st kind of i/p we will be using - node main.js tree "dirpath"
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
};
let command = inputArr[0];
switch(command){
    case "tree":
        treeObj.treekey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizekey(inputArr[1]);
        break;
    case "help":
        helpObj.helpkey();
        break;
    default:
        console.log("Input a valid Command");
        break; 
}



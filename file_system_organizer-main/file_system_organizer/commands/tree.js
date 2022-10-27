let fs = require("fs");
let path = require("path");
function treeFn(dirPath){
    if(dirPath == undefined)
    {
        treeHelper(process.cwd(),"");
    }
    else{
        let doesExist = fs.existsSync(dirPath);
        if(doesExist)
        {
            treeHelper(dirPath,"");
        }
        else{
            console.log("Kindly Enter the correct Path");
        }
    }
}
function treeHelper(dirPath,indent){
    let stat = fs.lstatSync(dirPath).isDirectory();
    if(!stat)
    {
        let fileName = path.basename(dirPath);
        console.log(indent+"├──"+fileName);
        return ;
    }
    else{
        let dirName = path.basename(dirPath);
        console.log(indent+"├──"+dirName);
        let child = fs.readdirSync(dirPath);
        for(let i = 0; i<child.length; ++i)
        {
            let childAdd = path.join(dirPath,child[i]); 
            treeHelper(childAdd,indent+"\t");
        }
        return;
    }
}

module.exports = {
    treekey: treeFn
}
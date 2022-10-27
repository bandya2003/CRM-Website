let fs = require("fs");
let path = require("path");
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
};
function organizeFn(dirPath){
    if(dirPath == undefined)
    {
        dirPath = process.cwd();
        // console.log("Please Provide the file path");
    }
    let valid = fs.existsSync(dirPath);
    if(valid)
    {
       let Path = path.join(dirPath,"organized");
       let PathValid = fs.existsSync(Path);
    //    console.log(PathValid);
    //    console.log(Path);
       if(!PathValid)
       {
        fs.mkdirSync(Path);
        console.log("Folder created");
       }
       addFiles(dirPath,Path);
    }
    else{
        console.log("Please Enter the correct Path")
    }

}
function addFiles(src, dest)
{   
    let files = fs.readdirSync(src);
    for(let i = 0; i<files.length; ++i)
    {
        let srcfilePath = path.join(src,files[i]);
        let isFile = fs.lstatSync(srcfilePath).isFile();
        // console.log(types);
        if(isFile){
        let type = path.extname(srcfilePath).slice(1);
        let ext = category(type);
        let desfilePath = path.join(dest,ext);
        let exist = fs.existsSync(desfilePath);
        if(!exist)
        fs.mkdirSync(desfilePath);
        // console.log(srcfilePath,"\n",desfilePath);
        let actual = path.join(desfilePath,files[i]);
        // console.log(actual);
        if(fs.existsSync(actual) == false){
        fs.copyFileSync(srcfilePath,actual);
        console.log(files[i]," Copying to -> ",ext);
        fs.unlinkSync(srcfilePath);}
        }
    }
    // we will leave all the folders as it is
    // console.log(files);

}
function category(type){
    for(let i in types)
    {
        let cTypeArr = types[i];
        for(let j = 0; j<cTypeArr.length; ++j){
            if(type == cTypeArr[j])
             return i;
        }
    }
    return "others"; 
}
module.exports = {
    organizekey: organizeFn
}

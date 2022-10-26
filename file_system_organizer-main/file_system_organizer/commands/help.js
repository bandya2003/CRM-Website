function helpFn(){
    console.log(`
    List of Command :
    ranjit help 
    ranjit organize "dirPath" [will organize files in the directory based on extension]
    ranjit organize           [will work with the same directory you are currently at]
    ranjit tree               [will work with the same directory you are currently at]
    ranjit tree "dirPath"     [will present a tree structure of all the files and folders present inside of the directory path provided]
    `)
}
module.exports = {
    helpkey: helpFn
}

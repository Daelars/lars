import dirTree from "directory-tree";
import fs from "fs";

//import PATH from "path";
const tree = dirTree("./src/");
const result = JSON.stringify(tree, null, 2);
console.log(result);

fs.writeFileSync("tree.json", result);

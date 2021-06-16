
                    const fs = require("fs");

let rawData = fs.readFileSync("data/user.json");
let data = JSON.parse(rawData);

exports.putApi = (req, res) => {
    try{
        
    let found = data.find((user) => {
        return user.id == parseInt(req.body.id);
    });    
    
    //check if user found
    if(found) {
        var targetIndex = data.indexOf(found);
        var bodyKeys = Object.keys(req.body);
        bodyKeys.forEach(ele => {
            data[targetIndex][ele] = req.body[ele];
        })
        
        fs.writeFile("data/user.json", JSON.stringify(data), (err) => {
            if(err){ 
                throw err;
            }
        });
        if(JSON == "JSON"){
            res.status(200).json(data[targetIndex]);
        }else{
            res.send(JSON.stringify(found))
        }
    }
    else{ 
        res.sendStatus(404)};
}catch(ex){
    console.log(ex);
    res.sendStatus(500);
}
};
                    
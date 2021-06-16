
                    const fs = require("fs");
                    let rawData = fs.readFileSync("data/user.json");
                    let data = JSON.parse(rawData);
                    
                    exports.deleteApi = (req, res) => {
                        try{
                        let found = data.find((user) => {
                            return user.id === parseInt(req.body.id);
                        });
                    
                        if(found) {
                            var targetIndex = data.indexOf(found);
                            data.pop(targetIndex);
                            fs.writeFile("data/user.json", JSON.stringify(data), (err) => {
                                if(err){
                                    throw (err);
                                }
                            });
                            if(JSON == "JSON"){
                                res.status(200).json(data[targetIndex]);
                            }else{
                                res.send(JSON.stringify(data[targetIndex]))
                            }
                        }
                        else{
                            res.sendStatus(404)};
                    }catch(ex){
                        console.log(ex);
                        res.sendStatus(500);
                    }
                    };
                    
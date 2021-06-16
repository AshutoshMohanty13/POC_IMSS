
                const fs = require("fs");

                let rawData = fs.readFileSync("data/user.json");
                let data = JSON.parse(rawData);

                exports.getApi = (req, res) => {
                    try{
                        let found = data.find((user) => {
                        return parseInt(user.id) === parseInt(req.body.id);
                    });

                    if(found) {
                        if(JSON == "JSON"){
                            res.status(200).json(found);
                        }else{
                            res.send(JSON.stringify(found))
                        }
                    }
                    else {
                        res.sendStatus(404)};
                    }catch(ex){
                        console.log(ex);

                        res.sendStatus(500);
                        }
                    };
                
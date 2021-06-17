
                                const fs = require("fs");
            
                                let rawData = fs.readFileSync("data/user.json");
                                let data = JSON.parse(rawData);
            
            
                                exports.postApi = (req, res) => {
            
                                try {
                                    data.push(req.body);
                                    fs.writeFile("data/user.json", JSON.stringify(data), (err) => {
                                        if (err) {
                                            throw err;
                                        }
                                    });
                                    if(JSON == "JSON"){
                                        res.status(200).json(req.body);
                                    }else{
                                        res.send(JSON.stringify(req.body))
                                    }
                                } catch (ex) {
                                        res.sendStatus(500);
                                }
                            };
                                
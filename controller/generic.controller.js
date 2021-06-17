const axios = require('axios');
const fs = require('fs');


class GenericController{
    create(){
        return async (req, res) => {
            try{
                if(req.body.method.toLowerCase() == 'all'){
                    let methodsArray = ['get', 'post', 'put', 'delete'];
                    methodsArray.forEach(ele => {
                        req.body.method = ele;
                        req.body.url = '/'+ele;
                        switch(req.body.method.toLowerCase()){
                            case 'get': 
                            var content = `
                            const fs = require("fs");
            
                            let rawData = fs.readFileSync("data/user.json");
                            let data = JSON.parse(rawData);
            
                            exports.${req.body.method}Api = (req, res) => {
                                try{
                                    let found = data.find((user) => {
                                    return parseInt(user.id) === parseInt(req.body.id);
                                });
            
                                if(found) {
                                    if(${req.body.resType} == "JSON"){
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
                            `
                            break;
                            case 'post': 
                            var content = `
                                const fs = require("fs");
            
                                let rawData = fs.readFileSync("data/user.json");
                                let data = JSON.parse(rawData);
            
            
                                exports.${req.body.method}Api = (req, res) => {
            
                                try {
                                    data.push(req.body);
                                    fs.writeFile("data/user.json", JSON.stringify(data), (err) => {
                                        if (err) {
                                            throw err;
                                        }
                                    });
                                    if(${req.body.resType} == "JSON"){
                                        res.status(200).json(req.body);
                                    }else{
                                        res.send(JSON.stringify(req.body))
                                    }
                                } catch (ex) {
                                        res.sendStatus(500);
                                }
                            };
                                `
                                break;
                                case 'put': 
                                var content = `
                                const fs = require("fs");
            
                                let rawData = fs.readFileSync("data/user.json");
                                let data = JSON.parse(rawData);
            
                                exports.${req.body.method}Api = (req, res) => {
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
                                        if(${req.body.resType} == "JSON"){
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
                                `
                                break;
                                case 'delete':
                                    var content = `
                                const fs = require("fs");
                                let rawData = fs.readFileSync("data/user.json");
                                let data = JSON.parse(rawData);
                                
                                exports.${req.body.method}Api = (req, res) => {
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
                                        if(${req.body.resType} == "JSON"){
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
                                `
                                break;
            
            
            
                        }
            
                            //router content
                            var routeContent = `
                            const ${req.body.method}Controller = require('../controller/${req.body.method}.controller');
            
                            router.${req.body.method}('${req.body.url}', ${req.body.method}Controller.${req.body.method}Api);
                            `
            
                            //appending the routes to the router.
                            fs.appendFile('routes/generic.route.js',routeContent, (err) => {
                                if(err) throw err;
                            })
                           fs.writeFile(`controller/${req.body.method}.controller.js`, content, (err) => {
                               if(err) throw err;
                               res.send("API CREATED");
                           })

                    })
                }
                else{
                    switch(req.body.method.toLowerCase()){
                        case 'get': 
                        var content = `
                        const fs = require("fs");
        
                        let rawData = fs.readFileSync("data/user.json");
                        let data = JSON.parse(rawData);
        
                        exports.${req.body.method}Api = (req, res) => {
                            try{
                                let found = data.find((user) => {
                                return parseInt(user.id) === parseInt(req.body.id);
                            });
        
                            if(found) {
                                if(${req.body.resType} == "JSON"){
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
                        `
                        break;
                        case 'post': 
                        var content = `
                            const fs = require("fs");
        
                            let rawData = fs.readFileSync("data/user.json");
                            let data = JSON.parse(rawData);
        
        
                            exports.${req.body.method}Api = (req, res) => {
        
                            try {
                                data.push(req.body);
                                fs.writeFile("data/user.json", JSON.stringify(data), (err) => {
                                    if (err) {
                                        throw err;
                                    }
                                });
                                if(${req.body.resType} == "JSON"){
                                    res.status(200).json(req.body);
                                }else{
                                    res.send(JSON.stringify(req.body))
                                }
                            } catch (ex) {
                                    res.sendStatus(500);
                            }
                        };
                            `
                            break;
                            case 'put': 
                            var content = `
                            const fs = require("fs");
        
                            let rawData = fs.readFileSync("data/user.json");
                            let data = JSON.parse(rawData);
        
                            exports.${req.body.method}Api = (req, res) => {
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
                                    if(${req.body.resType} == "JSON"){
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
                            `
                            break;
                            case 'delete':
                                var content = `
                            const fs = require("fs");
                            let rawData = fs.readFileSync("data/user.json");
                            let data = JSON.parse(rawData);
                            
                            exports.${req.body.method}Api = (req, res) => {
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
                                    if(${req.body.resType} == "JSON"){
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
                            `
                            break;
        
        
        
                    }
        
                        //router content
                        var routeContent = `
                        const ${req.body.method}Controller = require('../controller/${req.body.method}.controller');
        
                        router.${req.body.method}('${req.body.url}', ${req.body.method}Controller.${req.body.method}Api);
                        `
        
                        //appending the routes to the router.
                        fs.appendFile('routes/generic.route.js',routeContent, (err) => {
                            if(err) throw err;
                        })
                       fs.writeFile(`controller/${req.body.method}.controller.js`, content, (err) => {
                           if(err) throw err;
                           res.send("API CREATED");
                       })
                }
            
            }catch(err){
                res.send(err.message);
            }
        }
    }

}

module.exports = GenericController;
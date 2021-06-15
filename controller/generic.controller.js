const axios = require('axios');

class GenericController{
    create(){
        return async (req, res) => {
            try{
                var config = {
                    method: req.body.method,
                    url: req.body.url,
                    headers: { 
                      'Content-Type': 'application/json'
                    },
                    data : JSON.stringify(req.body.params)
                  };
                  console.log(config);
                  
                
                axios(config)
                .then(function (response) {
                if(req.body.resType == 'JSON'){
                    res.send(response.data);
                }else{
                    res.send(JSON.stringify(response.data));
                }
                    })
                .catch(function (error) {
                console.log(error.message);
                });
            }catch(err){
                res.send(err.message);
            }
        }
    }

}

module.exports = GenericController;
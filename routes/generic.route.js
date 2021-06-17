const express = require('express');
const router = new express.Router();
const axios = require('axios');
const fs = require('fs');
const GenericController = require('../controller/generic.controller');


router.post('/generic', new GenericController().create());

module.exports = router;
                            
            
                            const getController = require('../controller/get.controller');
            
                            router.get('/get', getController.getApi);
                            
                            const deleteController = require('../controller/delete.controller');
            
                            router.delete('/delete', deleteController.deleteApi);
                            
                            const postController = require('../controller/post.controller');
            
                            router.post('/post', postController.postApi);
                            
                            
                        const putController = require('../controller/put.controller');
        
                        router.put('/put', putController.putApi);
                        
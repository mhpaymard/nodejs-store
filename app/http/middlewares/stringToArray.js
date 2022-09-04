const stringToArray = (field)=>{
    return function(req,res,next){
        if(Array.isArray(field)){
            for(let fil of field){
                if(req.body[fil]){
                    if(typeof req.body[fil] == 'string'){
                        if(req.body[fil].indexOf('#')>=0){
                            req.body[fil] = (req.body[fil].split('#')).map(item => item.trim());
                        }
                    }else if(Array.isArray(req.body[fil])){
                        req.body[fil] = req.body[fil].map(item => item.trim());
                    }
                }else{
                    req.body[fil]=[];
                }
            }
        }else{
            if(req.body[field]){
                if(typeof req.body[field] == 'string'){
                    if(req.body[field].indexOf('#')>=0){
                        req.body[field] = (req.body[field].split('#')).map(item => item.trim());
                    }
                }else if(Array.isArray(req.body[field])){
                    req.body[field] = req.body[field].map(item => item.trim());
                }
            }else{
                req.body[field]=[];
            }
        }
        next();
    }
}
module.exports = {
    stringToArray
}
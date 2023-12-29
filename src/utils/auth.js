const isAuthorized = (req,res, next) => {
    if(req.user){
        next();
    } else {
        res.redirect('/')
    }
}

const isNotAuthorized = (req, res, next) => {
    if(req.user){
        res.redirect('/session')
    } else {
        next();
    }
}

module.exports = {
    isAuthorized,
    isNotAuthorized
}
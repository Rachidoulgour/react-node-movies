function saveUser(req, res){
    let params = req.body;
    const user = new User();
    if(params.username && params.email && params.password){
        user.username = params.username;
        user.email = params.email;
        user.password = params.password;
        user.role = 'ROLE_USER';
        user.terms = params.conditions;
        user.avatar = null;
        user.confirmedEmail=false

        User.find({$or:[
            {email: user.email.toLowerCase()},
            {username: user.username.toLowerCase()}
        ]}).exec((err, users)=>{
            if(err) return res.status(500).send({
                message: 'error a la peticion de usuarios'
            })
            if(users && users.length>=1){
                return res.status(200).send({
                    message:'El usuario ya esta registrado'
                })
            }else{
                bcrypt.hash(params.password, 10, (err, hash)=>{
                    user.password = hash;
        
                    user.save((err, userSaved) => {
                        if(err) return res.status(500).send({
                            message:'error al guardar usuario'
                        });
                        if(userSaved){
                            
                            res.json({token: token, 
                                user:userSaved,
                            message:"Usuario regitstrado"});;
                        }else{
                            res.status(404).send({
                                message: 'no se ha registrado el usuario'
                            })
                        }
                    });
                })
            }
        });

        
    }else{
        res.status(200).send({
            message: 'rellena todos los campos'
        })
    }
}


module.exports = {
    saveUser
    
}
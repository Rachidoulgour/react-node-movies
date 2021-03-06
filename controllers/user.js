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

function login(req, res) {
    const params = req.body;
    const email = params.email;

    const password = params.password;

    User.findOne({
        email: email
    }, (err, user) => {
        if (err) return res.status(500).send({
            message: 'error en la petición'
        });
        //console.log("Error",err)
        if (user) {
            if(user.confirmedEmail === false){
                return res.status(501).send({
                    message: 'tienes que confirmar el email'
                })
            }else if(user.is_eliminated===true){
                return res.status(501).send({
                    message: 'No estás registrado'
                })
            }else{
            
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    user.password = undefined;
                    const token = jwt.sign({
                        _id: user._id
                    }, process.env.TOKEN_SECRET || "Tokenimage", {
                        expiresIn: 60 * 60 * 24
                    });
                    
                    {
                        res.json({
                            token: token,
                            user: user
                        });
                    }

                } else {
                    return res.status(404).send({
                        message: 'no se ha podido identificar'
                    })
                }
            });
        }
        } else {
            return res.status(404).send({
                message: 'El usuario no se ha podido identificar'
            })
        }
    })
}


module.exports = {
    saveUser,
    login
    
}
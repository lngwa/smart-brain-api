const handleSignIn = (req, res, db, bcrypt) => {
	const {email, password} = req.body;
	if(!email || !password){
		return res.status(400).json("invalid form submission");
	}
	db('login').select(['email', 'hash'])
	.where({email})
	.then(credential => {
		if(credential.length > 0 && bcrypt.compareSync(password, credential[0].hash)){
			return db('users').select('*').where({email})
					.then(user => res.json(user[0]))
					.catch(err => res.status(400).json("unable to get user"))
		}
		else{
			throw new Error("wrong credentials")
		}
	})
	.catch(err => res.status(400).json("Wrong credentials"));
	
	
}

module.exports = {
	handleSignIn: handleSignIn
}
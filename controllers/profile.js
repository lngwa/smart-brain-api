const Clarifai = require("clarifai");
const app = new Clarifai.App({
	apiKey: "4ea42f77b34d4627a91a1bcbe614da78",
});

const handleFaceDetect = (req, res) => {
	const {imgUrl} = req.body;
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL,imgUrl)
	.then(data => res.json(data))
	.catch(err => res.json("Error detecting face"))
}

const handleProfile = (req, res, db) => {
	const {id} = req.params;
	let found = false;
	db.select('users')
	.where({'id': id})
	.then(user => {
		if(user.length > 0){
			res.json(user[0]);
		}
		else{
			res.status(404).json("User not found");
		}
	})
	.catch(err => res.status(400).json("Error getting user"));
}

const handleImage = (req, res, db) => {
	const {id} = req.body;
	let found = false;
	db('users')
	.where({id})
	.increment('entries')
	.returning('entries')
	.then(entries => {
		if(entries.length > 0){
			res.json(Number(entries[0]));
		}
		else{
			res.status(404).json("User not found");
		}
	})
	.catch(err => res.status(400).json("Error getting user"));
}

module.exports = {
	handleProfile: handleProfile,
	handleImage: handleImage,
	handleFaceDetect
}
let express = require("express");
let app = express();
let port = 8080;
let mongose = require("mongoose");
let bodyParser = require("body-parser");
let cors = require("cors");
let jwt = require("jsonwebtoken");
let multer = require("multer");
const cloudinary = require('cloudinary').v2;
let uniquvalidator = require("mongoose-unique-validator");

///midlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
/////////////////multer img upload ////////////cloudinary
cloudinary.config({
    cloud_name: 'dm0thlxai',
    api_key: '583765424425853',
    api_secret: 'brfFu8p3eAEMmLWOaMcUxtyL96s'
});
let storage = multer.memoryStorage();
let upload = multer({ storage: storage });
//mongose connection
let url = "mongodb+srv://fakirmuzaffar771:Muzaffar@cluster0.dfdbeo9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongose.connect(url).then(() => {
    console.log("connected succesfully")
}).catch((er) => {
    console.log("error ");

})
/////////schemas
let date = new Date();
const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

let userSchemas = new mongose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    pass: String,
    des: String,
    Con: String,
    date: String,
    img: String,
    posts: [
        {
            text: String,
            Postimg: String
        }

    ]


})
let userMongoseSchema = new mongose.model("userSchema", userSchemas);

/////routes
app.post("/signData", (req, res) => {
    let data = new userMongoseSchema({
        name: req.body.name,
        email: req.body.email,
        pass: req.body.pass,
        des: req.body.des,
        Con: req.body.con,
        img: "",
        date: formattedDate,
        posts: [{
            text: "hello",
            Postimg: "hello"
        }]


    })
    data.save().then((re) => { res.send("valid"); }).catch((er) => {
        res.send("invalid");
    })


})
app.post("/imgData", upload.single("img"), async (req, res) => {
    try {
        let id = req.body.id;
        if (!mongose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("error")

        }
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
            if (error) {
                return res.status(500).send(error);
            } await userMongoseSchema.updateOne({ _id: id }, { $set: { img: result.secure_url } }, { upsert: true })
            let data = await userMongoseSchema.findById(id);
            res.send(data.img)
        }).end(req.file.buffer);

    } catch (er) {
        console.log(er)

    }

})

app.post("/LoginDta", (req, res) => {
    let email = req.body.email
    let pass = req.body.pass
    userMongoseSchema.findOne({ email: email, pass: pass }).then((data) => {
        if (data) {
            let token = jwt.sign({ id: data._id }, "mujuukey")
            res.json({ mess: "hai", token: token, data: data })
        }
        else {
            res.json({ mess: "nahi" })
        }

    }).catch((er) => {
        console.log(er)
    })




})
let id;
app.post("/posts", upload.single("postimg"), async (req, res) => {
    id = req.body.id;
    if (!mongose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("error")
    }
    cloudinary.uploader.upload_stream({ resource_type: "image" }, async (er, result) => {
        if (er) {
            return res.status(400).send("error!");
        }
        await userMongoseSchema.updateOne({ _id: id },
            { $push: { posts: { text: req.body.text, Postimg: result.secure_url } } },
            { upsert: true })
        let data = await userMongoseSchema.findById(id, "posts");
        res.send(data);
        //  console.log(data.posts)

    }).end(req.file.buffer);


})
app.get("/postGet", async (req, res) => {
    let id = req.query.id;
    let data = await userMongoseSchema.findById(id);
    let p = data.posts.slice(1);
    res.send(p)
});

app.post("/del", async (req, res) => {
    let id = req.body.id;
    let pid = req.body.pid;

    await userMongoseSchema.updateOne({ _id: pid }, { $pull: { posts: { _id: id } } }, { upsert: true }).catch((er) => { console.log(er) })


});
app.get("/Allposts", async (req, res) => {
    try {
        let d = await userMongoseSchema.find();
        let dpost=d.flatMap((el)=>el.posts.slice(1));
        res.send(dpost)


    } catch (er) {
        console.log(er)

    }



})

app.listen(port)

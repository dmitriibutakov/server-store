const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3010
app.use(cors())

const jsonParser = bodyParser.json()
const login = process.env.SMTP_LOGIN
const password = process.env.SMTP_PASSWORD
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: login, // generated ethereal user
        pass: password, // generated ethereal password
    }
})

app.post('/sendMessage', jsonParser, async function (req, res) {
    const {name, email, number, message} = req.body
    let info = await transporter.sendMail({
        from: `${name}`, // sender address
        to: "sportyounde@gmail.com", // list of receivers
        subject: "support ISTORE", // Subject line
        html: `<b>Name:</b> ${name}<br>
<b>contact me to email:</b>${email}<br>
<b>my number:</b>${number}<br>
<b>addition message:</b>${message}`, // html body
    });
    res.send(req.body)
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


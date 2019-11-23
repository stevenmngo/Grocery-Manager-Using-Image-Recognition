const express = require("express");
var router = express.Router();
var pool = require("../Utils/connect");


router.post("/createUser", (req, res) => {

    const data = req.body;

    const query = `INSERT INTO User VALUES ('${data.email}', '${data.password}')`;

    pool.query(
        query,
        function (error, results, fields) {
            if (error) {
                res.send(JSON.stringify({ "error": true }))

            } else {
                res.send(JSON.stringify({ "error": false, res: "success" }));
            }
        }
    );
});

router.post("/checkAuth", (req, res) => {

    const data = req.body;
    console.log(data);
    const query = `SELECT * FROM User WHERE email = '${data.email}' AND password = '${data.password}';`;
    console.log(query);
    pool.query(query, (err, rows) => {
        if (err) {
            res.send(JSON.stringify({ "error": true }))
        } else {
            if (rows.length === 0 ){
                console.log(rows);
                res.send(JSON.stringify({ "error": false, res: "None" }));
            }else {
                console.log(rows);
                res.send(JSON.stringify({ "error": false, res: "Yes"}));
            }


        }
    })
});

router.get("/checkEmail/:email",  (req, res) => {

    query = `SELECT * FROM User WHERE email = '${req.params.email }';`;
    // WHERE email = ${ req.params.email }

    console.log(query);
    pool.query(query, (err, rows) => {
        if (err){
            res.send(JSON.stringify({ "error": true}))
        }else if (rows.length ===0){
            res.send(JSON.stringify({ "error": false, res: "None" }));
        }else{
            res.send(JSON.stringify({ "error": false, res: "Yes"}));

        }
    })
})


module.exports = router;


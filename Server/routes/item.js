const express = require("express");
var router = express.Router();
var pool = require("../Utils/connect");


router.post("/addItem", (req, res) => {

    const data = req.body;
    var date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

    const query1 = `SELECT * FROM items WHERE date = '${date}' AND item = '${data.item}' AND email = '${data.email}';`
    const query2 = `INSERT INTO items VALUES ('${data.email}','${date}','${data.item}', '${data.amount}');`;
    const query3 = `UPDATE items SET amount = amount + ${data.amount} WHERE date = '${date}' AND item = '${data.item}' AND email = '${data.email}';`
    console.log(query1)
    pool.query(
        query1,
        (err, rows) => {
            if (err) {
                res.send(JSON.stringify({ "error": true }))
            } else if (rows.length === 0) {
                console.log(query2,)
                pool.query(
                    query2,
                    (err, rows) => {
                        if (err) {
                            console.log("ppppppp")
                            res.send(JSON.stringify({ "error": true }))

                        } else {
                            console.log("lllllls")
                            res.send(JSON.stringify({ "error": false, res: "Yes" }));
                        }
                    }
                )
                } else {
                console.log("2222")
                pool.query(
                    query3,
                    (err, rows) => {
                        if (err) {
                            res.send(JSON.stringify({ "error": true }))

                        } else {
                            console.log(rows);
                            res.send(JSON.stringify({ "error": false, res: "Yes" }));
                        }
                    }
                )
                }
        }
    );
});
router.post("/removeItem", (req, res) => {

    const data = req.body;
    var date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

    const query1 = `SELECT * FROM items WHERE  item = '${data.item}' AND email = '${data.email}' AND amount > 0 LIMIT 1;`
    const query3 = `UPDATE items SET amount = amount -1 WHERE  item = '${data.item}' AND email = '${data.email}' AND Amount >0;`
    console.log(query1)
    pool.query(
        query1,
        (err, rows) => {
            if (err) {
                res.send(JSON.stringify({ "error": true }))
            } else if (rows.length === 0) {
                console.log("111111")
                res.send(JSON.stringify({ "error": false, res: "No" }));

            } else {
                console.log("2222")
                pool.query(
                    query3,
                    (err, rows) => {
                        if (err) {
                            res.send(JSON.stringify({ "error": true }))

                        } else {
                            console.log(rows);
                            res.send(JSON.stringify({ "error": false, res: "Yes" }));
                        }
                    }
                )
            }
        }
    );
});
router.get("/getHistory/:email", (req, res) => {

    query = `SELECT * FROM items WHERE email = '${req.params.email}' ;`;
    // WHERE email = ${ req.params.email }

    console.log(query);
    pool.query(query, (err, rows) => {
        if (err) {
            res.send(JSON.stringify({ "error": true }))
            // }else if (rows.length ===0){
            //     res.send(JSON.stringify({ "error": false, res: rows }));
        } else {
            res.send(JSON.stringify({ "error": false, res: rows }));

        }
    })
})

router.get("/getInventory/:email",  (req, res) => {

    query = `SELECT * FROM items WHERE email = '${req.params.email }' AND amount > 0 ;`;
    // WHERE email = ${ req.params.email }

    console.log(query);
    pool.query(query, (err, rows) => {
        if (err){
            res.send(JSON.stringify({ "error": true}))
        // }else if (rows.length ===0){
        //     res.send(JSON.stringify({ "error": false, res: rows }));
        }else{
            res.send(JSON.stringify({ "error": false, res: rows}));

        }
    })
})


module.exports = router;


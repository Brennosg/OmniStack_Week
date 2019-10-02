const express = require('express');
const app = express();

//install in windows to future projects (insomnia.rest, add in chrome jsonviewer)

//req = requisition (get parameters)
//json = javascript object notation
// GET, POST, PUT, DELETE
//req.query = access query params (filter)
//req.params = access route params (edit and delete)
//req.body = access the requisition body (create, edit)

app.use(express.json());

app.post('/users', (req, res) => {
    // return res.json({ idade: req.query.idade });
    // return res.json({ id: req.params.id });
    return res.json(req.body);
});

app.listen(3333);
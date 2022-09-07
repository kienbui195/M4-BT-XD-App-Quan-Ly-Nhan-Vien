const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();
const port = 8000;
app.set('view engine', 'ejs');
app.set('views','./views');

app.get('/create', (req, res) => {
    res.render('addEmployee');
});
const employees = [];
app.post('/', upload.none(), (req, res) => {
    if (req.body.id && req.body.name  && req.body.department) {
        let employee = {
            id: req.body.id,
            name: req.body.name,
            department: req.body.department
        }

        employees.unshift(employee);
        res.render('listEmployee', {data: employees})
    } else {
        res.render('notFound');
    }
})

app.get('/' , (req, res) => {
    res.render('listEmployee' , {data: employees})
})

app.get('/delete', (req, res) => {
    let id = req.query.id;
    employees.splice(id - 1, 1);
    res.render('listEmployee', {data: employees});
})

app.listen(port, ()=> {
    console.log(`http://localhost:${port}`)
})
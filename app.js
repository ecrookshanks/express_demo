const Joi = require('joi');
const express = require('express');
const { array } = require('joi');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'Course 1'},
    {id: 2, name: 'Course 2'},
    {id: 3, name: 'Course 3'},
    {id: 4, name: 'Course 4'},
];

app.get('/', (req, res) =>{
    res.send('Hello from Node/Express!');
});

app.get('/api/courses', (req, res) =>{
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) =>{
    
    const courseId = parseInt(req.params.id);
    const course = courses.find(c => c.id === courseId);

    if (!course){
        res.status(404).send(`Course with ID of ${id} not found.`);
        return;
    }

    res.send(course);

});

app.post('/api/courses', (req, res) =>{
    
    const {error, value} = validateCourseInput(req.body);

    if (error){
        res.status(400).send(`Bad Request: ${error.message}`);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: value,
    }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) =>{

    const courseId = parseInt(req.params.id);
    const course = courses.find(c => c.id === courseId);

    if (!course){
        res.status(404).send(`Course with ID of ${id} not found.`);
        return;
    }

    const {error, value} = validateCourseInput(req.body);

    if (error){
        res.status(400).send(`Bad Request: ${error.message}`);
        return;
    }

    // update course
    course.name = value.name;

    // return course
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) =>{
    const courseId = parseInt(req.params.id);
    const course = courses.find(c => c.id === courseId);

    if (!course){
        res.status(404).send(`Course with ID of ${id} not found.`);
        return;
    }

    const index = courses.indexOf(courseId);
    courses.splice(index, 1);

    res.status(204); // successful, no content.
});

// Server section
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// helper functions
function validateCourseInput(input){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate({name: input.name });
}

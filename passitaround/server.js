const express = require ('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3003;

const fs = require('fs') // this engine requires the fs module like we did Saturday
app.engine('hypatia', (filePath, options, callback) => { // define the view engine called hypatia
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    // this is an extremely simple view engine we'll be more complex later
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>').replace('#content#','<div>'+ options.content + '</div>' )
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'hypatia') // register the hypatia view engine


//our routes
app.get('/', (req, res) => {
  res.send('"99 Bottles of beer on the wall" + <anchor><href="Take one down, pass it around"');
});

//add show route
app.get('/:number_of_bottles', (req, res) => {
  let number_of_bottles = req.params.number_of_bottles - 1
  res.render('template', { title: 'Bottles', message: req.params.number_of_bottles + ' Bottles of beer on the wall.'})
});


app.get('/0', (req, res) => {
  res.render('template', { title: 'Bottles Zero', message: 'No more bottles of beer on the wall.' + <anchor><href="Start Over with 99..."'})
})

//our port
app.listen(3000, () => {
    console.log('listening');
});
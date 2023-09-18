const path = require('path');
const fs = require('fs')

// allow for unique ids to be created
var uniqid = require('uniqid');

module.exports = (app) => {

    
    app.get('/api/notes', (req, res) => {
      res.sendFile(path.join(__dirname, '../db/db.json'));
    });
  
  
    app.post('/api/notes', (req, res) => {
      let db = fs.readFileSync('db/db.json');
      db = JSON.parse(db);
      res.json(db);
 
      let userNote = {
        title: req.body.title,
        text: req.body.text,
        id: uniqid(),
      };

      db.push(userNote);
      fs.writeFileSync('db/db.json', JSON.stringify(db));
      res.json(db);
  
    });
    
    app.delete('/api/notes/:id', (req, res) => {
        // reading notes form db.json
        let db = JSON.parse(fs.readFileSync('db/db.json'))
        // removing note with id
        let deleteNotes = db.filter(item => item.id !== req.params.id);
        // Rewriting note to db.json
        fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
        res.json(deleteNotes);
        
      })
};
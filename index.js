const app = require('express')();
const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${DATABASE_HOST}/test`,  { useNewUrlParser: true }).catch(console.error);
var Item = mongoose.model('Item', new mongoose.Schema({description: String}));
var itemInstance = new Item({description: 'this is an item'});
itemInstance.save().then(console.log).catch(console.error);

app.get('/', (req, res) => res.send('running on docker!'));
app.get('/items', (req, res) => Item
    .find()
    .then(items => res.send(items))
    .catch(error => res.send(error)
));
app.listen(process.env.PORT || 3000, () => console.log('Server running.'));
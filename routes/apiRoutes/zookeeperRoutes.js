const {  filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper 
} = require('../../lib/zookeepers');
const { zookeepers } = require('../../data/zookeepers.json');
const router = require('express').Router();

router.get('/zookeepers', (req, res) => {
    let results = zookeepers;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/zookeepers/:id', (req, res) => {
    const results = findById(req.params.id, animals);
    if (results) {
        res.json(results);
    } else {
        res.send(404);
    };
});

router.post('/zookeepers', (req, res) => {
    // set id based on what the next index will be
    req.body.id = zookeepers.length.toString();

    // validate data
    if (!validateZookeeper(req.body)){
        res.status(400).send('The zookeeper is not properly formatted.')
    } else {
        // add zookeeper to json file and animals array in this function
        const zookeeper = createNewZookeeper(req.body, zookeepers);

        res.json(zookeeper);
    };
});

module.exports = router;
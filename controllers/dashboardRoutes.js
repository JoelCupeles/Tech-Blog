const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        // Add any necessary logic to fetch data from the database if needed res.render('dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
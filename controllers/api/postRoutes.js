const router = require('express').Router();

router.get('/:id', async (req, res) => {
    try {
        
        res.render('single-post');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
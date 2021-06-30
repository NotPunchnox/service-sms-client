const router = require('express').Router(),
    request = require('request')


router.route('/').get((req, res)=> res.redirect('/login'))
router.route('/login').get((req, res) => res.render('login'))
router.route('/register').get((req, res) => res.render('register'))

router.route('/@me').get((req, res) => {
    if(!req.query.tkn) return res.redirect('/login')
    request.get('https://sms-receive-online-api.herokuapp.com/@me', {
        headers: {
            'token': req.query.tkn
        }
    }, (e, r) => {
        if (e) return res.render('error')
        if (JSON.parse(r.body).code !== 200) return res.redirect('/login')
        if (JSON.parse(r.body).token) return res.render('@me', {
            data: r.body
        })
    })
})

module.exports = router
exports.get404 = (req, res, next) => {
    res.status(404).render('404', 
    { 
        pageTitle: 'Page Not Found',
        path: '' 
    })
    //the way you pass data doesnot change with engine
    //res.status(404).sendFile(path.join(__dirname, 'views', 'error-page.html')); 
}


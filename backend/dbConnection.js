module.exports = function(mongoose) {

    const URI = "mongodb://localhost/relax-your-finger";

    mongoose.connect(URI, {useNewUrlParser: true}, 
        err => console.log("db connections .... ", err)
    );
}
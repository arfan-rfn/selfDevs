function Car(){
    this._milage = 590;

    Object.defineProperty(this, '_milage', {
        value: '200',
        writable: false
    });
}

Car.prototype.drive = function(miles){
    return this._milage += miles;
};



module.exports = Car;




module.exports = class {
    constructor(cb){
        this.callback = cb;
        this.observers = [];
        this.isStarted = false;
    }

    start(){
        this.isStarted = true;
    }

    addObserver(observer){
        this.observers.push(observer);
    }

    removeObserver(observer){
        let index = this.observers.findIndex(item => item === observer);
        this.observers.splice(index, 1);
        this.isComplited();
    }

    isComplited(){
        if(this.isStarted && this.observers.length == 0){
            this.callback();
        }
    }
}


class BaseRepository {
    
    constructor(model) {
        Object.defineProperty(this, "_model", {
            value: model,          
            writable: false,       
            configurable: false,   
        });
    }

    async getById(id) {
        return await this._model.findById(id);
    }

    async query(queryObject) {
        return await this._model.find(queryObject);
    }
}

export default BaseRepository;
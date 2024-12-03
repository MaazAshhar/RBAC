

class BaseRepository {
    
    constructor(model) {
        Object.defineProperty(this, "_model", {
            value: model,          
            writable: false,       
            configurable: false,   
        });
    }

    async save(entity) {
        await entity.save();
    }

    async getById(id) {
        return await this._model.findById(id);
    }

    async getOne(filter) {
        return await this._model.findOne(filter);
    }

    async query(queryObject) {
        return await this._model.find(queryObject);
    }
}

export default BaseRepository;
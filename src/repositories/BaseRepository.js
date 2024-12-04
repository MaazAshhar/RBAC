

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

    async getById(id, select=null) {
        if (select) {
            return await this._model.findById(id).select(select);
        }
        return await this._model.findById(id);
    }

    async getOne(filter, select=null) {
        if (select) {
            return await this._model.findOne(filter).select(select);
        }
        return await this._model.findOne(filter);
    }

    async query(queryObject, select=null) {
        if (select) {
            return await this._model.find(queryObject).select(select);
        }
        return await this._model.find(queryObject);
    }

    async getAll(select=null){
        if (select) {
            return await this._model.find().select(select);
        }
        return await this._model.find();
    }
}

export default BaseRepository;
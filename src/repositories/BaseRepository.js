

class BaseRepository {
    
    constructor(model) {
        Object.defineProperty(this, "_model", {
            value: model,          
            writable: false,       
            configurable: false,   
        });
    }

    async save(entity) {
        return await entity.save();
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


    async deleteOne(filter){
        return await this._model.deleteOne(filter);
    }

    async updateOne(filter,payload){
        return await this._model.updateOne(filter,payload);
    }

    async updateById(id, payload) {
        const updatedEntity = await this._model.findByIdAndUpdate(
            id,
            payload,
            { new: true } // Return the updated document
        );
        return updatedEntity;
    }
}

export default BaseRepository;
const service = require('./../../services/Store');

module.exports = {
    Query: {
        listStore: async(obj, args, context, info) => { // Muttion for create the did by did id
            try{
                return await service.listStore(args.input);
            }catch(err){
                //return new Error(err.message);
            }
        },

    },
    Mutation: {
        
        // Mutation END Here
    }

}
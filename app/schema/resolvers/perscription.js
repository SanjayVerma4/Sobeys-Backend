const service = require('./../../services/Perscription');

module.exports = {
    Query: {
        lookupPerscription: async(obj, args, context, info) => { // Muttion for create the did by did id
            try{
                return await service.lookupPerscription(args.input);
            }catch(err){
                //return new Error(err.message);
            }
        },

    },
    Mutation: {
        addRefill: async(obj, args, context, info) => { // Muttion for create the did by did id
            try{
                return await service.addRefill(args.input);
            }catch(err){
                //return new Error(err.message);
            }
        }

        // Mutation END Here
    }

}
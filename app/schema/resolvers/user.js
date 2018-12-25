const userService = require('./../../services/User');

module.exports = {
    Query: {
        getUsers: async(obj, args, context, info) => { // Muttion for create the did by did id
            try{
                return await userService.getUsers(args.input);
            }catch(err){
                //return new Error(err.message);
            }
        },

    },
    Mutation: {
        saveUser: async(obj, args, context, info) => { // Muttion for create the did by did id
            try{
                return await userService.saveUser(args.input);
            }catch(err){
                //return new Error(err.message);
            }
        }

        // Mutation END Here
    }

}
const graphql = require('graphql');
const {
GraphQLObjectType,
GraphQLString,
GraphQLInt,
GraphQLSchema
} = graphql;
const _ = require('lodash')

const users = [
    {id: '23', fistName: 'Bill', age: 20},
    {id: '47', firstName: 'Samantha', age: 21}
]

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt}
    }
});

/* 
* A livello piu alto di ogni server GraphQL c'è un type che rappresenta tutti i possibili punti di 
*di ingresso nell'API GraphQL, chiamato RootQuery spesso. Nel mio esempio la RootQuery fornisce
*un campo user che accetta un argomento id
*/

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            // va nel DB, cerca i dati che mi servono e me li ritorna
            resolve(parentValue, args) {
                return _.find(users, {id: args.id});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
})
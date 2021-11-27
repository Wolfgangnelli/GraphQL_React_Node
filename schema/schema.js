const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = graphql;
const _ = require("lodash");
const axios = require("axios");

const users = [
  { id: "23", firstName: "Bill", age: 20 },
  { id: "47", firstName: "Samantha", age: 21 },
];

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentNode, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentNode.id}/users`)
          .then((res) => res.data);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentNode, args) {
        // parentNode è il nodo (insieme di dati/tabella) sul grafico da cui proviene la query. Ad esempio l'utente con id 23...
        return axios
          .get(`http://localhost:3000/companies/${parentNode.companyId}`)
          .then((res) => res.data);
      },
    },
  }),
});

/*
 *node server.js --- localhost:4000/graphql  -->npm run dev
 *npm run json:server
 *A livello piu alto di ogni server GraphQL c'è un type che rappresenta tutti i possibili punti di
 *di ingresso nell'API GraphQL, chiamato RootQuery spesso. Nel mio esempio la RootQuery fornisce
 *un campo user che accetta un argomento id.
 *Le query che scrivo vengono inviate al questa root query
 *Lo scopo del queryType è di prendere la query e accedere al nostro grafico di dati. Perchè ho specificato lo user come campo della query,
 *la rootQuery hè andata e ha trovato la chiave user all'interno del suo oggetto fields.
 *Avevo specificato all'interno dell'oggetto di quel campo che le query dovevano venire con un ID di tipo string.
 *L'oggetto user trovato, viene poi restituito/ritornato dalla funzione resolve()
 */

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // ENTRY POINT 1
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      // va nel DB, cerca i dati che mi servono e me li ritorna
      //le resolve function ci portano da un punto del nostro graph (grafico) ad un'altra posizione sul grafico.
      //sono una serie di funzioni che restituiscono riferimenti ad altri oggetti (altri pezzi di dati, legate con fk) nel nostro graph or schema
      resolve(parentValue, args) {
        // return _.find(users, { id: args.id });
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((resp) => resp.data);
      },
    },
    // ENTRY POINT 2
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentNode, args) {
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

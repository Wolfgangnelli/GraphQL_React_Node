const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;


const app = express();
// verifico che la chiamata sia fatta su graphql
app.use('/graphql', expressGraphQL({
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening');
});


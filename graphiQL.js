`
//  QUERIES
query getUser($id: String!) {
  user(id: $id) {
    id
    firstName
    age
    company {
      id
      name
      description
    }
  }
}

query getCompany($id: String!) {
  company(id: $id) {
    id
    name
    description
    users {
      firstName
      age
      company {
        name
      }
    }
  }
}

query getCompanies($id1: String!, $id2: String!) {
  apple: company(id: $id1) {
    ...companyDetails
  }
  google: company(id: $id2) {
   ...companyDetails
  }
}

fragment companyDetails on Company {
  id
  name
  description
}

mutation createUser($firstName: String!, $age: Int!) {
  addUser(firstName: $firstName, age: $age) {
    id
    firstName
    age
  }
}

  

//  QUERY VARIABLES
{
  "id": "2",
  "id1": "1",
  "id2": "2",
  "firstName": "Arnold",
  "age": 31
}
  
`;

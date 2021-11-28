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


// MUTATIONS
mutation createUser($firstName: String!, $age: Int!) {
  addUser(firstName: $firstName, age: $age) {
    id
    firstName
    age
  }
}

mutation deleteUser($deleteUserId: String!) {
  deleteUser(id: $deleteUserId) {
    id
  }
}

mutation updateUser($updateUserId: String!, $firstName: String, $companyId: String) {
  editUser(id: $updateUserId, firstName: $firstName, companyId: $companyId) {
    id
    age
    firstName
    company {
      name
    }
  }
}


  

//  QUERY VARIABLES
{
  "id": "2",
  "id1": "1",
  "id2": "2",
  "firstName": "Arnold",
  "age": 31,
  "deleteUserId": "8liC4VQ",
  "updateUserId": "2",
  "companyId": "1"
}
  
`;

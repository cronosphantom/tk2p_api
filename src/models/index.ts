const {  gql } = require('apollo-server');

export * from './Program';
export * from './User';
export * from './Coach';
export * from './CoachBranding';
export * from './Subscription';
export * from './ProgramItem';
export * from './StockBackground';
export * from './CoachBackground';
export * from './PlanLevel';




export const typeDefs = gql`
    type Query{
        _: String
        testQuery: String
        languages: [Language]
    }
    type Mutation {
        _:String
    }
    type Address {
        street: String
        city: String
        state: String
        country: String
        postalCode: String
        latitude: Float
        longitude: Float
    }
    type Language{
        code: String
        name: String
        icon: String
    }
    type i18n {
        en: String
        fr: String
        es: String
        ro: String
        sc: String
        ko: String
        jp: String
    }
`

 


 


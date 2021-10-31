
![Home Page](home.png?raw=true "Countries Browser")

# Countries-Browser-App


A simple app for browsing countries, and powered by a custom [graphql backend services deployed on AWS](https://github.com/eseerigha/countries-api)


Application provides the following features:

* Filter countries based on regions - Africa, Europe, America e.t.c
* Search for country
* View country details


Development:

* [create-react-app](https://create-react-app.dev/)
* [react-bootstrap](https://react-bootstrap.github.io/)
* [react-hooks](https://reactjs.org/docs/hooks-intro.html)
* [react-context](https://reactjs.org/docs/context.html)
* [font-awesome](https://fontawesome.com/v4.7.0/)
* [apollo graphql](https://www.apollographql.com/docs/react/)
* [rescripts](https://github.com/harrysolovay/rescripts)


## Getting Started

### Prerequisites
Install [Node](https://nodejs.org/en/download/)

### Installing
Clone the repository
```
git clone https://github.com/eseerigha/country-browser.git
```
Install dependencies
```
yarn
```
Configure environment variables
```
Create a .env file in the application root
```
Add the following config to the .env file
```
REACT_APP_GRAPHQL_URI=https://countries-api.eseerigha.com/graphql
```

### Running application

Development Environment
```
yarn run start
```
Production Environment
```
yarn run build

yarn add global serve

serve -s build
```

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

![Alt text](country.png?raw=true "Countries Browser")


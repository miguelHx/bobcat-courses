# Bobcat Courses Front End
### Live Website: https://miguelhx.github.io/bobcat-courses/#/
Course Planner for UC Merced Students.

<img width="1960" alt="Screenshot 2024-08-22 at 2 27 33 PM" src="https://github.com/user-attachments/assets/28babbc0-8737-42e2-9569-3a43d6a18a89">


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following installed on your system:
* node.js version 8.0.0 or higher (I use 8.11.3 as of Sep, 2018)
* yarn version 1.5 or higher (I use 1.9.4 as of Sep, 2018)
You can install node.js here: https://nodejs.org/en/download/
To install yarn, follow the steps here depending on your operating system:  https://yarnpkg.com/en/docs/install#mac-stable


### Installing

A step by step series of examples that tell you have to get a development env running

1. clone the github repo

```bash
cd some-working-directory
```
```bash
git clone https://github.com/miguelHx/bobcat-courses.git bobcat-courses
```
2. cd into the directory
```bash
cd bobcat-courses
```

3. Install dependencies
```bash
yarn install
```
4. run the dev server, using this command:
```bash
yarn start
```
5. open up the site using chrome on localhost:3000

If you want to run a production build, run the following command:
```bash
yarn build
```

## Code Style

Using ES6 syntax

## Built With

* [React](https://reactjs.org/) - The front-end web framework used
* [Webpack](https://webpack.js.org/) - Dependency/File Bundler
* [Create-React-App](https://github.com/facebook/create-react-app) - Boilerplate
* [Semantic UI](https://react.semantic-ui.com/introduction) - The UI framework used

## Contributing

Please open up an issue first before sending in a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Props to Christian for building a robust backend in django and props to Maxime for the scheduling algorithm as well as the iOS application.  Without them, none of this would have been possible.
You can find their projects here:
Christian:  https://github.com/dragonbone81/bobcat-courses-backend
Maxime:     https://github.com/moisonmaxime/CoursePlanner-iOS

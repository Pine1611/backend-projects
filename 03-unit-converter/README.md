# Unit Converter

This Webapp allows users to convert between of different measurement units in systems of measurement.

Project based on [Unit Converter][link-1] from [Roadmap Ideas Backend Projects][link-2]

See my demo at [here][link-demo]

## Features

### ONGOING develop the advanced features <sup>[notes](#notes)</sup>

-   [ ] **Conversion of Units Measurements**: Allow convert between different units: Length, Temperature, Volume (Capacity), Weight (Mass).

1. [x] Length Converter - DONE 🎉
2. [x] Temperature Converter - DONE 🎉
3. [ ] Volume (Capacity) Converter - ONGOING
4. [ ] Weight (Mass) Converter - ONGOING

## Getting started

### Prerequisites

-   **Node.js** Installed on your machine (version 18 or higher).
-   **Express** Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js.
-   **Other Packages Support** Packages support: DotENV, CORS, Helmet, Nodemon.

### Installation

-   **Clone the reposity** or **Copy the folder project to your root**
-   **Navigate to the project directory**
-   **Install NPM**

```bash
cd backend_projects/03-unit-converter
# install dependencies packages
npm install
# start server web app
npm run start
# then check client webapp in the public_html folder
```

### Usage

Conversion Units of Measurement through APIs. If you want to see the APIs, please start the server and follow by API's links.

-   **Convert Unit Measurement**:

```bash
//api/converter/:unitSystem/:from-:to/:value
```

-   **Get the symbols of unit system**

```bash
//api/symbols/:unitSystem
```

## Screenshots

![api-get-symbols](./screenshots/api_symbols.jpg)
![api-converter](./screenshots/api_convert_unit.jpg)
![ui-converter](./screenshots/ui_converter.jpg)

## Notes

For now, this is the first version of the app. I'm dedicated to making it better. Expect more advanced features in the future.

## License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).

## Author

Iam Pine

---

Happy Coding And More!

[link-1]: https://roadmap.sh/projects/unit-converter
[link-2]: https://roadmap.sh/projects?g=backend
[link-demo]: https://github.com/Pine1611/backend-projects/blob/main/README.md

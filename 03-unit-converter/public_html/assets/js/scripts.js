class DynamicForm {
    static STYLE_CLASSES = { classDiv: "select__value", classInput: "select__input", classLabel: "select__input-text" };
    static COLLECT_FORM_DATA = { unitSystem: "length", fromUnit: "km", toUnit: "km", valueConvert: 0 };
    static URL_API = "http://localhost:3000/api";
    static SIGN_DEGREE = "°";
    static RESULT = document.getElementById("valueConverted");

    constructor() {
        this.initValueConvert();
        this.initMeasurement();
        this.initUnitSystem();

        if (document.readyState == "complete") {
            this.submitForm();
        }
    }

    // setup value convert
    initValueConvert() {
        const valueConvertEle = document.getElementById("valueConvert");
        valueConvertEle.addEventListener("change", (event) => {
            event.preventDefault();
            DynamicForm.COLLECT_FORM_DATA.valueConvert = valueConvertEle.value;
            this.submitForm();
        });
    }

    // setup create list node - use for all dynamic load list select
    createListNode(textData, attrData) {
        let textLabel = textData == "C" || textData == "F" ? DynamicForm.SIGN_DEGREE + textData : textData;
        let li = document.createElement("li");
        let label = document.createElement("label");
        let text = document.createTextNode(textLabel);
        label.setAttribute("for", attrData);
        li.appendChild(label);
        label.appendChild(text);
        return li;
    }
    // setup create input radio node
    createInputListNode(id, value, name, textData, checkedDefault) {
        let textLabel = textData == "C" || textData == "F" ? DynamicForm.SIGN_DEGREE + textData : textData;
        let div = document.createElement("div");
        let input = document.createElement("input");
        let label = document.createElement("label");
        let text = document.createTextNode(textLabel);
        // add classes
        div.className = DynamicForm.STYLE_CLASSES.classDiv;
        input.className = DynamicForm.STYLE_CLASSES.classInput;
        label.className = DynamicForm.STYLE_CLASSES.classLabel;
        // setup input
        input.type = "radio";
        input.id = id;
        input.value = value;
        input.name = name;
        checkedDefault == "checked" ? (input.checked = "checked") : false;
        // setup label
        label.appendChild(text);
        div.appendChild(input);
        div.appendChild(label);

        return div;
    }

    // inital create system of measuement
    initMeasurement() {
        const listMeasurement = document.getElementById("select__measurement-list-js");
        const inputMeasurement = document.getElementById("select__measurement-input-js");
        const apiUrl = `${DynamicForm.URL_API}/measurement`;
        const reqOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        fetch(apiUrl, reqOptions)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                // catch data and render to html
                data.measurement.forEach((item, index) => {
                    let nodeLi = this.createListNode(item, item);
                    let nodeInput = this.createInputListNode(
                        item,
                        item,
                        "unitSystem",
                        item,
                        index == 0 ? "checked" : ""
                    );
                    listMeasurement.appendChild(nodeLi);
                    inputMeasurement.appendChild(nodeInput);
                    index++;
                });
            })
            .finally(() => {
                const unitSystemEle = document.querySelectorAll("input[name='unitSystem']");

                // set event for each input after finish render input html
                unitSystemEle.forEach((element) => {
                    element.addEventListener("change", (event) => {
                        event.preventDefault();
                        // re-init value
                        DynamicForm.COLLECT_FORM_DATA.unitSystem = element.value;
                        DynamicForm.RESULT.innerHTML = document.getElementById("valueConvert").value;

                        this.initUnitSystem();
                        /**
                         * not sure when re-init unit system by system of measurement,
                         * it can't load init unit value for sumit form so I move submit form to the last finally
                         */
                        // this.submitForm();
                    });
                });
            })
            .finally(this.submitForm()); // set final document loaded will submit form to get the result
    }

    initUnitSystem() {
        const listUnit = document.getElementsByClassName("select__list-js");
        const listCurrentInputUnit = document.getElementsByClassName("select__current-js");

        let unitSystem = DynamicForm.COLLECT_FORM_DATA.unitSystem;
        const apiUrl = `${DynamicForm.URL_API}/symbols/${unitSystem}`;
        const reqOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        fetch(apiUrl, reqOptions)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                // setup select list
                for (let i = 0; i < listUnit.length; i++) {
                    listUnit[i].innerHTML = "";
                    listCurrentInputUnit[i].innerHTML = "";

                    // setup name for from/to input
                    let nameType = i == 0 ? "from" : "to";

                    data.symbols.forEach((item, index) => {
                        let nodeLi = this.createListNode(item, `${nameType}-${item}`);
                        let nodeInput = this.createInputListNode(
                            `${nameType}-${item}`,
                            item,
                            `unit-${nameType}`,
                            item,
                            index == 0 ? "checked" : ""
                        );
                        listUnit[i].appendChild(nodeLi);
                        listCurrentInputUnit[i].appendChild(nodeInput);

                        index++;
                    });
                }
            })
            .finally(() => {
                const unitFromEle = document.querySelectorAll("input[name='unit-from']");
                const unitToEle = document.querySelectorAll("input[name='unit-to']");

                DynamicForm.COLLECT_FORM_DATA.fromUnit = document.querySelector(
                    "input[name='unit-from']:checked"
                ).value;
                DynamicForm.COLLECT_FORM_DATA.toUnit = document.querySelector("input[name='unit-to']:checked").value;

                // console.log(DynamicForm.COLLECT_FORM_DATA.fromUnit);
                // console.log(DynamicForm.COLLECT_FORM_DATA.toUnit);
                // PROBLEM: when change system measurement => default value not change => need fix it => fixed [move submit form func to the last finally]

                unitFromEle.forEach((element) => {
                    element.addEventListener("change", (event) => {
                        event.preventDefault();
                        DynamicForm.COLLECT_FORM_DATA.fromUnit = element.value;
                        this.submitForm();
                    });
                });
                unitToEle.forEach((element) => {
                    element.addEventListener("change", (event) => {
                        event.preventDefault();
                        DynamicForm.COLLECT_FORM_DATA.toUnit = element.value;
                        this.submitForm();
                    });
                });
            });
    }

    submitForm() {
        const formData = DynamicForm.COLLECT_FORM_DATA;
        const apiUrl = `${DynamicForm.URL_API}/converter/${formData.unitSystem}/${formData.fromUnit}-${formData.toUnit}/${formData.valueConvert}`;

        const reqOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        fetch(apiUrl, reqOptions)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const msgError = document.getElementById("invalidValueConvert");
                const inputConvert = document.getElementById("valueConvert");
                // const result = document.getElementById("valueConverted"); => (17/11/2024) move to static variable for call in the init system of measuremnt
                if (!data.status) {
                    DynamicForm.RESULT.innerHTML = data.valueConverted;
                    msgError.classList.remove("form__error-msg--show");
                    inputConvert.classList.remove("form__error");
                } else {
                    msgError.classList.add("form__error-msg--show");
                    inputConvert.classList.add("form__error");
                    msgError.innerHTML = data.message;
                }
            });
    }
}

const converterForm = new DynamicForm();

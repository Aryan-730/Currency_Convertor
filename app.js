let Base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

for (let select of dropdowns) {
    for (currencycode in countries) {
        let newOption = document.createElement("option");
        newOption.innerText = currencycode;
        newOption.value = currencycode;
        if (select.name === "from" && currencycode === "INR") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currencycode === "USD") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currencycode = element.value;
    let countryCode = countries[currencycode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}
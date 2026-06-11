let Base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

for (let select of dropdowns) {
    for (let currencyCode in countries) {
        let newOption = document.createElement("option");
        newOption.innerText = countryNames[currencyCode];  
        newOption.value = currencyCode;                    

        if (select.name === "from" && currencyCode === "INR") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currencyCode === "USD") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode  = countries[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let selector  = element.closest(".option-selector");
    let img       = selector.querySelector("img");
    let nameLabel = selector.querySelector(".countryName");

    img.src = newSrc;
    nameLabel.textContent = currencyCode;  
}
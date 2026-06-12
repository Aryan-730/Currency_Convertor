let Base_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';

const dropdowns = document.querySelectorAll(".dropdown select");
const formBtn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const resultDiv = document.querySelector(".resultDiv");
const amountInput = document.querySelector(".amount-input");


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



formBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount-input");
    let amountVal = amount.value;
    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amount.value = "1";
    }

    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`; 
    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = (amountVal * rate).toFixed(2);

    console.log(finalAmount);

    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

    resultDiv.classList.remove("hide");
}); 

amountInput.addEventListener("input", () => {
    resultDiv.classList.add("hide");
});

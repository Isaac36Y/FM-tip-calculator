const billInput = document.querySelector("#bill-input") 
const numOfPeople = document.querySelector("#people-input")
const customTip = document.querySelector(".tip__input")
const tipAmount = document.querySelectorAll(".tip__button")
const totalTip = document.querySelector("#total-tip-per-person")
const totalPerson = document.querySelector("#total-cost-per-person")
const resetBtn = document.querySelector("#reset-button")


let tipSelected = null
const parsePercent = (str) => {
    if (str == null || str === "") return null;
    const aStr = String(str).trim();
    if (aStr.endsWith("%")) return parseFloat(aStr.replace("%", ""))
    return parseFloat(aStr)
}

const activateReset = () => {
    if (tipSelected || billInput.value || numOfPeople.value) {
        return resetBtn.classList.add("select")
    }else {return resetBtn.classList.remove("select")}
}

const reset = () => {
    tipSelected = null;
    billInput.value = "";
    numOfPeople.value = "";
    customTip.value = ""
    tipAmount.forEach(btn => btn.ariaChecked = "false")
    resetBtn.classList.remove("select")
}

const updateTotals = () => {
    const bill = parseFloat(billInput.value);
    const people = parseInt(numOfPeople.value);
    const percent = parsePercent(tipSelected)
    activateReset()
    if (!people >= 1 || !bill) {
        totalTip.textContent = "$0.00"
        totalPerson.textContent = "$0.00"
        return
    }
    
    const tipTotal = bill * (percent / 100);
    const tipPerPerson = tipTotal / people;
    const totalPerPerson = (bill + tipTotal) / people
    
    totalTip.textContent = tipPerPerson.toFixed(2);
    totalPerson.textContent = totalPerPerson.toFixed(2)
}


tipAmount.forEach(btn => 
    btn.addEventListener("click", () => {
    if (btn.ariaChecked === "true") {
        btn.ariaChecked = "false"
        tipSelected = null
    }else{
       tipAmount.forEach(b => b.ariaChecked = "false") 
       btn.ariaChecked = "true"
       tipSelected = parsePercent(btn.textContent)
       if (customTip) customTip.value = ""
       activateReset()
    }
    if (billInput.value && numOfPeople.value >= 1) {
         updateTotals()
    }
   
    
}))
 
if (customTip ) {
    customTip.addEventListener("input", () => {
    tipAmount.forEach(btn => btn.ariaChecked = "false")
    tipSelected = parsePercent(customTip.value)
    if (billInput.value && numOfPeople.value >= 1) {
         updateTotals()
    }
})
}
billInput.addEventListener("input", () => updateTotals())
numOfPeople.addEventListener("input", () => updateTotals())
resetBtn.addEventListener("click", () => reset())


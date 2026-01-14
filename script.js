const billInput = document.querySelector("#bill-input") 
const numOfPeople = document.querySelector("#people-input")
const customTip = document.querySelector(".tip__input")
const tipAmount = document.querySelectorAll(".tip__button")
const totalTip = document.querySelector("#total-tip-per-person")
const totalPerson = document.querySelector("#total-cost-per-person")



let tipSelected = null
const parsePercent = (str) => {
    if (str == null || str === "") return null;
    const aStr = String(str).trim();
    if (aStr.endsWith("%")) return parseFloat(aStr.replace("%", ""))
    return parseFloat(aStr)
}

const updateTotals = () => {
    const bill = parseFloat(billInput.value);
    const people = parseInt(numOfPeople.value);
    const percent = parsePercent(tipSelected)

    if (!people >= 1) {
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
    if (btn.classList.contains("selected")) {
        btn.classList.remove("selected")
        tipSelected = null
    }else{
       tipAmount.forEach(b => b.classList.remove("selected")) 
       btn.classList.add("selected")
       tipSelected = parsePercent(btn.textContent)
       if (customTip) customTip.value = ""
    }
    if (billInput.value && numOfPeople.value >= 1) {
         updateTotals()
    }
   
    
}))
 
if (customTip ) {
    customTip.addEventListener("input", () => {
    tipAmount.forEach(btn => btn.classList.remove("selected"))
    tipSelected = parsePercent(customTip.value)
    if (billInput.value && numOfPeople.value >= 1) {
         updateTotals()
    }
})
}
billInput.addEventListener("input", () => updateTotals())
numOfPeople.addEventListener("input", () => updateTotals())


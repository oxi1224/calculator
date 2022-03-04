const outputEl = document.getElementById('out');
const inputEl = document.getElementById('input');
const buttons = inputEl.querySelectorAll('td');
const switchField = document.getElementById("switch-field");
const amogusEl = document.getElementById('troll');
let startingNum;
let endingNum;
let isSet = false;

function calculator() {
    let output = [];
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            if (["DEL", "RESET", "="].includes(button.textContent)) {
                // delete the last number or symbol
                if (button.textContent === "DEL") {
                    output.pop();
                    outputEl.textContent = output.join('').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                // Reset the calculator
                } else if (button.textContent === "RESET") {
                    output.length = 0;
                    outputEl.textContent = output.join('').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                } else {
                    if (outputEl.textContent === "Error"){
                        return false;
                    }
                    // Replace all x's with *
                    for(let i = 0; i < output.length; ++i){
                        if(output[i] === 'x'){
                            output[i] = '*';
                        }
                    }
                    // calculate the expression
                    outputEl.textContent = eval(output.join(''));
                    // output erron when dividing by 0
                    if (["NaN", "Infinity"].includes(outputEl.textContent)) {
                        outputEl.textContent = "Error";
                        output = outputEl.textContent.split(" ");
                    } else {
                        output = [...outputEl.textContent];
                    }
                    outputEl.textContent = outputEl.textContent.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                }
            } else {
                // push the values to the array
                output.push(button.textContent)
                // stop users from using more than 1 operator in a row
                if (output[0].match(/[0-9]/) || output[0].match('-') || output[0].match(".")) {
                    for (let i = 0; i < output.length; ++i){
                         if (["+", "-", "x", ".", "/"].includes(output[i]) && ["+", "x", "/", "-", "."].includes(output[i-1])) {
                            if (output[i] === "." && output[i-1] === "-") {
                                break
                            } else {
                                output.pop()
                            }
                        }
                    }
                } else {
                    output.shift();
                }
                outputEl.textContent = output.join('').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
        })
    });
}
calculator();

// Toggle themes
function themeToggle() {
    let theme = 1;
    const themeIndicator = document.getElementById("switch-ball"); 
    switchField.addEventListener("click", toggle);
    function toggle() {
        document.body.classList.remove("amogus");
        if (theme == 1) {
            theme++;
            themeIndicator.style.transform = 'translateX(23px)';
            document.body.classList.toggle("theme2");
        } else if (theme == 2) {
            theme++;
            themeIndicator.style.transform = 'translateX(46px)';
            document.body.classList.toggle("theme2");
            document.body.classList.toggle("theme3");
        } else {
            theme = 1;
            themeIndicator.style.transform = 'translateX(0px)';
            document.body.classList.toggle("theme3");
        }
    }
}
themeToggle();

function amogus() {
    amogusEl.style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
    amogusEl.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
}
amogusEl.addEventListener("click", () => {document.body.classList.toggle("amogus")});
window.addEventListener('blur', amogus);
window.addEventListener('focus', amogus);
window.onload = amogus;
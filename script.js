let current = "0";
    let operator = null;
    let prev = null;
    let shouldReset = false;

    const display = document.getElementById("display");

    function updateDisplay() {
      display.textContent = current;
    }

    function clearAll() {
      current = "0";
      prev = null;
      operator = null;
      shouldReset = false;
      updateDisplay();
    }

    function eraseChar() {
      if (shouldReset) return;
      current = current.length > 1 ? current.slice(0, -1) : "0";
      updateDisplay();
    }

    function appendNumber(num) {
      if (current === "0" || shouldReset || current === "Error") {
        current = num === "." ? "0." : num;
        shouldReset = false;
      } else if (!(num === "." && current.includes("."))) {
        current += num;
      }
      updateDisplay();
    }

    function chooseOperator(op) {
      if (operator && !shouldReset) {
        evaluate();
      }
      operator = op;
      prev = current;
      shouldReset = true;
    }

    function evaluate() {
      if (!operator) return;
      const a = parseFloat(prev);
      const b = parseFloat(current);
      let result = 0;

      switch (operator) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/": result = b !== 0 ? a / b : "Error"; break;
      }

      current = result.toString();
      operator = null;
      shouldReset = true;
      updateDisplay();
    }

    function toggleSign() {
      if (current !== "0") {
        current = (parseFloat(current) * -1).toString();
        updateDisplay();
      }
    }

    function applyPercent() {
      current = (parseFloat(current) / 100).toString();
      updateDisplay();
    }

    function applyTrig(func) {
      const val = parseFloat(current);
      let result = 0;
      switch (func) {
        case "sin": result = Math.sin(val * Math.PI / 180); break;
        case "cos": result = Math.cos(val * Math.PI / 180); break;
        case "tan": result = Math.tan(val * Math.PI / 180); break;
      }
      current = result.toString();
      updateDisplay();
    }

    updateDisplay();
function App(){
    const symbols = ['+', '-', '*', '/'];
    const [expression, setExpression] = React.useState("");
    const [answer, setAnswer] = React.useState(0);
    const [isDotEntered, setIsDotEntered] = React.useState(false);

    const display = (input) => {
        setExpression(prev => {
            
            //Bool holder
            const lastPrevChar = prev.charAt(prev.length-1);
            const isPrevCharMathSymbol = symbols.includes(lastPrevChar);
            const isInputArithmetic = symbols.some(symb => symb == input);
            const isPrevEmpty = prev.length < 1;
            const isZeroToNine = /[0-9]/.test(input);

            if(isPrevEmpty && input == "."){
                setIsDotEntered(true);
                return "0" + input;
            }
            //* Will display answer and removes answer if pressed a different key
            else if (prev.endsWith("=" + answer) ) {
                setAnswer(0);   
                if(/[0-9.]/.test(input)){
                    if(input === "."){
                        setIsDotEntered(true);
                        return "0" + input;
                    }else {
                        return input
                    }
                } else {
                    return answer + input;
                }
            }
            //If number is being input
            else if(isZeroToNine){
                console.log("stop")
                //* Replaces the previous number if starts with only 0
                if (/[1-9]/.test(input) && prev.startsWith("0")
                        && lastPrevChar === "0" && !isDotEntered){
                    return prev.slice(0, -1) + input;
                }
                else if(input === "0"){
                    if(isPrevEmpty || prev.startsWith("0.")  || !prev.startsWith("0")){
                        return prev + input;
                    }
                    else {
                        return prev;
                    }
                }
                else {
                    console.log("else")
                    if(!prev.startsWith==="0."){
                        return input
                    } else {
                        return prev + input;
                    }
                }
            }

            //* Ensures that the number doest start with 0 if its not a decimal
            else if (input === '.') {
                if (!isDotEntered) {
                    setIsDotEntered(true);
                    return prev + input
                } else {
                    console.log("here")
                    return prev;
                }
            }
            
            //* Ensure there is no arithmetic input close to each other
            else if (isPrevCharMathSymbol && !isZeroToNine) {
                return isArtimeticSymbol(prev,input,symbols);
            }

            //* Adds 0 to a number with only a decimal after pressing an arithmetic operation
            else if (isInputArithmetic && lastPrevChar === '.'){
                setIsDotEntered(false);
                return prev + "0" + input;
            }
            else {
                console.log("last");
                if(isInputArithmetic){
                    setIsDotEntered(false);
                }
                return prev + input;
            }
        });

        const isArtimeticSymbol = (prev, input, symbols) => {
            const isPrevEmpty = prev.length < 2;
            const lastPrevChar = prev.charAt(prev.length - 1);
            
            setIsDotEntered(false); 
            if (isPrevEmpty) {
                return input;
            } else if (!symbols.includes(prev.charAt(prev.length - 2))) {
                if (input === "-") {
                    return prev + input;
                } else {
                    return prev.slice(0, -1) + input;
                }
            } else {
                console.log("2nd to last is symbol")
                if (lastPrevChar == input) {
                    return prev;
                } else if (( lastPrevChar === "-") && (input !== "*" || input !== "/")) {
                    if ( input === "-") {
                        return prev.slice(0, -1) + input;
                    } else {
                        return prev.slice(0, -2) + input;
                    }
                } else {
                    return prev.slice(0, -2) + input;
                }
            }
        };
        
    }

    const calculate = () => {
        let fixExpression = expression
        if (fixExpression.length > 0) {
            while(symbols.includes(fixExpression.charAt(fixExpression.length - 1))){
                fixExpression = fixExpression.substring(0, fixExpression.length - 1);
            }

            const ans = eval(fixExpression);
            setAnswer(ans);
            setExpression(fixExpression + "=" + ans);
        }
    }

    const allClear = () => {
        setExpression("");
        setIsDotEntered(false);
        setAnswer(0);
    }

    return (
        <div className="container">
            
            <div className="dis"></div>
            <div className="grid">
                <div className="dis">
                    <input id="display" className="disExpressions kode-mono"
                        type="text"
                        value={expression}
                        placeholder="0"
                        disabled />
                    <div className="total kode-mono"><p>{answer}</p></div>
                </div>
                <div id="clear" onClick={allClear} className="kode-mono padbtn ac">AC</div>
                <div id="divide" onClick={() => display("/")} className="kode-mono padbtn div">/</div>
                <div id="multiply" onClick={() => display("*")} className="kode-mono padbtn mul">X</div>
                <div id="seven" onClick={() => display("7")} className="kode-mono padbtn seven">7</div>
                <div id="eight" onClick={() => display("8")} className="kode-mono padbtn eight">8</div>
                <div id="nine" onClick={() => display("9")} className="kode-mono padbtn nine">9</div>
                <div id="subtract" onClick={() => display("-")} className="kode-mono padbtn min">-</div>
                <div id="four" onClick={() => display("4")} className="kode-mono padbtn four">4</div>
                <div id="five" onClick={() => display("5")} className="kode-mono padbtn five">5</div>
                <div id="six" onClick={() => display("6")} className="kode-mono padbtn six">6</div>
                <div id="add" onClick={() => display("+")} className="kode-mono padbtn add">+</div>
                <div id="one" onClick={() => display("1")} className="kode-mono padbtn one">1</div>
                <div id="two" onClick={() => display("2")} className="kode-mono padbtn two">2</div>
                <div id="three" onClick={() => display("3")} className="kode-mono padbtn three">3</div>
                <div id="equals" onClick={calculate} className="kode-mono padbtn equal">=</div>
                <div id="zero" onClick={() => display("0")} className="kode-mono padbtn zero">0</div>
                <div id="decimal" onClick={() => display(".")} className="kode-mono padbtn dot">.</div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));

'use strict';

const RB = ReactBootstrap;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            equation: '',
            solution: 0,
            result: '0',
            solved: false
        }

        this.updateDisplay = this.updateDisplay.bind(this);
    }

    updateDisplay(input) {
        let digit, equation, solution = 0, solved = false;
        switch (input) {
            case 'AC':
                digit = '0';
                equation = '';
                break;
            case '=':
                try {
                    if (this.state.solved) {
                        solution = this.state.solution;
                        digit = this.state.result;
                        equation = this.state.equation;
                        solved = this.state.solved;
                    } else {
                        solution = math.round(math.evaluate(this.state.equation), 12);
                        digit = solution;
                        equation = `${this.state.equation}=${solution}`;
                        solved = true;
                    }   
                } catch (error) {
                    // expression is not valid for evaluation
                    solution = this.state.solution;
                    digit = this.state.result;
                    equation = this.state.equation;
                    solved = this.state.solved;
                }
                break;
            case '-':
                digit = this.state.result;
                equation = this.state.solved ? this.state.solution : this.state.equation;
                if (digit != input) {
                    digit = input;
                    equation = `${equation}${digit}`;
                }
                break;
            case '/':
            case '+':
                digit = this.state.result;
                equation = this.state.solved ? this.state.solution : this.state.equation;
                if (digit != input) {
                    equation = replaceLastOperator(equation);
                    digit = input;
                    equation = `${equation}${digit}`;
                }
                break;
            case 'x':
                digit = this.state.result;
                equation = this.state.solved ? this.state.solution : this.state.equation;
                if (digit != input) {
                    equation = replaceLastOperator(equation);
                    digit = input;
                    equation = `${equation}*`;
                }
                break;
            case '.':
                digit = this.state.result;
                equation = this.state.equation;
                if (this.state.solved) {
                    digit = '0';
                    equation = '';
                    solution = 0;
                    solved = false;
                }
                if (!digit.includes('.')) {
                    if (['/', '-', '+', 'x'].includes(digit)) {
                        digit = `0.`;
                        equation = `${equation}0.`;
                    } else {
                        digit = `${digit}.`;
                        equation = `${equation}.`;
                    }
                }
                break;
            default:
                digit = this.state.result;
                equation = this.state.equation;
                if (this.state.solved) {
                    digit = '0';
                    equation = '';
                    solution = 0;
                    solved = false;
                }
                if (['0', '/', '-', '+', 'x'].includes(digit)) {
                    digit = `${input}`;
                } else {
                    digit = `${digit}${input}`;
                }
                equation = `${equation}${input}`;
                break;
        }
        this.setState({
            result: digit,
            equation: equation,
            solution: solution,
            solved: solved
        });
    }

    render() {
        return (
            <RB.Container id="calculator" className="mt-5">
                <RB.Row>
                    <RB.Col md={{ span: 6, offset: 3 }}
                        sm={{ span: 6, offset: 3 }}
                        lg={{ span: 4, offset: 4 }}>
                        <Display equation={this.state.equation}
                            result={this.state.result} />
                        <ButtonPad 
                            updateDisplay={this.updateDisplay} />
                    </RB.Col>
                </RB.Row>
            </RB.Container>
        );
    }
}

const Display = (props) => {
    return (
        <RB.Row id="display-pad" className="p-1 bg-dark">
            <RB.Col>
                <div id='equation' className="text-right">{props.equation}</div>
                <div id='display' className="mt-3 text-right text-white">{props.result}</div>
            </RB.Col>
        </RB.Row>
    );
}

class ButtonPad extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.updateDisplay(e.target.value);
    }

    render() {
        return (
            <RB.Row id="button-pad" className="p-1 bg-dark">
                <RB.Col>
                    <RB.Row>
                        <RB.Col sm={6} md={6} lg={6}><RB.Button id="clear" onClick={this.handleClick} className="w-100 h-100" value="AC">AC</RB.Button></RB.Col>
                        <RB.Col><RB.Button id="divide" onClick={this.handleClick} className="w-100 h-100" value="/">/</RB.Button></RB.Col>
                        <RB.Col><RB.Button id="multiply" onClick={this.handleClick} className="w-100 h-100" value="x">x</RB.Button></RB.Col>
                    </RB.Row>
                    <RB.Row>
                        <RB.Col><RB.Button id="seven" onClick={this.handleClick} className="w-100 h-100" value="7">7</RB.Button></RB.Col>
                        <RB.Col><RB.Button id="eight" onClick={this.handleClick} className="w-100 h-100" value="8">8</RB.Button></RB.Col>
                        <RB.Col><RB.Button id="nine" onClick={this.handleClick} className="w-100 h-100" value="9">9</RB.Button></RB.Col>
                        <RB.Col><RB.Button id="subtract" onClick={this.handleClick} className="w-100 h-100" value="-">-</RB.Button></RB.Col>
                    </RB.Row>
                    <RB.Row>
                        <RB.Col><RB.Button id="four" onClick={this.handleClick} className="w-100 h-100" value="4">4</RB.Button></RB.Col>
                        <RB.Col><RB.Button id="five" onClick={this.handleClick} className="w-100 h-100" value="5">5</RB.Button></RB.Col>
                        <RB.Col><RB.Button id="six" onClick={this.handleClick} className="w-100 h-100" value="6">6</RB.Button></RB.Col>
                        <RB.Col><RB.Button id="add" onClick={this.handleClick} className="w-100 h-100" value="+">+</RB.Button></RB.Col>
                    </RB.Row>
                    <RB.Row>
                        <RB.Col>
                            <RB.Row>
                                <RB.Col><RB.Button id="one" onClick={this.handleClick} className="w-100 h-100" value="1">1</RB.Button></RB.Col>
                                <RB.Col><RB.Button id="two" onClick={this.handleClick} className="w-100 h-100" value="2">2</RB.Button></RB.Col>
                                <RB.Col><RB.Button id="three" onClick={this.handleClick} className="w-100 h-100" value="3">3</RB.Button></RB.Col>
                            </RB.Row>
                            <RB.Row>
                                <RB.Col sm={8} md={8} lg={8}><RB.Button id="zero" onClick={this.handleClick} className="w-100 h-100" value="0">0</RB.Button></RB.Col>
                                <RB.Col><RB.Button id="decimal" onClick={this.handleClick} className="w-100 h-100" value=".">.</RB.Button></RB.Col>
                            </RB.Row>
                        </RB.Col>
                        <RB.Col sm={3} md={3} lg={3}><RB.Button id="equals" onClick={this.handleClick} className="w-100 h-100" value="=">=</RB.Button></RB.Col>
                    </RB.Row>
                </RB.Col>
            </RB.Row>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

function replaceLastOperator(equation) {
    if (equation.charAt && ['/', '-', '+', '*'].includes(equation.charAt(equation.length - 1))) {
        equation = equation.slice(0, equation.length - 1);
        if (['/', '-', '+', '*'].includes(equation.charAt(equation.length - 1))) {
            equation = equation.slice(0, equation.length - 1);
        }
    }
    return equation;
}

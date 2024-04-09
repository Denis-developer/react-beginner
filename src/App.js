import React from 'react';
import './index.scss';

const questions = [
    {
        title: 'React - это ... ?',
        variants: ['библиотека', 'фреймворк', 'приложение'],
        correct: 0,
    },
    {
        title: 'Компонент - это ... ',
        variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
        correct: 1,
    },
    {
        title: 'Что такое JSX?',
        variants: [
            'Это простой HTML',
            'Это функция',
            'Это тот же HTML, но с возможностью выполнять JS-код',
        ],
        correct: 2,
    },
];

function Result({ correct }) {
    return (
        <div className="result">
            <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
            <h2>Вы отгадали {correct} ответа из {questions.length}</h2>
            <a href='/'>
                Попробовать снова
            </a>
        </div>
    );
}

function Game({ question, step, onClickAnswer }) {

    const percent = Math.round((step / questions.length) * 100);

    return (
        <>
            <div className="progress">
                <div style={{ width: `${percent}%` }} className="progress__inner"></div>
            </div>
            <h1>{question.title}</h1>
            <ul>
                {question.variants.map((item, i) => <li key={i} onClick={() => onClickAnswer(i)}>{item}</li>)}
            </ul>
        </>
    );
}

function App() {

    const [step, setStep] = React.useState(0);
    const [correct, setCorrect] = React.useState(0);
    const question = questions[step];

    const onClickAnswer = (index) => {
        if (index === question.correct) {
            setCorrect(correct + 1);
        }
        setStep(step + 1);
    }

    return (
        <div className="App">
            {step === questions.length ? <Result correct={correct} /> : <Game question={question} step={step} onClickAnswer={onClickAnswer} />}
        </div>
    );
}

export default App;

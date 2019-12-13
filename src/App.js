import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, NavLink, Switch, Route, Redirect } from "react-router-dom";
import { split, map, range, find, isUndefined } from 'lodash';

import tasks from './tasks';

import './App.css';

const Title = () => (
    <Fragment>
        <div>
            <h1 className="title-global">
                <span>Advent of Code</span>
            </h1>
        </div>
        <div>
            <h1 className="title-event">
                &nbsp;&nbsp;&nbsp;
                <span className="title-event-wrap">0xffff&</span>
                <span>2019</span>
            </h1>
        </div>
    </Fragment>
);

const Navigation = () => {
    const numberOfDays = 25;

    const getName = id => {
        const digits = split('' + id, '');

        return map(digits, (d, i) =>
            i !== digits.length - 1 ?
                <span key={i}>{d}<br/></span> :
                <span key={i}>{d}</span>
        );
    };

    return (
        <div className="privboard-row">
            <span className="privboard-days">
                {
                    range(1, numberOfDays + 1).map(id => {
                        const name = getName(id);
                        const isCompleted = !!find(tasks, ({ day }) => day === id);

                        return isCompleted ?
                            <NavLink key={id} to={`/day/${id}`} activeClassName="isActive">{name}</NavLink> :
                            <span key={id}>{name}</span>;
                    })
                }
            </span>
        </div>
    );
};

const Header = ({ task }) => (
    <div>
        <em>--- Day {task.day}: {task.title} ---</em>
    </div>
);

const Input = ({ task }) => (
    <div>
        <em>Input</em><pre>{task.input}</pre>
    </div>
);

const Answers = ({ task }) => {
    const [answers, setAnswers] = useState([undefined, undefined]);

    const getAnswer = index => {
        const newAnswers = [...answers];

        newAnswers[index] = task.answers[index]();
        setAnswers(newAnswers);
    };

    return (
        <div>
            <em>Answers</em><br />
            {
                answers.map((answer, index) =>
                    <div key={index}>
                        {index + 1}.&nbsp;
                        {
                            !isUndefined(answer) ?
                                answer :
                                task.answers[index] ?
                                    <span className="pseudo-link" onClick={() => getAnswer(index)}>get</span> :
                                    <span style={{ color: '#333333' }}>not done yet</span>
                        }
                    </div>
                )
            }
        </div>
    );
};

const Task = ({ id }) => {
    const task = find(tasks, ({ day }) => day === +id);

    if (!task) {
        return <h2><span role="img" aria-label="poo">💩</span></h2>;
    }

    return (
        <Fragment>
            <Header task={task} />
            <Input task={task} />
            <Answers task={task} />
        </Fragment>
    );
};

export default () => (
    <Router>
        <header>
            <Title />
            <Navigation />
        </header>

        <main>
            <Switch>
                <Route path="/day/:id" render={({ match }) => <Task key={match.params.id} id={match.params.id} />} />
                <Redirect exact from="/" to="/day/1" />
            </Switch>
        </main>
    </Router>
);
import React from 'react';

import tasks from './tasks';

import './App.css';

export default () => (
  <React.Fragment>
    <header>
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
    </header>

    <main>
      {
        tasks.map(({ day, title, input, answer1, answer2 }) => (
            <article key={day}>
              <div><em>--- Day {day}: {title} ---</em></div>
              <div><em>Input</em><pre>{input}</pre></div>
              <div><em>Answers</em><br />{answer1 && answer1()} | {answer2 && answer2()}</div>
            </article>
        ))
      }
    </main>
  </React.Fragment>
);
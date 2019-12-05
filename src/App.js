import React from 'react';

import day01 from './day01/day01'
import day02 from './day02/day02'
import day03 from './day03/day03'

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
      <table>
        <thead>
          <tr><th>Day</th><th>Answers</th></tr>
        </thead>

        <tbody>
          <tr><td>01</td><td>{day01.answer1()} | {day01.answer2()}</td></tr>
          <tr><td>02</td><td>{day02.answer1()} | {day02.answer2()}</td></tr>
          <tr><td>03</td><td>{day03.answer()}</td></tr>
        </tbody>
      </table>
    </main>
  </React.Fragment>
);
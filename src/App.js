import React from 'react';

import day01 from './day01/day01'
import day02 from './day02/day02'
import day03 from './day03/day03'
import day04 from './day04/day04'

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
      <article>
        <div><em>Day 01</em></div>
        <div><em>Input</em><pre>{day01.input}</pre></div>
        <div><em>Answers</em><br />{day01.answer1()} | {day01.answer2()}</div>
      </article>

      <article>
        <div><em>Day 02</em></div>
        <div><em>Input</em><pre>{day02.input}</pre></div>
        <div><em>Answers</em><br />{day02.answer1()} | {day02.answer2()}</div>
      </article>

      <article>
        <div><em>Day 03</em></div>
        <div><em>Input</em><pre>{day03.input}</pre></div>
        <div><em>Answers</em><br />{day03.answer1()} | {day03.answer2()}</div>
      </article>

      <article>
        <div><em>Day 04</em></div>
        <div><em>Input</em><pre>{day04.input}</pre></div>
        <div><em>Answers</em><br />{day04.answer1()} | {day04.answer2()}</div>
      </article>
    </main>
  </React.Fragment>
);
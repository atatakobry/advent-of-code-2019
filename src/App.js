import React from 'react';

import day01 from './day01/day01'

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
          <tr>
            <th>Day</th>
            <th>Answer</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>01</td>
            <td>{day01.answer()}</td>
          </tr>
        </tbody>
      </table>
    </main>
  </React.Fragment>
);
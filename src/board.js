import dragula from "dragula";

dragula([
    document.querySelector('#backlog'),
    document.querySelector('#progress'),
    document.querySelector('#completed')
  ]);
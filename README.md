# Game In Dots

The idea of the game is simple: to defeat a computer by managing to click on a random field faster than the set time interval ends. More detailed gameplay can be found in the `We have next gameplay` section.

## Game requirements

- The game MUST work without errors.
- Implement in React / JavaScript / HTML5 / CSS3.
- Performance in the current version of Google Chrome.
- Adaptive layout.
- The rest is up to you.
- Presets for game difficulty you can fetch using this endpoint [/game-settings](https://starnavi-frontend-test-task.herokuapp.com/game-settings). This is should be request to the server NOT just copy paste of data. This data is array of objects with two fields:
  - `Field` - contain size of game field. Should be square form.
  - `Delay` - time in milliseconds.
- Data for leader board you can get from [/winners](https://starnavi-frontend-test-task.herokuapp.com/winners). Also it should be a request.
- When someone wins you should send request to server with `JSON` which contain two fields `winner` and `date`.

## We have next gameplay:

- User set game difficulty and name.
- Press `PLAY`.
- At a specified time interval (in the delay field) a random square on the field is highlighted in blue.
- If the user managed to click on the square during this time - he turns green, the player gets a point and the field changes color to green.
- If not, the field turns red and the point goes to the computer.
- When a player or computer paints >50% of all possible squares in his color - he becomes the winner.
- An inscription appears between the control buttons and the playing field that the player (the name he entered) / computer won.
- Button `PLAY` changes the caption to `PLAY AGAIN`.
- Result of the game need to be send to server on this endpoint [/winners](https://starnavi-frontend-test-task.herokuapp.com/winners) in `JSON` with two fields `winner` and `date` both strings.
- Results in table should be auto update.
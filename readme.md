# Chess BGM
Script to add background music when playing chess at [chess.com](http://chess.com)

## How to
### Host the Music Locally
- Create directory at `c:/` with the name `chess-bgm`
- Create another directory at with the name `matching` and `playing` inside `c:/chess-bgm`
- Put the mp3 music inside their directory respectively
- Start the node server to host your music locally by using command `node server.js`
- Should've said this at the beginning, make sure you have `node.js` installed on your computer

### Run Script in the browser
- Open [chess.com](http://chess.com) in the browser, and click new game
- Copy the source code in any file `dist` directory
- Right click > inspect element > console > then paste the code there
- If done correctly, a box will appear on the bottom right of your browser
- Click `+` to add music
- The `matching` list will play when matchmaking, when the game searching opponent
- The `playing` list will play when you are playing the game

Yep, That should do for an instruction

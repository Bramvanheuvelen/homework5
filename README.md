# homework5

Had some trouble with testing the board "moves" function. After some try and error found out that you make a move with this httpie request:
http put :4000/games/1 board:='[["o","o", "o"], ["o", "o", "o"], ["o", "o", "o"]]' and then replace an "o" with an "x". 
Also replace the games/1 with the games/id of your game.
If you replace more then one "o" with a "x" you get the error.
I added an error if you dont enter a name when posting/starting a new game. I also did a IsJSON class validator.
Liked the assignment, and was able to "control" myself and take it babystep per babystep. Which in the end was very efficient.

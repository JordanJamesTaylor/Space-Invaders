
# Alien Invasion
## A fully functional game showcasing OOP, with core HTML and CSS implementation focusing on CANVAS. 

In Alien Invasion, the player controls a spaceship that appears at the bottom centre of the screen. The player can move the ship left to right using arrow keys and shoot using the space bar. When the game begins, a fleet of aliens fills the sky, moving across and down the screen. The player's aim is to shoot and destroy the alien invaders! 

If the player destroys all of the alien ships then a new fleet appears, moving faster than the previous fleet. If an alien hits the player's ship, or if an alien reaches the bottom of the screen, then the player loses a life. If the player loses three lives then it's game over.

* Use only core HTML, CSS, and JavaScript - no frameworks or packages
* Work with HTML Canvas and real-time collision detection
* Use of OOP to instantiate various in-game sprites in real-time
* Use of Live Server VS Code extension to test application
* Custom UI

In Alien Invasion, the player controls a space ship that appears at the bottom centre of the screen. The player can move the ship left to right using the arrow jeys and shoot using the space bar. When the game begins, a fleet of aliens fills the sky, moving across and down the screen. The aim is to shoot and destroy all of the alien invaders!

## How to run

1. Clone this project
2. Install and enable the VS Code extension Live Server - https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
3. With Live Server enabled, right click the index.html file to run the game in the browser. 

## Game Controls & Rules
1. Use the left and right arrow keys to move your ship left and right across the bottom of the play space
2. Use the spacebar to fire lasers
3. Aliens will across the screen from one side to the other. Once the outermost alien has reached the canvas edge all aliens will move down and begin moving across the canvas in the opposite direction
4. The player loses if the aliens reach the bottom of the play space and/or touch the player's ship
5. The player wins if they're able to destroy all alien ships before they reach the bottom of the play space and/or touch the player's ship

## Game Configuration
Lasers have a default total of 6 lasers on screen for the player and 4 for the aliens. This can be configured by changing the amount of maxLasersOnScreen when constructing the laserController for the player and alien sprites in index.js.

The rate of fire for alien ships can be configured with fireLaserTimerDefault in alienController.js. 

The speed with which aliens move across and down the screen can be adjusted with defaultXVelocity and defaultYVelocity in alienController.js.
# Silly Phaser game

So I know absolutely nothing about Phaser but I'd like to see where this can go. And there are better ways of going about it I get it. But while I'm learning I would like forgo optimization and perfection in favour of usable building blocks. Press `1`,`2`,`3`,...,`9` to switch game states. 

## Asset 
- Use `piskel` for sprites.
- `Inkscape` for vector graphics.

## Outcomes

* Load a sprite-sheet to animate a body, control its movement through the keyboard. Have the sprite 'fall' under the effect of gravity.
* Load a background larger than the viewport, and have the camera track the sprite causing the background to scroll. Basically restrict movement of the sprite within a bounded window.
* Load a sprite-sheet and slice the images in the sheet to create different bodies. I'll use balloons and get them to 'accellerate' upward. Check the mouse input and if the user clicks the balloon, play a sound. Replace the balloon sprite with an 'explosion' animation and play the animation. When the animation is complete, destroy the balloon. Keep track of the balloon clicked and display the score. If the balloon reaches the ceiling, let is destroy itself.
* Use a tween. Click the mouse and build an array of points. Get the balloon to follow the path defined by the points. Draw a line to visualise the path so defined. 
* Load the path from a JSON file. Set object along the path of the moving balloon(s) and when the balloon is within range of a cannon (whose turret points to the closest balloon) fire a 'bullet'. 

## Big ultimate outcome
A tower-defence / resource-management game.

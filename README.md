# chatgpt-rpgmakermv-npcchat
chatgpt generated code. RPG maker plugin. Give an NPC a unique response from chatgpt(Mostly a concept)


Add the js file to gameproject/js/plugins
Go to Tools--> Plugin Manager--> Right-click and edit.
Look for name and turn on.

Create a new Event
Right click on contents--> new--> 3 tab--> Script add the following line


$gameMessage.add('What do you want to say to the NPC?');$gameMessage.setFaceImage('PEOPLE1',5);$gameMessage.setChoices(['How was their day?', 'Say goodbye'],0,1);$gameMessage.setChoiceCallback(function(responseIndex){const npcPrompt = 'In the game world, the player encounters a non-player character named Sasha. Sasha is a barmaid. The player asks Sasha: "';;switch(responseIndex){case 0:$gameMessage.add('...');$gameMessage.setFaceImage('PEOPLE1',5);$gameMessage.chatGPT('how was your day?', npcPrompt);break;case 1:$gameMessage.add('Goodbye!');$gameMessage.setFaceImage('PEOPLE1',5);break;}});

This will go into one line. Here is what you want to change.

$gameMessage.setChoices(['How was their day?', 'Say goodbye'],0,1);--> Change How was their day to any choice you want. This is set for 2 choices

$gameMessage.setChoiceCallback(function(responseIndex){const npcPrompt = 'In the game world, the player encounters a non-player character named Sasha. Sasha is a barmaid. The player asks Sasha: "';--> This is for the prompt that passes. You want too change this for the npc

$gameMessage.chatGPT('how was your day?', npcPrompt);--> The how was your day should match the choice(Probably needs fixing to be better)

$gameMessage.setFaceImage('PEOPLE1',5);--> This sets the face image for the message box. First argument(People1) is the image file name. Second arguement(5) grid number 
from that image file. From left to right(From the top) count from 0 and go up.



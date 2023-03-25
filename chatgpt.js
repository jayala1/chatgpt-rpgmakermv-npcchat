(function() {
  // OpenAI API credentials
  const OPENAI_API_KEY = 'YOUR_APIKEY_HERE';
  const OPENAI_API_URL = 'https://api.openai.com/v1/';

  // NPC Dialogue generation function
	async function generateNPCDialogue(playerInput, npcPrompt) {
    console.log('Input:', playerInput);
    console.log('Input Length:', playerInput.length);
	const prompt = `In a game, ${npcPrompt} The player asks "${playerInput}". ${npcPrompt.split('.')[1].trim()} responds:`;
	const model = 'text-davinci-003';
    const maxTokens = 60;
    const temperature = 0.7;

	console.log('Constructed Prompt:', prompt);
    const requestBody = {
      'prompt': prompt,
      'model': model,
      'max_tokens': maxTokens,
      'temperature': temperature,
      //'stop': '\n'
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    };

    try {
	  console.log('Request Options:', requestOptions);
      const response = await fetch(`${OPENAI_API_URL}completions`, requestOptions);
	  console.log('API response:', response);
      const data = await response.json();
	  console.log('API data:', data);
      if (data && data.choices && data.choices.length > 0) {
        const npcResponse = data.choices[0].text.trim();
        console.log('NPC Response:', npcResponse);
        return npcResponse;
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.error(error);
      return 'I am sorry, I cannot generate a response at this time.';
    }
  }

  // RPG Maker MV Plugin commands
  const chatGPTPluginCommand = function(args){
	    const playerInput = args[0];
		const npcPrompt = args[1];
  $gameMessage.chatGPT(playerInput, npcPrompt);
};

  // RPG Maker MV Plugin object
  const chatGPTPlugin = {
    command: chatGPTPluginCommand
  };

  // Add chatGPT method to gameMessage
Game_Message.prototype.chatGPT = async function(playerInput, npcPrompt) {
  const npcResponse = await generateNPCDialogue(playerInput, npcPrompt);
  this.add(npcResponse);
};


  // RPG Maker MV Plugin initialization
  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
  _Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'chatGPT') {
	  chatGPTPluginCommand(args);
    //chatGPTPluginCommand(args[0], args[1]);
  }
};

  // Add plugin to the list of available plugins
  if (!window.$plugins) {
    window.$plugins = [];
  }
  window.$plugins.push(chatGPTPlugin);
})();

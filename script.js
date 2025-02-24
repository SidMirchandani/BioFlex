// Conversation flows for each event, each with 10 steps
const conversationFlows = {
  "Biotechnology & Prosthetics Quiz": [
    {
      id: 1,
      event: "What is a prosthetic?",
      options: {
        "1": "A robotic vacuum cleaner",
        "2": "An artificial device that replaces a missing body part",
        "3": "A type of medical bacteria"
      },
      correct: "2",
      prompt: "Correct! A prosthetic is an artificial device designed to replace a missing limb or body part."
    },
    {
      id: 2,
      event: "Which material is commonly used in modern prosthetics?",
      options: {
        "1": "Wood",
        "2": "Titanium and carbon fiber",
        "3": "Rubber"
      },
      correct: "2",
      prompt: "Well done! Modern prosthetics are often made of titanium, carbon fiber, and other durable materials."
    },
    {
      id: 3,
      event: "What is the primary goal of prosthetic limbs?",
      options: {
        "1": "To enhance fashion trends",
        "2": "To increase body temperature",
        "3": "To improve mobility and functionality"
      },
      correct: "3",
      prompt: "Great! The main purpose of prosthetics is to restore mobility and improve functionality for individuals."
    },
    {
      id: 4,
      event: "Which of these is an advanced prosthetic technology?",
      options: {
        "1": "Bionic limbs with neural control",
        "2": "Inflatable shoes",
        "3": "Magnetic sunglasses"
      },
      correct: "1",
      prompt: "Nice! Bionic limbs that can be controlled with neural signals are a groundbreaking advancement in prosthetics."
    },
    {
      id: 5,
      event: "How do myoelectric prosthetic limbs work?",
      options: {
        "1": "They are powered by steam",
        "2": "They use electrical signals from muscles to control movement",
        "3": "They function using solar power"
      },
      correct: "2",
      prompt: "You're right! Myoelectric prosthetics detect electrical signals from muscles to control movement."
    },
    {
      id: 6,
      event: "Which body part is most commonly replaced with prosthetics?",
      options: {
        "1": "Legs and arms",
        "2": "Ears",
        "3": "Nose"
      },
      correct: "1",
      prompt: "Exactly! Legs and arms are the most commonly replaced body parts using prosthetics."
    },
    {
      id: 7,
      event: "Which breakthrough technology allows users to feel sensations with a prosthetic limb?",
      options: {
        "1": "Sensory feedback systems",
        "2": "Wireless Bluetooth connectivity",
        "3": "LED light implants"
      },
      correct: "1",
      prompt: "Awesome! Sensory feedback systems are helping prosthetic users regain a sense of touch."
    },
    {
      id: 8,
      event: "Which scientist is known for pioneering modern prosthetics?",
      options: {
        "1": "Dr. Hugh Herr",
        "2": "Isaac Newton",
        "3": "Marie Curie"
      },
      correct: "1",
      prompt: "Yes! Dr. Hugh Herr, a biomechanical engineer, has led innovations in advanced prosthetics."
    },
    {
      id: 9,
      event: "What is osseointegration in prosthetics?",
      options: {
        "1": "A method for waterproofing prosthetics",
        "2": "A technique for growing artificial skin",
        "3": "A process where prosthetic limbs are integrated into the bone"
      },
      correct: "3",
      prompt: "Correct! Osseointegration is a process where prosthetics are directly attached to the bone, improving stability."
    },
    {
      id: 10,
      event: "Which of these is a challenge in prosthetic development?",
      options: {
        "1": "High costs and accessibility",
        "2": "Too many color options",
        "3": "Making them waterproof"
      },
      correct: "1",
      prompt: "Yes! The high cost and accessibility of prosthetic technology remain major challenges."
    }
  ]
};


// Global variables to track conversation state
let selectedEvent = "";
let conversationStage = 0;

// Utility: Append a bot message to the chat window with a typing transition
function addBotMessage(text, callback) {
  const chatWindow = document.getElementById("chat-window");
  const messageElem = document.createElement("div");
  messageElem.className = "bot-message";
  chatWindow.appendChild(messageElem);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  let index = 0;
  function typeChar() {
    if (index < text.length) {
      messageElem.textContent += text.charAt(index);
      index++;
      setTimeout(typeChar, 5); // Adjusted speed: 10ms per character for 5x faster typing
    } else {
      if (callback) callback();
    }
  }
  typeChar();
}

// Utility: Append a user message to the chat window (immediate display)
function addUserMessage(text) {
  const chatWindow = document.getElementById("chat-window");
  const messageElem = document.createElement("div");
  messageElem.className = "user-message";
  messageElem.textContent = text;
  chatWindow.appendChild(messageElem);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Utility: Clear the chat window
function clearChatWindow() {
  document.getElementById("chat-window").innerHTML = "";
}

// Start the adventure: prompt the user to choose an event
function startNapoleonAdventure() {
  clearChatWindow();
  selectedEvent = "";
  conversationStage = 0;
  addBotMessage("Welcome to the Chatbot Adventure!");
  addBotMessage('Type 1 to start the chatbot exper:');
  addBotMessage("1: Biotechnology & Prosthetics Quiz");
  addBotMessage('Do you want to reset the conversation? Just type "Reset".');
}

// Present the current step for the selected event
function presentCurrentStep() {
  if (selectedEvent === "") return; // No event selected yet
  const flow = conversationFlows[selectedEvent];
  if (conversationStage < flow.length) {
    const currentStep = flow[conversationStage];
    let message = `Step ${conversationStage + 1}: ${currentStep.event}\n`;
    for (const [key, option] of Object.entries(currentStep.options)) {
      message += `${key}: ${option}\n`;
    }
    addBotMessage(message);
  } else {
    addBotMessage("The adventure for this event has concluded. Thank you for participating!");
  }
}

// Process user input from the chat
function processNapoleonInput(input) {
  // If the user types "reset", restart the conversation
  if (input.trim().toLowerCase() === "reset") {
    addBotMessage("Resetting conversation...");
    setTimeout(() => {
      startNapoleonAdventure();
    }, 1000);
    return;
  }

  // If no event is selected, interpret the input as the event choice
  if (selectedEvent === "") {
    const eventMap = {
      "1": "Biotechnology & Prosthetics Quiz"
    };
    if (eventMap.hasOwnProperty(input)) {
      selectedEvent = eventMap[input];
      addBotMessage(`You have selected: ${selectedEvent}. Let's begin!`);
      setTimeout(() => {
        presentCurrentStep();
      }, 1000);
    } else {
      addBotMessage("Please choose a valid option: 1, 2, 3, 4, or 5.");
    }
    return;
  }

  // Process the input for the current step of the chosen event
  const flow = conversationFlows[selectedEvent];
  if (conversationStage < flow.length) {
    const currentStep = flow[conversationStage];
    if (!currentStep.options.hasOwnProperty(input)) {
      addBotMessage("Please choose a valid option (e.g., type 1, 2, or 3).");
      return;
    }
    if (input === currentStep.correct) {
      addBotMessage(currentStep.prompt);
      conversationStage++;
      setTimeout(() => {
        presentCurrentStep();
      }, 1000);
    } else {
      addBotMessage("Incorrect answer. Please try again.");
      setTimeout(() => {
        presentCurrentStep();
      }, 1000);
    }
  } else {
    addBotMessage("The adventure has concluded. Thank you for participating!");
  }
}

// Initialize the conversation on window load and set up the input listener
window.onload = function () {
  startNapoleonAdventure();
  const inputField = document.getElementById("chat-input");
  inputField.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const userInput = inputField.value.trim();
      if (userInput !== "") {
        addUserMessage(userInput);
        inputField.value = "";
        processNapoleonInput(userInput);
      }
    }
  });
};

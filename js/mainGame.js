const gameData = {
    "1": {
        "text": "Congrats! You're going out on deployment... where are you going?",
        "image" : "smaller_images/what_place.png",
"choices": {
            "Key West": [2,["ais","genset","ptz","starlink"]],
            "St Thomas": [2,["adcp"]],
            "San Diego": [2,["ptz", "genset", "ais"]],
            "Caymans": [2,["starlink","ptz","adcp"]],
        }
    },
    "2": {
        "text": "What is the purpose of your mission??",
        "image" : "smaller_images/what_mission.png",
"choices": {
            "Revolutionizing ocean science, of course!": [3,["adcp"]],
            "Military version of I spy": [3, ["ptz", "genset", "ais", "starlink"]],
            "An R&D mission, testing out some new technology for the first time": [3, ["starlink", "adcp", "genset"]]
        }
    },
    "3": {
        "text": "After some great preparation and clearing TechOps and Pilot checkouts, you're ready to go! Deployment goes off without a hitch, but soon you find yourself in the middle of a crazy storm. The waves are heaving, and the wind is gusting at over 30 knots! What do you do?",
        "image" : "smaller_images/storm.png",
"choices": {
            "Fall into the water... the wave came out of nowhere!!": [4,["adcp", "ais"]],
            "Hunker down! It makes the most sense to wait this one out": [4,["genset", "ptz", "starlink"]],
            "What an opportunity! I'm curious what data we could collect here...": [4,["adcp", "ptz"]],
        }
    },
    "4": {
        "text": "OVERRRRBOAAARRRRDDDD! As you roll with the waves you hit ground much sooner than expected. You have discovered a sea mount",
        "image" : "smaller_images/seamount.png",
"choices": {
            "Awesome!! I gotta document EVERYTHING. I hope I see a mermaid": [5,["adcp", "ptz"]],
            "Who cares?? It's still the water. Start looking for ways home" : [5,["genset", "starlink", "ais"]],
            "Gollie Geeee! I wonder if there are boats down here...": [5,["ais", "ptz"]],
        }
    },
    "5": {
        "text": "The storm gets rougher and rougher. It's been days since you've seen the sun What do you try?",
        "image" : "smaller_images/storm.png",
"choices": {
            "Pray to every god until one answers": [6,["adcp", "ais", "genset"]],
            "You've seen Treasure Planet, Moana 2, and Master and Commander. You can absolutely navigate your way through this. Press on": [6,["ais", "ptz", "starlink"]],
            "It's time to be realistic. Start planning whose power you are going to pull first.": [6,["genset", "ptz", "ais"]],
        }
    },
    "6": {
        "text": "Finally the sun peeks out and the clouds clear, the storm has passed! A rainbow appears in the sky. How do you react? ",
        "image" : "smaller_images/rainbow.png",
"choices": {
            "Take a picture of the beautiful rainbow!": [7,["starlink","ptz"]],
            "Breathe a sigh of relief": [7,["ais", "genset"]],
            "Cry a tear of joy": [7,["adcp"]],
        }
    },
    "7": {
        "text": "In the distance, you hear the faint sounds of dance music playing! What do you do next? ",
        "image" : "smaller_images/disco.png",
"choices": {
            "Sounds like a party! I'm going to go check it out": [8,["adcp","ptz"]],
            "Loud music isn't allowed out here! Someone should notify the authorities": [9,["ais"]],
            "Listen to the music from a distance": [9,["starlink", "genset"]],
        }
    },
    "8": {
        "text": "As you sail towards the music, you realize it is coming from a pirate ship! How do you react?",
        "image" : "smaller_images/pirates.png",
"choices": {
            "Call the Coast Guard": [11,["genset","ais"]],
            "Give the pirates a bottle of rum and some shells": [11,["adcp", "ptz"]],
            "Flee instantly": [11,["ais", "ptz"]],
            "Pretend to be a pirate as well": [11,["starlink"]],
        }
    },
    "9": {
        "text": "You listen to the music on the water for a while, and eventually the sun sets. The stars are beautiful! Suddenly you see something suspicious in the night sky, a UFO?!!?! What do you do?",
        "image" : "smaller_images/aliens.png",
"choices": {
            "Aliens aren't real!": [10,["genset","ptz"]],
            "Spooky! I hope the aliens are friendly :p": [10,["adcp"]],
            "Try to lay low": [10,["ais", "starlink"]],
        }
    },
    "10": {
        "text": "The UFO passes by, and you continue on your journey. As you sail off, a bird swoops down and sits on you. What do you do next?",
        "image" : "smaller_images/bird.png",
"choices": {
            "SCREAM and tell it to get off": [12,["genset","ais"]],
            "Say hi! Birds are cool": [12,["adcp", "ptz"]],
            "Try to figure out if it is really a bird...": [12,["ais", "ptz"]],
            "Die immediately. Birds are scary!": [12,["starlink"]],
        }
    },
    "11": {
        "text": "The pirates pass by, and you continue on your journey. As you sail off, a bird swoops down and sits on you. What do you do next?",
        "image" : "smaller_images/bird.png",
"choices": {
            "SCREAM and tell it to get off": [12,["genset","ais"]],
            "Say hi! Birds are cool": [12,["adcp", "ptz"]],
            "Try to figure out if it is really a bird...": [12,["ais", "ptz"]],
            "Die immediatly. Birds are scary!": [12,["starlink"]],
        }
    },   
    "12": {
        "text": "That night, you see the most beautiful sunset! How do you feel?",
        "image" : "smaller_images/sunset.png",
"choices": {
            "THE OCEAN IS A MAGICAL PLACE! I'm so grateful I get to explore it!!": [0,["adcp"]],
            "My job is the coolest!": [0,["starlink", "ptz", "ais"]],
            "The perfect ending to the perfect day!": [0,["genset"]],
        }
    },
};

const personalities = {
    "ptz": 0, // Nosey bitch
    "starlink": 0, // Elon Sympathizer
    "genset": 0, // Gym bro
    "ais": 0, // Narc
    "adcp": 0, // Ocean enjoyer (flamboyantly)
 }; 

let currentState = 1;

function renderState(state) {
    const storyText = document.getElementById('story-text');
    const storyImage = document.getElementById('story-image');
    const choicesContainer = document.getElementById('choices');

    const img = new Image();
    img.src = gameData[state].image;

    img.onload = () => {
        storyImage.src = img.src;
        storyText.textContent = gameData[state].text;
        choicesContainer.innerHTML = '';

        for (const [choice, info] of Object.entries(gameData[state].choices)) {
            const button = document.createElement('button');
            button.textContent = choice;
            button.className = 'choice-button';
            let nextState = info[0];
            button.onclick = () => changeState(nextState, info[1]); //each time you change state you update the personalities dictionary
            choicesContainer.appendChild(button);
        }
    };
}


function changeState(newState, selectedPersonalities) { 
    // console.log(personalities); 
    selectedPersonalities.forEach(personality => {
        personalities[personality]++;
    });

    currentState = newState;

    if (currentState === 0) {
        revealMostSelectedVegetable();
    } else {
        renderState(currentState);
    }
}
function revealMostSelectedVegetable() {
    let maxCount = 0;
    let maxVeggie = '';

    // Find the personality with the highest count
    for (const [vegetable, count] of Object.entries(personalities)) {
        if (count > maxCount) {
            maxCount = count;
            maxVeggie = vegetable;
        }
    }

    // Fallback if no clear maxVeggie is found
    if (maxVeggie === '') {
        maxVeggie = 'default'; // Replace with a valid default image name
    }

    const storyImage = document.getElementById('story-image');
    const text = document.getElementById('story-text');
    const choicesContainer = document.getElementById('choices');
    const veggieImagePath = `smaller_images/id_cards/${maxVeggie}.png`;

    console.log('Max Veggie:', maxVeggie);
    console.log('Image path:', veggieImagePath);

    // Preload the image
    const img = new Image();
    img.src = veggieImagePath;
    img.className = 'responsive-image';

    // Handle image load error
    img.onerror = () => {
        console.error(`Failed to load image: ${veggieImagePath}`);
        text.textContent = "Oops! The image couldn't be found. Please try again!";
    };

    // Share button creation
    const shareButton = document.createElement('button');
    shareButton.textContent = 'Share the game with Friends';
    shareButton.className = 'choice-button';

    shareButton.onclick = () => {
        const shareMessage = `Check out my Sensor ID! You can create yours at https://clarelaroche2.github.io/hackathon_2024/#`;
        navigator.clipboard.writeText(shareMessage).then(() => {
            alert('Link copied to clipboard!');
        }).catch(() => {
            prompt('Copy this link manually:', shareMessage);
        });
    };

    // Once the image is loaded, update the DOM
    img.onload = () => {
        console.log('Image loaded successfully');
        
        // Hide previous elements
        storyImage.style.display = 'none';
        choicesContainer.style.display = 'none';

        // Replace the text content with the new message
        text.innerHTML = ''; // Clear any previous content
        text.textContent = "Drumroll... here is your Veggie ID! Don't lose it! (Right click or hold the image to save)";
        
        // Append the new image and share button
        text.appendChild(img);
        text.appendChild(shareButton);
    };
}

function startGame() {
    document.querySelector('.title').style.display = 'none';
    document.getElementById('homescreen').style.display = 'none';
    document.querySelector('.start-button').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    renderState(currentState);
}

window.onload = () => {
    // chatgpt- No need to call renderState here
};


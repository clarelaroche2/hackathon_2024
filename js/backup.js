const gameData = {
    "1": {
        "text": "Congrats! You're going out on deployment... where are you going?",
        "image" : "smaller_images/snackies.png",
"choices": {
            "Key West": [2,["AIS","Genset","PTZ","Starlink"]],
            "St Thomas": [2,["ADCP"]],
            "San Diego": [2,["PTZ", "Genset", "AIS"]],
            "Caymans": [2,["Starlink","PTZ","ADCP"]],
        }
    },
    "2": {
        "text": "What is the purpose of your mission??",
        "image" : "smaller_images/where_to.png",
"choices": {
            "Revolutionizing ocean science, of course!": [3,["ADCP"]],
            "Military version of I spy": [3, ["PTZ", "Genset", "AIS", "Starlink"]],
            "I'm on an exciting R&D mission, testing out some new technology we've put into the ocean for the first time": [3, ["Starlink", "ADCP", "Genset"]]
        }
    },
    "3": {
        "text": "After some great preparation and clearing TechOps and Pilot checkouts, you're ready to go! Deployment goes off without a hitch, but soon you find yourself in the middle of a crazy storm. The waves are heaving, and the wind is gusting at over 30 knots! What do you do?",
        "image" : "smaller_images/at_beach.png",
"choices": {
            "Fall into the water... the wave came out of nowhere!!": [4,["ADCP", "AIS"]],
            "Hunker down! It makes the most sense to wait this one out": [4,["Genset", "PTZ", "Starlink"]],
            "What an opportunity! I'm curious what data we could collect here...": [4,["ADCP", "PTZ"]],
        }
    },
    "4": {
        "text": "OVERRRRBOAAARRRRDDDD! As you sink into the water hit ground much sooner than expected. You have discovered a sea mount",
        "image" : "smaller_images/at_beach.png",
"choices": {
            "Awesome!! I gotta document EVERYTHING. I hope I see a mermaid": [6,["ADCP", "PTZ"]],
            "Who cares?? It's still the water. Start looking for ways home" : [6,["Genset", "Starlink", "AIS"]],
            "Gollie Geeee! I wonder if there are boats down here...": [6,["AIS", "PTZ"]],
        }
    },
    "5": {
        "text": "The storm is getting really rough. It's been days since you've seen the sun",
        "image" : "smaller_images/at_beach.png",
"choices": {
            "Pray to every god until one answers": [6,["ADCP", "AIS", "Genset"]],
            "You've seen Treasure Planet, Moana 2, and Captain and Commander. You can absolutely navigate your way through this. Press on": [6,["AIS", "PTZ", "Starlink"]],
            "It's time to be realistic. Start planning who's power you are going to pull first.": [6,["Genset", "PTZ", "AIS"]],
        }
    },
    "6": {
        "text": "You are finally on mission, yay! As you sail off you notice bird swoops down and sits on you. What do you do next?",
        "image" : "smaller_images/at_beach.png",
"choices": {
            "SCREAM and tell it to get off": [0,["Genset","AIS"]],
            "Say hi! Birds are cool": [0,["ADCP", "PTZ"]],
            "Try to figure out if it is really a bird...": [0,["AIS, PTZ"]],
            "Die": [0,["Starlink"]],
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

    for (const [vegetable, count] of Object.entries(personalities)) {
        if (count > maxCount) {
            maxCount = count;
            maxVeggie = vegetable;
        }
    }

    const storyImage = document.getElementById('story-image');
    const text = document.getElementById('story-text');
    const choicesContainer = document.getElementById('choices');
    const veggieImagePath = `smaller_images/id_cards/${maxVeggie}_id.png`;

    // Preload the image
    const img = new Image();
    img.src = veggieImagePath;
    img.className = 'responsive-image'; 

    // Create the share button
    const shareButton = document.createElement('button');
    shareButton.textContent = 'Share the game with Friends';
    shareButton.className = 'choice-button';

    // Once the image is loaded, update the DOM
    img.onload = () => {
        storyImage.style.display = 'none';
        choicesContainer.style.display = 'none';
    
        text.textContent = "Drumroll... here is your Veggie ID! Don't lose it! (Right click or hold the image to save)";
        text.appendChild(img);

        // Share button functionality
        shareButton.onclick = () => {
            const shareMessage = `Check out my Veggie ID! You can create yours at https://sophie006liu.github.io/vegetal/`;
            navigator.clipboard.writeText(shareMessage).then(() => {
                alert('Link copied to clipboard!');
            }).catch(err => {
                alert('Failed to copy link. Please try again.');
            });
        };

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
    renderState(currentState);
}
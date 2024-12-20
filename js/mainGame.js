const gameData = {
    "1": {
        "text": "Congrats! You're going out on deployment... where are you going?",
        "image" : "smaller_images/snackies.png",
 "choices": {
            "Key West": [2,["AIS","Genset","PTZ","Starlink"]],
            "St Thomas": [2,["ADCP", "AIS","PTZ"]],
            "San Diego": [2,["Genset", "AIS"]],
            "Caymans": [2,["Genset","Starlink","PTZ","ADCP"]],
        }
    },
    "2": {
        "text": "What is the purpose of your mission??",
        "image" : "smaller_images/where_to.png",
 "choices": {
            "Revolutionizing ocean science, of course!": [3,["ADCP", "AIS"]],
            "Military version of I spy": [3, ["PTZ", "Genset", "AIS", "Starlink"]],
            "I'm on an exciting R&D mission, testing out some new technology we've put into the ocean for the first time": [3, ["PTZ", "Starlink", "ADCP", "Genset"]]
        }
    },
    "3": {
        "text": "After some great preparation and clearing TechOps and Pilot checkouts, you're ready to go! Deployment goes off without a hitch, but soon you find yourself in the middle of a crazy storm. The waves are heaving, and the wind is gusting at over 30 knots! What do you do?",
        "image" : "smaller_images/at_beach.png",
 "choices": {
            "Fall into the water... the wave came out of nowhere!!": [4,["ADCP", "Genset"]],
            "Hunker down! It makes the most sense to wait this one out": [5,["Genset", "AIS", "PTZ", "Starlink"]],
            "What an opportunity! I'm curious what data we could collect here...": [5,["ADCP", "PTZ"]],
        }
    },
    "4": {
        "text": "OVERRRRBOAAARRRRDDDD! As you sink, you hit ground much sooner than expected. You have discovered a sea mount",
        "image" : "smaller_images/at_beach.png",
 "choices": {
            "Awesome!! Science! I gotta document EVERYTHING. I hope I see a mermaid": [6,["ADCP", "PTZ", "AIS"]],
            "Who cares?? This is not the plan you need to start looking for ways home": [6,["Genset", "Starlink", "AIS"]],
            "Gollie Geeee! I wonder if there are boats down here...": [6,["AIS", "PTZ"]],
        }
    },
    "6": {
        "text": "Suddenly, a giant whale comes out of nowhere and swallows you right up!",
        "image" : "smaller_images/at_beach.png",
 "choices": {
            "I can't wait to tell the other sensors about this!!": [10,["ADCP", "AIS", "PTZ"]],
            "I AM GOING TO DIE IN HERE I AM SCARED OF THE DARK" : [10,["Starlink", "Genset"]],
            "If I wait for him to come up for air, I can make it out of the blow hole!!": [10,["AIS", "PTZ", "ADCP"]],
        }
    },
    "5": {
        "text": "The storm is getting really rough. It's been days since you've seen the sun",
        "image" : "smaller_images/at_beach.png",
 "choices": {
            "Pray to every god until one answers": [7,["ADCP", "AIS", "Genset"]],
            "Cry.": [7,["AIS"]],
            "You've seen Treasure Planet, Moana 2, and Captain and Commander. You can absolutely navigate your way through this. Press on": [8,["AIS", "PTZ", "Starlink"]],
            "It's time to be realistic. Start planning who's power you are going to pull first.": [8,["Genset", "PTZ", "AIS"]],
        }
    },
    "7": {
        "text": "What did you think that was going to do? The wind and waves are like nothing you've ever seen.",
        "image" : "smaller_images/at_beach.png",
 "choices": {
            "Start throwing errors. I need to get some sonar alerts back so the nerds back at HQ can help me": [10,["ADCP", "AIS", "PTZ"]],
            "I'm just going to shut down, I'm giving up until the sun comes out" : [10,["Starlink", "Genset"]],
        }
    },
    "8": {
        "text": "The sun finally peeks out from behind the clouds. The storm passed! Phew! You look at the horizon with relief and see a black flag approaching in the distance. Pirates! What do you do next?",
        "image" : "smaller_images/at_beach.png",
 "choices": {
            "Cry": [10,["ADCP", "Genset"]],
            "Call the Coast Guard": [10,["AIS"]],
            "Flee immediately": [10,["AIS", "PTZ", "Starlink"]],
            "Start sailing towards them. Pirates are a good time! Maybe we can drink some rum together :p ": [10,["ADCP", "PTZ"]],
        }
    },
    "10": {
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
    "Ptz": 0, // Nosey bitch
    "Starlink": 0, // Elon Sympathizer
    "Genset": 0, // Gym bro
    "Ais": 0, // Narc
    "Adcp": 0, // Ocean enjoyer (flamboyantly)
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
    const veggieImagePath = `smaller_images/id_cards/${maxVeggie}.png`;

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

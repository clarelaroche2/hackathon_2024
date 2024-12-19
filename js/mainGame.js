const gameData = {
    "1": {
        "text": "Congrats! You're going out on deployment... where are you going?",
        "choices": {
            "Key West": [2,["AIS","Genset","PTZ","Starlink"]],
            "St Thomas": [2,["ADCP"]],
         "San Diego": [2,["PTZ", "Genset", "AIS"]],
            "Caymans": [2,["Starlink","PTZ","ADCP"]],
        }
    },
    "2": {
        "text": "What is the purpose of your mission?",
        "choices": {
            "Revolutionizing ocean science, of course!": [3,["ADCP"]],
            "Military version of I spy": [3, ["PTZ", "Genset", "AIS", "Starlink"]],
            "I'm on an exciting R&D mission, testing out some new technology we've put into the ocean for the first time": [3, ["Starlink", "ADCP", "Genset"]]
        }
    },
    "3": {
        "text": "After some great preparation and clearing TechOps and Pilot checkouts, you're ready to go! Deployment goes off without a hitch, but soon you find yourself in the middle of a crazy storm. The waves are heaving, and the wind is gusting at over 30 knots! What do you do?",
        "choices": {
            "Fall into the water... the wave came out of nowhere!!": [4,["ADCP", "AIS"]],
            "Hunker down! It makes the most sense to wait this one out": [5,["Genset", "PTZ", "Starlink"]],
            "What an opportunity! I'm curious what data we could collect here...": [5,["ADCP", "PTZ"]],
        }
    }, 

};
const personalities = {
    "PTZ": 0, // Nosey bitch
    "Starlink": 0, // Elon Sympathizer
    "Genset": 0, // Gym bro
    "AIS": 0, // Narc
    "ADCP": 0, // Ocean enjoyer (flamboyantly)
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

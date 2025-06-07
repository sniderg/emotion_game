// Game Elements
const illustrationBox = document.getElementById('illustration-box');
const storyTextBox = document.getElementById('story-text-box');
const choice1Btn = document.getElementById('choice1');
const choice2Btn = document.getElementById('choice2');
const gameContainer = document.getElementById('game-container');
const endScreen = document.getElementById('end-screen');
const resetScreen = document.getElementById('reset-screen');
const resetButton = document.getElementById('reset-button');

let mistakeCount = 0;
const maxMistakes = 2;

// The game data now uses emojis for illustrations.
const gameData = {
    start: { illustration: '🚪🎶😵', text: "You arrive at your friend Leo's birthday party. The door opens and a wave of noise hits you! Music is playing, and kids are yelling happily. It's a lot all at once.", choices: [{ text: 'Take a deep breath and walk in slowly.', next: 'step2_calm', isMistake: false }, { text: 'Cover your ears and run past everyone.', next: 'step1_bad', isMistake: true }] },
    step2_calm: { illustration: '🧍‍♂️➡️🥳', text: "You see Leo opening presents. He looks happy! It's polite to say hello to the birthday kid.", choices: [{ text: "Walk over and say, 'Hi Leo! Happy Birthday!'", next: 'step3_join', isMistake: false }, { text: 'Go straight to the cool-looking bounce house.', next: 'step2_bad', isMistake: true }] },
    step3_join: { illustration: '🕺💃🎶', text: "Leo says 'Thanks for coming!' and goes back to his presents. A group of kids is playing freeze dance. It looks fun. This is the 'group plan'.", choices: [{ text: 'Join in the freeze dance with them.', next: 'step4_flex', isMistake: false }, { text: "Grab a ball and start your own game nearby.", next: 'step3_bad', isMistake: true }] },
    step4_flex: { illustration: '🤔', text: "The music stops and you freeze in a funny pose! It's fun. After a few rounds, another kid suggests they play tag instead. You really liked freeze dance.", choices: [{ text: "Say 'Okay, tag sounds fun too!' (Flexible Thinking)", next: 'step5_present', isMistake: false }, { text: "Say 'No! I only want to play freeze dance!'", next: 'step4_bad', isMistake: true }] },
    step5_present: { illustration: '🎁🎁🎁', text: "You play tag for a bit, then an adult calls out, 'Time for Leo to open his presents!' You find your gift and put it in the pile.", choices: [{ text: 'Sit with the group and watch Leo open gifts.', next: 'step6_watch', isMistake: false }, { text: "Keep playing tag by yourself.", next: 'step5_bad', isMistake: true }] },
    step6_watch: { illustration: '😕🎁', text: "You watch Leo open your gift. He smiles, but only for a second before grabbing the next one. You feel a little disappointed. You thought he'd be more excited.", choices: [{ text: 'Remember he has lots of gifts and is excited about all of them.', next: 'step7_cake', isMistake: false }, { text: 'Go up to him and say, "Why don\'t you like my gift?"', next: 'step6_bad', isMistake: true }] },
    step7_cake: { illustration: '🎂🙉', text: "Next is birthday cake! Everyone starts singing 'Happy Birthday' VERY loudly. The sound is starting to bother you again.", choices: [{ text: 'Quietly put your hands over your ears while staying with the group.', next: 'step8_tired', isMistake: false }, { text: 'Yell "Stop singing! It\'s too loud!"', next: 'step7_bad', isMistake: true }] },
    step8_tired: { illustration: '🥱', text: "You eat your cake. It was yummy! But now you feel tired. The party has been long and you're feeling a little worn out.", choices: [{ text: 'Find your parent and quietly say, "I am feeling tired."', next: 'step9_goodbye', isMistake: false }, { text: 'Lie down on the floor in the middle of the room.', next: 'step8_bad', isMistake: true }] },
    step9_goodbye: { illustration: '👋🙂', text: "Your parent says, 'Thanks for letting me know. It's almost time to go anyway.' They agree it's time to say goodbye to Leo.", choices: [{ text: "Find Leo and say, 'Thanks for having me, I had fun!'", next: 'step10_home', isMistake: false }, { text: 'Just walk out the door without saying anything.', next: 'step9_bad', isMistake: true }] },
    step10_home: { illustration: '🚗😌', text: "Leo gives you a high-five. In the car on the way home, you feel good. The party was a little hard, but you handled it! You feel proud.", choices: [{ text: 'Feel proud of yourself!', next: 'win', isMistake: false }, { text: 'Feel proud of yourself!', next: 'win', isMistake: false }] },
    // Mistake Paths
    step1_bad: { illustration: '🏃‍♂️💨😨', text: "You run inside. It's even louder and more crowded than you thought! You feel shaky and don't know what to do first. This is a tough start.", choices: [{ text: "Find a quiet corner and take a breath.", next: 'step2_calm', isMistake: false }, { text: 'Go to the bounce house to get away.', next: 'step2_bad', isMistake: true }] },
    step2_bad: { illustration: '😔...🧍‍♂️', text: "You ignore Leo and run to the bounce house. Later, you see Leo looking sad that you didn't say hi. Other kids notice, too.", choices: [{ text: "Go say 'Sorry I didn't say hi. Happy Birthday!'", next: 'step3_join', isMistake: false }, { text: 'Just keep bouncing.', next: 'step3_bad', isMistake: true }] },
    step3_bad: { illustration: '🧍‍♂️... 🕺💃', text: "You start bouncing a ball, but no one joins you. The other kids are all still playing freeze dance together. You feel a little lonely.", choices: [{ text: 'See if you can join their group plan.', next: 'step4_flex', isMistake: false }, { text: 'Try to get them to play your ball game.', next: 'step4_bad', isMistake: true }] },
    step4_bad: { illustration: '😠... 🏃‍♀️🏃‍♂️', text: "You get upset and insist on freeze dance. The other kids get annoyed and decide to play tag away from you. Now you are all alone.", choices: [{ text: "Take a breath and go ask if you can play tag.", next: 'step5_present', isMistake: false }, { text: "Sit by yourself and feel mad.", next: 'step5_bad', isMistake: true }] },
    step5_bad: { illustration: '😳', text: "You keep playing by yourself while everyone else sits down for presents. An adult has to come and ask you to join the group. It feels a little embarrassing.", choices: [{ text: 'Say "Okay" and go join them.', next: 'step6_watch', isMistake: false }, { text: 'Ignore the adult.', next: 'step6_bad', isMistake: true }] },
    step6_bad: { illustration: '🗣️❓😟', text: 'You interrupt Leo while he is opening another gift. He looks confused, and his mom gives you a worried look. The other kids are whispering.', choices: [{ text: 'Say "Sorry" and go back to your seat.', next: 'step7_cake', isMistake: false }, { text: 'Keep asking why he didn\'t like your gift.', next: 'step7_bad', isMistake: true }] },
    step7_bad: { illustration: '🤫😠', text: "Everyone stops singing and stares at you. The room gets quiet and it feels very uncomfortable. Leo's mom says, 'It's okay, but we use quiet voices at the party.'", choices: [{ text: 'Nod and sit quietly.', next: 'step8_tired', isMistake: false }, { text: 'Yell "I don\'t want to be quiet!"', next: 'step8_bad', isMistake: true }] },
    step8_bad: { illustration: '😵‍💫눕다', text: 'You lie on the floor. A few kids giggle, but an adult has to come over and ask you to please get up because people might trip. You feel overwhelmed and noticed.', choices: [{ text: 'Get up and go tell your parent you are tired.', next: 'step9_goodbye', isMistake: false }, { text: 'Refuse to get up.', next: 'step9_bad', isMistake: true }] },
    step9_bad: { illustration: '🚪🚶‍♂️... 🤔', text: "You leave without a word. From the car, you see Leo through the window. He looks a little confused or sad. You feel a weird pit in your stomach.", choices: [{ text: 'Decide to tell him "thank you" at school.', next: 'step10_home', isMistake: false }, { text: 'Just ignore the feeling.', next: 'reset', isMistake: true }] },
};

function showScene(sceneId) {
    if (sceneId === 'win') {
        gameContainer.style.display = 'none';
        endScreen.style.display = 'block';
        return;
    }
    if (sceneId === 'reset' || mistakeCount > maxMistakes) {
        gameContainer.style.display = 'none';
        resetScreen.style.display = 'block';
        return;
    }

    const scene = gameData[sceneId];
    if (!scene) { return; }

    illustrationBox.innerHTML = `<div>${scene.illustration}</div>
    <!-- The path for the image is now 'images/sceneId.png' -->
    <!-- <img src="images/${sceneId}.png" alt="A drawing of the current scene"> -->`;

    storyTextBox.innerText = scene.text;

    // --- RANDOMIZATION LOGIC ---
    const [choiceA, choiceB] = scene.choices;
    const assignChoice = (button, choiceData) => {
        button.innerText = choiceData.text;
        button.dataset.next = choiceData.next;
        button.dataset.isMistake = choiceData.isMistake;
    };

    if (Math.random() < 0.5) {
        assignChoice(choice1Btn, choiceA);
        assignChoice(choice2Btn, choiceB);
    } else {
        assignChoice(choice1Btn, choiceB);
        assignChoice(choice2Btn, choiceA);
    }
}

function handleChoice(e) {
    const button = e.target.closest('.choice-btn');
    if (button) {
        if (button.dataset.isMistake === 'true') {
            mistakeCount++;
        }
        showScene(button.dataset.next);
    }
}

function startGame() {
    mistakeCount = 0;
    resetScreen.style.display = 'none';
    endScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    showScene('start');
}

// Event Listeners
gameContainer.addEventListener('click', handleChoice);
resetButton.addEventListener('click', startGame);

// Initial Load
startGame();
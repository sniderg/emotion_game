/**
 * Game Logic File
 *
 * This file controls the game flow, user interactions, and DOM updates.
 * It uses the `gameData` object defined in `config.js`.
 */

// --- DOM ELEMENTS ---
const gameContainer = document.getElementById('game-container');
const illustrationBox = document.getElementById('illustration-box');
const storyTextBox = document.getElementById('story-text-box');
const choice1Btn = document.getElementById('choice1');
const choice2Btn = document.getElementById('choice2');
const endScreen = document.getElementById('end-screen');
const resetScreen = document.getElementById('reset-screen');
const resetButton = document.getElementById('reset-button');

// --- GAME STATE ---
let mistakeCount = 0;
const MAX_MISTAKES = 2;

// --- FUNCTIONS ---

/**
 * Updates the display with the content of the current scene.
 * @param {object} scene - The scene object from gameData.
 * @param {string} sceneId - The key for the current scene.
 */
function updateDisplay(scene, sceneId) {
    // Update illustration and text
    illustrationBox.innerHTML = `<div>${scene.illustration}</div>
    <!-- <img src="images/${sceneId}.png" alt="A drawing of the current scene"> -->`;
    storyTextBox.innerText = scene.text;

    // Randomize and display choices
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

/**
 * Renders a new scene based on its ID.
 * @param {string} sceneId - The key for the scene to render (e.g., 'start', 'step2_calm').
 */
function renderScene(sceneId) {
    // Check for win/loss conditions first
    if (sceneId === 'win') {
        gameContainer.style.display = 'none';
        endScreen.style.display = 'block';
        return;
    }
    if (sceneId === 'reset' || mistakeCount > MAX_MISTAKES) {
        gameContainer.style.display = 'none';
        resetScreen.style.display = 'block';
        return;
    }

    const scene = gameData[sceneId];
    if (scene) {
        updateDisplay(scene, sceneId);
    } else {
        console.error(`Scene with ID "${sceneId}" not found in gameData.`);
    }
}

/**
 * Handles the user's click on a choice button.
 * @param {Event} e - The click event.
 */
function handleChoice(e) {
    const button = e.target.closest('.choice-btn');
    if (button) {
        if (button.dataset.isMistake === 'true') {
            mistakeCount++;
        }
        renderScene(button.dataset.next);
    }
}

/**
 * Initializes or resets the game to its starting state.
 */
function startGame() {
    mistakeCount = 0;
    resetScreen.style.display = 'none';
    endScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    renderScene('start');
}

// --- EVENT LISTENERS ---
gameContainer.addEventListener('click', handleChoice);
resetButton.addEventListener('click', startGame);

// --- INITIALIZE GAME ---
startGame();
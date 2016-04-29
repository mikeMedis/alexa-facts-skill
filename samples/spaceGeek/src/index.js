/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var COMPUTER_FACTS = [
		"The first electronic computer ENIAC weighed more than 27 tons and took up 1800 square feet.",
    "Only about 10% of the world’s currency is physical money, the rest only exists on computers.",
    "TYPEWRITER is the longest word that you can write using the letters only on one row of the keyboard of your computer.",
    "Doug Engelbart invented the first computer mouse in around 1964 which was made of wood.",
    "There are more than 5000 new computer viruses are released every month.",
    "Around 50% of all Wikipedia vandalism is caught by a single computer program with more than 90% accuracy.",
    "If there was a computer as powerful as the human brain, it would be able to do 38 thousand trillion operations per second and hold more than 3580 terabytes of memory.",
    "The password for the computer controls of nuclear tipped missiles of the U.S was 00000000 for eight years.",
    "Approximately 70% of virus writers are said to work under contract for organized crime syndicates.",
    "HP, Microsoft and Apple have one very interesting thing in common – they were all started in a garage.",
    "An average person normally blinks 20 times a minute, but when using a computer he/she blinks only 7 times a minute.",
    "The house where Bill Gates lives, was designed using a Macintosh computer.",
    "The first 1GB hard disk drive was announced in 1980 which weighed about 550 pounds, and had a price tag of $40,000.",
		"More than 80% of the emails sent daily are spams.",
		"A group of 12 engineers designed IBM PC and they were called as “The Dirty Dozen”.",
		"The original name of windows was Interface Manager.",
		"The first microprocessor created by Intel was the 4004. It was designed for a calculator, and in that time nobody imagined where it would lead.",
		"IBM 5120 from 1980 was the heaviest desktop computer ever made. It weighed about 105 pounds, not including the 130 pounds external floppy drive.",
		"Genesis Device demonstration video in Star Trek II: The Wrath of Khan was the the first entirely computer generated movie sequence in the history of cinema. That studio later become Pixar."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * ComputerGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var ComputerGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
ComputerGeek.prototype = Object.create(AlexaSkill.prototype);
ComputerGeek.prototype.constructor = ComputerGeek;

ComputerGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("ComputerGeek onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

ComputerGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("ComputerGeek onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
ComputerGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("ComputerGeek onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

ComputerGeek.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Space Geek tell me a space fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * COMPUTER_FACTS.length);
    var fact = COMPUTER_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your computer fact: " + fact;

    response.tellWithCard(speechOutput, "ComputerGeek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the ComputerGeek skill.
    var spaceGeek = new ComputerGeek();
    spaceGeek.execute(event, context);
};

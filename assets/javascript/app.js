$(document).ready(function() {

    var timer = 30;
    var intervalId;
    var questions = [
        {
            question: "Who was the lead singer for Black Sabbath in the 1970s?",
            choices: ["Ronnie James Dio", "Ozzy Osbourne", "Ian Gillan", "Glenn Hughes"],
            answer: 1,
            photo: "assets/images/ozzy.jpg"

        },
        {
            question: "From what country is the band Thin Lizzy from?",
            choices: ["Ireland", "Scotland", "New Zealand", "Sweden"],
            answer: 0,
            photo: "assets/images/lizzy.jpg"
        },
        {
            question: "In what year did Van Halen release their groundbreaking debut album?",
            choices: ["1976", "1977", "1978", "1979"],
            answer: 2,
            photo: "assets/images/halen.png"

        },
        {
            question: "Who was the lead guitar player for Led Zeppelin?",
            choices: ["Tony Iommi", "Brian May", "Jimmy Page", "Ritchie Blackmore"],
            answer: 2,
            photo: "assets/images/page.jpg"
        },
        {
            question: "What is the highest-selling KISS album?",
            choices: ["Destroyer", "Love Gun", "Alive II", "Alive"],
            answer: 3,
            photo: "assets/images/alive.jpg"

        }
    ];


    var correctAnswers = 0;
    var wrongAnswers = 0;
    var unanswered = 0;
    var count = 0;
    var pick;
    var running = false;
   

    $("#start").on("click", function() {
        $("#start").hide();
        $("#text").empty();
        runTimer();
        displayQuestion();
    });

    $("#start-over").on("click", function() {
        $("#start-over").hide();
        $("#text").empty();
        runTimer();
        displayQuestion();
    });


    function stop() {
        clearInterval(intervalId)
        running = false;
    };

    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        };
    }

    function decrement() {
        timer--;
        $("#timer").html("<p>Time Remaining: " + timer)
        
        if (timer === 0) {
            timeup();
        };

    };

    function displayQuestion() {
        pick = questions[count];
        $("#question-response").html("<h2>" + pick.question + "</h2>");
        $("#correct-answer").empty();
        $("#images").empty();
		for(var i = 0; i < pick.choices.length; i++) {
			var userChoice = $("<button>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choices[i]);
			userChoice.attr("data-guessvalue", i);
			$("#options").append(userChoice);

    };

    $(".answerchoice").on("click", function () {
        userGuess = parseInt($(this).attr("data-guessvalue"));
        if (userGuess === pick.answer) {
            correctAnswer();
    
        } else {
            wrongAnswer();
        };
    });
};


    function nextQuestion() {
        count ++;
        if (count === questions.length){
            results();
         } else {
            displayQuestion()
         }
    };

    function timeup() {
        stop();
        pick = questions[count];
        $("#question-response").html("<p>Out of Time!</p>")
        $("#correct-answer").html("<p>The correct answer was "+ pick.choices[pick.answer] +"!</p>");
        $("#images").html("<img src=" + pick.photo + " width='200px' height='250px'/>")
        $("#timer").empty();
        $("#options").empty();
        unanswered ++;
        setTimeout(nextQuestion, 3000);
        setTimeout(runTimer, 3000);
        timer = 30;
    };

    function wrongAnswer() {
        stop();
        pick = questions[count];
        $("#question-response").html("<p>Wrong!</p>")
        $("#correct-answer").html("<p>The correct answer was "+ pick.choices[pick.answer] +"!</p>");
        $("#images").html("<img src=" + pick.photo + " width='200px' height='225px'/>")
        $("#timer").empty();
        $("#options").empty();
        wrongAnswers ++;
        setTimeout(nextQuestion, 3000);
        setTimeout(runTimer, 3000);
        timer = 30;
     };

     function correctAnswer() {
        stop();
        pick = questions[count];
        $("#question-response").html("<p>Correct!</p>")
        $("#correct-answer").html("<p>The answer was indeed "+ pick.choices[pick.answer] +"!</p>");
        $("#images").html("<img src=" + pick.photo + " width='200px' height='250px'/>")
        $("#timer").empty();
        $("#options").empty();
        correctAnswers ++;
        setTimeout(nextQuestion, 3000);
        setTimeout(runTimer, 3000);
        timer = 30;
     };

     
     function results() {
         running=true;
            $("#correct-answer").empty();
            $("#images").empty();
            $("#options").empty();
            $("#question-response").empty();
            $("#text").empty();
            $("#timer").empty();
            $("#results").html(
            "<h3>Long Live Rock n' Roll!</h3>"+
            "<p>Correct: "+ correctAnswers +"</p>"+
            "<p>Incorrect: "+ wrongAnswers +"</p>"+
            "<p>Unaswered: "+ unanswered +"</p>");
     }
   
    
  
   
});
$(document).ready(function() {

    var number = 31;
    var timer;
    var questions = [
        "Who was the lead singer for Black Sabbath in the 1970s?", 
        "Who was the lead guitar player for Led Zeppelin?",
        "In what year did Van Halen release their groundbreaking debut album?"

    ];
    var answers = [
        "Ozzy Osbourne", "Jimmy Page", "1978"
    ];

    var correctAnswers = 0;
    var wrongAnswers = 0;
    var unanswered = 0;
    var count = 0;

    function run() {
        clearInterval(timer);
        timer = setInterval(nextQuestion, 1000);
        $("#text").html("<p>Time Remaining: " + number)
        $("#start").hide();
        nextQuestion();
    };

    function nextQuestion() {
        number--;
        var questionContent = Object.values(questions)[count];
        $("#question-response").text(questionContent);
        var questionOptions = Object.values(options)[count];
        $.each(questionOptions, function(index, key){
          $("#options").append($("<button class='option btn btn-info btn-lg'>"+key+"</button>"));
        })
        $("#text").html("<p>Time Remaining: " + number)
        
        if (number === 0) {
            timeup();
        };

    };

    function guessCheck() {
    
       
        var resultId;
        
        var currentAnswer = Object.values(answers)[count];
        
        if ($(this).text() === currentAnswer) {
        
          $(this).addClass('btn-success').removeClass('btn-info');
          correctAnswer();
        } else {
          $(this).addClass('btn-danger').removeClass('btn-info');
          wrongAnswer();
            };
        
    };

    function guessResult() {
        count++;
        $('.option').remove();
        $('#results h3').remove();
        trivia.nextQuestion();
         
      }; 

    function timeup() {
        stop ();
        $("#question-response").html("<p>Out of Time!</p>")
        $("#correct-anwer").html("<p>The correct answer was "+ Object.values(answers)[count] +"</p>");
        unanswered ++;
        resultId = setTimeout(guessResult, 1000);
      
    };

    function wrongAnswer() {
         stop ();
         $("#question-response").html("<p>Wrong Answer!</p>")
         $("#correct-anwer").html("<p>The correct answer was "+ Object.values(answers)[count] +"</p>");
         wrongAnswers ++;
         resultId = setTimeout(guessResult, 1000);
     };

     function correctAnswer() {
         stop ();
         $("#question-response").html("<p>Correct!</p>")
         $("#correct-anwer").html("<p>The correct answer was "+ Object.values(answers)[count] +"</p>");
         correctAnswers ++;
         resultId = setTimeout(guessResult, 1000);
     };

     if (count === Object.keys(questions).length){
        $("#results").html("<h3>Long Live Rock n' Roll!</h3>"+
        "<p>Correct: "+ correctAnswers +"</p>"+
        "<p>Incorrect: "+ wrongAnswers +"</p>"+
        "<p>Unaswered: "+ unanswered +"</p>");

        $("#start").text("Start Over?");
     };

    function start() {
        run();
    };

    function stop() {
        clearInterval(timer)
    };
    
  
    $("#start").on("click", start)

});
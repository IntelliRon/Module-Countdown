intervals = {};

function countdownTime(index) {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date (in milliseconds)
    var distance = new Date($("#moduleCountdown"+index).attr("deadline")).getTime() - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    $("#moduleCountdown" + index).text(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

    if (distance < 1.728e+8) {
        if (!$("#moduleDeadline" + index).hasClass("deadlineAlmostOver")) {
            $("#moduleDeadline" + index).addClass("deadlineAlmostOver");
        }
    }

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(intervals["moduleCountdown" + index]);
        $("#moduleCountdown" + index).text("0d 0h 0m 0s");
        if (!$("#moduleDeadline" + index).hasClass("deadlineOver")) {
            $("#moduleDeadline" + index).addClass("deadlineOver");
        }
    }
}

$(function() {
    for (let deadlineDivIndex = 0; deadlineDivIndex < $(".moduleDeadline").length; deadlineDivIndex++) {
        deadlineDiv = $(".moduleDeadline")[deadlineDivIndex];

        if ($(deadlineDiv).length) {
            $(deadlineDiv).attr("id", "moduleDeadline" + deadlineDivIndex);
            if ($("#moduleDeadline" + deadlineDivIndex + " .moduleCountdown").length) {
                $("#moduleDeadline" + deadlineDivIndex + " .moduleCountdown").attr("id", "moduleCountdown" + deadlineDivIndex);

                countdownTime(deadlineDivIndex);
                intervals["moduleCountdown" + deadlineDivIndex] = setInterval(function () { countdownTime(deadlineDivIndex) }, 1000);
            }
        }
    }
});
$(document).ready(function() {
  const maxChars = 140;

  $("#text-area").on("keyup", function() {
    const textLength = $(this).val().length;
    const charsRemaining = maxChars - textLength;

    $("#char-count").text(charsRemaining);

    if (charsRemaining < 0) {
      $("#char-count").addClass("red");
    } else {
      $("#char-count").removeClass("red");
    }
  });
});

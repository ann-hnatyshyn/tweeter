$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    const charCount = $(this).val().length;
    const remainingChars = 140 - charCount;

    // Update the counter
    $(".counter").text(remainingChars);

    if (remainingChars < 0) {
      $(".counter").addClass("over-limit");
    } else {
      $(".counter").removeClass("over-limit");
    }
  });
});

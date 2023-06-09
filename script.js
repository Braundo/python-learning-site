$(document).ready(function () {
  // Assign unique IDs to each checkbox
  $(".sub-checkbox").each(function (index) {
    $(this).attr("id", "checkbox" + index);
  });

  var totalSubCheckboxes = $(".sub-checkbox").length;

  function updateProgressBar() {
    var checkedSubCheckboxes = $(".sub-checkbox:checked").length;
    var progress = Math.min(
      (checkedSubCheckboxes / totalSubCheckboxes) * 100,
      100
    );

    $("#progress-bar div").css("width", progress + "%");

    // Check if progress is 100 and display a modal
    if (progress === 100) {
      // Get the modal
      var modal = document.getElementById("myModal");

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        modal.style.display = "none";
      };

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };

      // Display the modal
      modal.style.display = "block";

      // Create confetti
      createConfetti();
    }

    // Save checkbox states to localStorage whenever they change
    $(".sub-checkbox").change(function () {
      var checkboxId = $(this).attr("id");
      var isChecked = $(this).prop("checked");
      localStorage.setItem(checkboxId, isChecked);
    });
  }

  $("#reset-button").click(function () {
    $(".top-level-checkbox").prop("checked", false);
    $(".sub-checkbox").prop("checked", false);
    $(".content-block").css("opacity", 1);
    $(".bullet-content").slideUp();
    $(".toggle-icon").removeClass("rotated");
    updateProgressBar();
  });

  $(".bullet h3").click(function () {
    $(this).siblings(".bullet-content").slideToggle();
    $(this).find(".toggle-icon").toggleClass("rotated");
  });

  $(".sub-checkbox").change(function () {
    var $subCheckbox = $(this);
    var $h4 = $subCheckbox.siblings("h4");
    var isChecked = $subCheckbox.prop("checked");
    $h4.toggleClass("crossed-out", isChecked);

    var $bullet = $subCheckbox.closest(".bullet");
    var $subCheckboxes = $bullet.find(".sub-checkbox");
    var allSubCheckboxesChecked =
      $subCheckboxes.length === $subCheckboxes.filter(":checked").length;

    $bullet
      .find(".top-level-checkbox")
      .prop("checked", allSubCheckboxesChecked);
    updateProgressBar();
    updateContentBlockTransparency($bullet);
  });

  $(".top-level-checkbox").change(function () {
    var isChecked = $(this).prop("checked");
    $(this).siblings("h3").toggleClass("crossed-out", isChecked);
    $(this)
      .siblings(".bullet-content")
      .find(".sub-checkbox")
      .prop("checked", isChecked);
    updateProgressBar();
    updateContentBlockTransparency($(this).closest(".bullet"));
  });

  function updateContentBlockTransparency($bullet) {
    var $contentBlock = $bullet.closest(".content-block");
    var $topLevelCheckboxes = $contentBlock.find(".top-level-checkbox");
    var allTopLevelCheckboxesChecked =
      $topLevelCheckboxes.length ===
      $topLevelCheckboxes.filter(":checked").length;

    $contentBlock.css("opacity", allTopLevelCheckboxesChecked ? 0.5 : 1);
  }

  updateProgressBar();

  // Load the state from localStorage when the page loads
  $(".sub-checkbox").each(function () {
    var checkboxId = $(this).attr("id");
    var isChecked = localStorage.getItem(checkboxId) === true; // get the state from localStorage

    if (isChecked) {
      // compare with double equals, not triple
      $(this).prop("checked", true); // use jQuery syntax to set the checkbox state
    } else {
      $(this).prop("checked", false); // use jQuery syntax to set the checkbox state
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var body = document.body;
  var icon = document.getElementById("dark-mode-icon");

  // Initialize icon based on initial dark mode state
  icon.innerHTML = body.classList.contains("dark-mode") ? "&#9728;" : "&#9790;";
});

function toggleDarkMode() {
  var body = document.body;
  body.classList.toggle("dark-mode");

  var darkModeToggle = document.querySelector(".dark-mode-toggle");
  darkModeToggle.classList.toggle("dark");
}

function createConfetti() {
  confetti({
    particleCount: 200,
    spread: 90,
    origin: { y: 0 },
  });
}

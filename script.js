$(document).ready(function () {
  var totalSubCheckboxes = $(".sub-checkbox").length;

  function updateProgressBar() {
    var checkedSubCheckboxes = $(".sub-checkbox:checked").length;
    var progress = Math.min(
      (checkedSubCheckboxes / totalSubCheckboxes) * 100,
      100
    );

    $("#progress-bar div").css("width", progress + "%");

// Save checkbox states to localStorage
$(".sub-checkbox").each(function () {
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

const checkboxes = document.querySelectorAll("input[type='checkbox']");

for (const checkbox of checkboxes) {
  checkbox.addEventListener("change", () => {
    localStorage.setItem("checkboxes", JSON.stringify(checkboxes));
  });
}

const checkboxesJSON = localStorage.getItem("checkboxes");

if (checkboxesJSON) {
  const checkboxes = JSON.parse(checkboxesJSON);

  for (const checkbox of checkboxes) {
    checkbox.checked = true;
  }
}

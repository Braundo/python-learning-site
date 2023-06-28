$(document).ready(function () {
  var totalSubCheckboxes = $(".sub-checkbox").length;

  const checkboxValues =
      JSON.parse(localStorage.getItem("checkboxValues")) || {},
    buttons = Array.from(document.querySelectorAll(".checklist-item__expand")),
    labels = Array.from(document.querySelectorAll(".checklist-item__title")),
    checkboxes = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    ),
    checkboxesLength = checkboxes.length,
    progress = document.querySelector(".progress__bar"),
    counter = document.querySelector(".progress__count"),
    reset = document.querySelector(".progress__reset");
  function loadIds() {
    for (let a = 0; a < checkboxesLength; a += 1) {
      const b = (a) => a.replace(/[ ,.!?;:'-]/g, "");
      (checkboxes[a].id = `${b(
        checkboxes[a].nextSibling.nextSibling.innerText
      ).toLowerCase()}`),
        checkboxes[a].nextSibling.setAttribute(
          "for",
          `${b(checkboxes[a].nextSibling.nextSibling.innerText).toLowerCase()}`
        );
    }
  }
  function updateStorage(a) {
    (checkboxValues[a.id] = a.checked),
      localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
  }
  function countChecked() {
    if ("checkbox" === this.type) {
      const a = this.parentNode.parentNode.parentNode,
        b =
          a.querySelectorAll("input:checked").length /
          a.querySelectorAll(".checklist-item").length;
      a.querySelector(
        ".checklist__percentage-border"
      ).style.transform = `scaleX(${b})`;
    } else
      Array.from(document.querySelectorAll(".checklist")).forEach((a) => {
        const b =
          a.querySelectorAll("input:checked").length /
          a.querySelectorAll(".checklist-item").length;
        a.querySelector(
          ".checklist__percentage-border"
        ).style.transform = `scaleX(${b})`;
      });
    let a = 0;
    Array.from(document.querySelectorAll("input:checked")).forEach(() => {
      a += 1;
    }),
      (counter.innerText = `${a}/${checkboxesLength}`),
      (progress.style.transform = `scaleX(${a / checkboxesLength})`),
      (checkboxValues.globalCounter = a),
      updateStorage(this);
  }
  function loadValues() {
    const a = checkboxValues.globalCounter || 0;
    (counter.innerText = `${a}/${checkboxesLength}`),
      Object.keys(checkboxValues).forEach((a) => {
        "globalCounter" !== a &&
          (document.getElementById(a).checked = checkboxValues[a]);
      }),
      countChecked();
  }

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

  var icon = document.getElementById("dark-mode-icon");
  var darkModeToggle = document.querySelector(".dark-mode-toggle");
  darkModeToggle.classList.toggle("dark");
}

import React, { useState } from "react";

function Checkbox() {
  const [checked, setChecked] = useState(false);

  function handleChange(event) {
    setChecked(event.target.checked);
  }

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange}
    />
  );
}

export default Checkbox;

(function () {
  "use strict";

  var cards = Array.prototype.slice.call(document.querySelectorAll("[data-publication]"));
  if (!cards.length) return;

  var searchInput = document.getElementById("publication-search");
  var yearSelect = document.getElementById("publication-year");
  var topicSelect = document.getElementById("publication-topic");
  var typeSelect = document.getElementById("publication-type");
  var resetButton = document.getElementById("publication-reset");
  var status = document.getElementById("publication-results-status");
  var emptyState = document.getElementById("publication-empty-state");
  var yearSections = Array.prototype.slice.call(document.querySelectorAll("[data-publication-year]"));

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-copy-bibtex]");
    if (!button) return;

    var card = button.closest("[data-publication]");
    var source = card.querySelector("[data-bibtex-source]");
    var copyStatus = card.querySelector(".publication-card__copy-status");
    var bibtex = source.content.textContent.trim();

    function showCopied() {
      copyStatus.textContent = "Copied";
      window.setTimeout(function () { copyStatus.textContent = ""; }, 2000);
    }

    function fallbackCopy() {
      var fallback = document.createElement("textarea");
      fallback.value = bibtex;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      fallback.remove();
      showCopied();
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(bibtex).then(showCopied).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
  });

  // Project detail pages reuse publication cards without archive filters.
  if (!searchInput || !yearSelect || !topicSelect || !typeSelect ||
      !resetButton || !status || !emptyState) return;

  function normalize(value) {
    return (value || "").toLowerCase().trim();
  }

  function applyFilters() {
    var query = normalize(searchInput.value);
    var year = yearSelect.value;
    var topic = topicSelect.value;
    var type = typeSelect.value;
    var visibleCount = 0;

    cards.forEach(function (card) {
      var categories = (card.dataset.categories || "").split("|");
      var matches = (!query || card.dataset.search.indexOf(query) !== -1) &&
        (!year || card.dataset.year === year) &&
        (!topic || categories.indexOf(topic) !== -1) &&
        (!type || card.dataset.type === type);

      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    yearSections.forEach(function (section) {
      section.hidden = !section.querySelector("[data-publication]:not([hidden])");
    });

    status.textContent = visibleCount + (visibleCount === 1 ? " publication" : " publications");
    emptyState.hidden = visibleCount !== 0;
  }

  [searchInput, yearSelect, topicSelect, typeSelect].forEach(function (control) {
    control.addEventListener(control === searchInput ? "input" : "change", applyFilters);
  });

  resetButton.addEventListener("click", function () {
    searchInput.value = "";
    yearSelect.value = "";
    topicSelect.value = "";
    typeSelect.value = "";
    applyFilters();
    searchInput.focus();
  });

  applyFilters();
}());

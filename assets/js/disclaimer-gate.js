/*
  Disclaimer gate (Jekyll + GitHub Pages compatible)
  - Redirects first-time visitors to /disclaimer/
  - Stores acceptance in localStorage so it persists across sessions
  - Avoids redirect loops and handles back/refresh gracefully
*/

(function () {
  "use strict";

  var script = document.currentScript;
  var baseurl = (script && script.dataset && script.dataset.baseurl) ? script.dataset.baseurl : "";
  var disclaimerPath = (script && script.dataset && script.dataset.disclaimerPath) ? script.dataset.disclaimerPath : "/disclaimer/";
  var storageKey = (script && script.dataset && script.dataset.storageKey) ? script.dataset.storageKey : "reedDisclaimerAccepted";

  if (baseurl === "/") baseurl = "";
  if (baseurl && baseurl[0] !== "/") baseurl = "/" + baseurl;

  var disclaimerUrlPath = baseurl + disclaimerPath; // e.g. /reed/disclaimer/

  if (!document || !document.location) return;

  var path = window.location.pathname || "/";
  var isDisclaimerPage = path === disclaimerUrlPath || path === disclaimerUrlPath.replace(/\/$/, "");

  // Let the disclaimer page itself decide what to do
  if (isDisclaimerPage) return;

  // Optional exclusions
  var lower = path.toLowerCase();
  if (lower.indexOf("/assets/") === 0) return;
  if (lower.indexOf(baseurl + "/assets/") === 0) return;
  if (lower.indexOf(baseurl + "/admin") === 0) return;

  var accepted = false;
  try {
    accepted = window.localStorage.getItem(storageKey) === "true";
  } catch (e) {
    accepted = false;
  }

  if (accepted) return;

  var returnTo = (window.location.pathname || "/") +
                 (window.location.search || "") +
                 (window.location.hash || "");

  var target = disclaimerUrlPath + "?return=" + encodeURIComponent(returnTo);
  window.location.replace(target);
})();


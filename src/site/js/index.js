document.querySelectorAll('code[class="html"]').forEach(function(element) {
  element.innerHTML = element.innerHTML.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
});
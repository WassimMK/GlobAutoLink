const privacyBtn = document.getElementById("show-privacy");
const termsBtn = document.getElementById("show-terms");
const privacySection = document.getElementById("privacy-section");
const termsSection = document.getElementById("terms-section");

privacyBtn.onclick = () => {
  privacyBtn.classList.add("active");
  termsBtn.classList.remove("active");
  privacySection.classList.add("active");
  termsSection.classList.remove("active");
};

termsBtn.onclick = () => {
  termsBtn.classList.add("active");
  privacyBtn.classList.remove("active");
  termsSection.classList.add("active");
  privacySection.classList.remove("active");
};

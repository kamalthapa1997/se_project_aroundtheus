function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKeyDown);
}
function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKeyDown);
}
const handleEscKeyDown = function (e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
};
export { openPopup, closePopup, handleEscKeyDown };

const bigGroup = document.querySelector(".product__big-group");
export function changeSliderPhoto(target) {
  if (target.tagName === "VIDEO") {
    bigGroup.innerHTML = `<video class="product__big-img" src="${target.src}" controls></video>`;
  } else {
    bigGroup.innerHTML = `<img class="product__big-img" src="${target.src}" loading="lazy">`;
  }
}
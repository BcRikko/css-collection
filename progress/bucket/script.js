const bucket = document.querySelector(".bucket");

const createObject = () => {
  const object = document.createElement("div");
  object.classList.add("object");
  bucket.appendChild(object);
};

const reset = () => {
  bucket.classList.remove("complete");
  Array.from(bucket.children).forEach(child => {
    if (child.tagName === "H1") {
      return;
    }
    bucket.removeChild(child);
  });
};

const wait = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

document.querySelector(".start").addEventListener("click", async () => {
  reset();

  // 1ブロック 4%分
  for (let i = 0; i < 25; i++) {
    await wait(200);
    createObject();
  }

  await wait(1000);
  reset();
  bucket.classList.add("complete");
});

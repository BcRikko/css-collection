const wait = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

async function progress() {
  const line = document.querySelector(".line");
  const deg = 180 / 100;

  for (let i = 1; i <= 100; i++) {
    await wait(100);
    line.style.transform = `rotate(${deg * i}deg)`;
  }
}

document.querySelector(".start").addEventListener('click', progress);

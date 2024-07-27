(async function () {
  console.log("A");

  setTimeout(() => {
    console.log("B");
  }, 50);

  await new Promise((resolve) => {
    console.log("C");
    resolve("D");
  }).then((res) => {
    console.log(res);
  });

  console.log("E");

  setTimeout(() => {
    console.log("F");
  }, 0);

  await new Promise((resolve) => setTimeout(resolve, 100));

  console.log("G");
})();

// A C D E B G

document.getElementById("submitBtn").addEventListener("click", () => {
  const APIURL =
    "https://o4rwyunpdauw6b6z7dadnth42e0gtlfo.lambda-url.ap-northeast-2.on.aws/recommend-nickname";

  const form = document.getElementById("nicknameForm");

  const type = form.querySelector('input[name="type"]:checked').value;
  const searchKeyword = form.querySelector("#searchKeyword").value;

  const postData = {
    type,
    searchKeyword,
  };

  document.getElementById("submitBtn").classList.add("loading");

  fetch(APIURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application / json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((data) => {
      const { result } = data;
      const message = document.createElement("p");
      message.textContent = result;
      document.getElementById("nicknameResult").innerHTML = "";
      document.getElementById("nicknameResult").appendChild(message);
      document.getElementById("submitBtn").classList.remove("loading");
    })
    .catch((error) => {
      console.error("오류 발생:", error);
    });
});

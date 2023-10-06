fetch("json/alerts.json")
  .then((response) => response.json())
  .then((data) => {
    const alertsDiv = document.querySelector(".alerts");

    data.forEach((alert) => {
      const alertElement = document.createElement("div");
      alertElement.classList.add("alert");
      alertElement.innerText = alert.message;
      alertElement.style.background = alert.background;
      alertElement.style.color = alert.color;

      alertsDiv.appendChild(alertElement);
    });
  })
  .catch((error) => {
    console.error(
      "There was an error fetching or processing the alerts:",
      error
    );
  });

export const getDraggableElements = limit => {
  let elements = [];
  for (let i = 1; i <= 8; i++) {
    let element = $(`#drag${i}`);
    if (i <= limit) elements.push(element);
    else element.css("display", "none");
  }

  return elements;
}

export const hideMainScreen = () => {
  $("#mainFace").css({
    transform: "scale(0)",
    "border-radius": "50%"
  });
} 

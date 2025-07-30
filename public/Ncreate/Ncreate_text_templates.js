
const templates = {
  sample0: {
    name: { top: "10%", left: "40%", fontSize: "2vw" },
    date: { top: "30%", left: "10%", fontSize: "2vw" },
    time: { top: "30%", left: "85%", fontSize: "2vw" },
    information: { top: "50%", left: "10%", fontSize: "2vw" },
    add: { top: "70%" , left: "10%" , fontSize: "2vw"},
    telephone: { top: "85%" , left: "10%" , fontSize: "2vw"},
    email: { top: "85%" , left: "60%" , fontSize: "2vw"}
  },
  sample1: {
    name: { top: "5%", left: "10%", fontSize: "4vw" },
    date: { top: "30%", left: "60%", fontSize: "3vw" },
    time: { top: "45%", left: "80%", fosntSize: "3vw" },
    information: { top: "50%", left: "30%", fontSize: "2vw" },
    add: { top: "80%" , left: "10%" , fontSize: "2vw"},
    telephone: { top: "90%" , left: "65%" , fontSize: "1vw"},
    email: { top: "90%" , left: "80%" , fontSize: "1vw"}
  },
  sample2: {
    name: { top: "15%", left: "40%", fontSize: "4vw" },
    date: { top: "5%", left: "5%", fontSize: "2vw" },
    time: { top: "15%", left: "5%", fontSize: "2vw" },
    information: { top: "50%", left: "30%", fontSize: "3vw" },
    add: { top: "70%" , left: "60%" , fontSize: "3vw"},
    telephone: { top: "90%" , left: "10%" , fontSize: "2vw"},
    email: { top: "90%" , left: "60%" , fontSize: "2vw"}
  },
  sample3: {
    name: { top: "10%", left: "20%", fontSize: "4vw" },
    date: { top: "30%", left: "40%", fontSize: "1vw" },
    time: { top: "30%", left: "50%", fontSize: "1vw" },
    information: { top: "50%", left: "10%", fontSize: "3vw" },
    add: { top: "70%" , left: "10%" , fontSize: "2vw"},
    telephone: { top: "90%" , left: "30%" , fontSize: "2vw"},
    email: { top: "90%" , left: "60%" , fontSize: "2vw"}
  },
  sample4: {
    name: { top: "20%", left: "60%", fontSize: "3vw" },
    date: { top: "10%", left: "20%", fontSize: "4vw" },
    time: { top: "20%", left: "35%", fontSize: "4vw" },
    information: { top: "50%", left: "5%", fontSize: "3vw" },
    add: { top: "70%" , left: "5%" , fontSize: "1vw"},
    telephone: { top: "85%" , left: "5%" , fontSize: "1vw"},
    email: { top: "90%" , left: "5%" , fontSize: "1vw"}
  },
  sample5: {
    name: { top: "20%", left: "50%", fontSize: "3vw" },
    date: { top: "10%", left: "20%", fontSize: "2vw" },
    time: { top: "10%", left: "40%", fontSize: "2vw" },
    information: { top: "50%", left: "5%", fontSize: "4vw" },
    add: { top: "40%" , left: "60%" , fontSize: "1vw"},
    telephone: { top: "85%" , left: "65%" , fontSize: "2vw"},
    email: { top: "90%" , left: "65%" , fontSize: "2vw"}
  },
  sample6: {
    name: { top: "20%", left: "40%", fontSize: "3vw" },
    date: { top: "5%", left: "5%", fontSize: "1vw" },
    time: { top: "10%", left: "5%", fontSize: "1vw" },
    information: { top: "50%", left: "20%", fontSize: "2vw" },
    add: { top: "60%" , left: "20%" , fontSize: "2vw"},
    telephone: { top: "5%" , left: "60%" , fontSize: "1vw"},
    email: { top: "5%" , left: "80%" , fontSize: "1vw"}
  },
  sample7: {
    name: { top: "20%", left: "60%", fontSize: "2vw" },
    date: { top: "10%", left: "10%", fontSize: "4vw" },
    time: { top: "30%", left: "10%", fontSize: "4vw" },
    information: { top: "50%", left: "60%", fontSize: "2vw" },
    add: { top: "70%" , left: "60%" , fontSize: "1vw"},
    telephone: { top: "80%" , left: "5%" , fontSize: "2vw"},
    email: { top: "90%" , left: "5%" , fontSize: "2vw"}
  },
  sample8: {
    name: { top: "20%", left: "20%", fontSize: "2vw" },
    date: { top: "5%", left: "70%", fontSize: "3vw" },
    time: { top: "20%", left: "70%", fontSize: "3vw" },
    information: { top: "50%", left: "10%", fontSize: "2vw" },
    add: { top: "70%" , left: "10%" , fontSize: "1vw"},
    telephone: { top: "90%" , left: "40%" , fontSize: "2vw"},
    email: { top: "90%" , left: "65%" , fontSize: "2vw"}
  },
  sample9: {
    name: { top: "20%", left: "10%", fontSize: "2vw" },
    date: { top: "15%", left: "75%", fontSize: "1vw" },
    time: { top: "15%", left: "85%", fontSize: "1vw" },
    information: { top: "50%", left: "10%", fontSize: "3vw" },
    add: { top: "5%" , left: "75%" , fontSize: "2vw"},
    telephone: { top: "20%" , left: "75%" , fontSize: "1vw"},
    email: { top: "25%" , left: "75%" , fontSize: "1vw"}
  },
  sample10: {
    name: { top: "5%", left: "5%", fontSize: "1vw" },
    date: { top: "10%", left: "30%", fontSize: "4vw" },
    time: { top: "30%", left: "30%", fontSize: "4vw" },
    information: { top: "50%", left: "20%", fontSize: "4vw" },
    add: { top: "80%" , left: "70%" , fontSize: "1vw"},
    telephone: { top: "85%" , left: "5%" , fontSize: "1vw"},
    email: { top: "90%" , left: "5%" , fontSize: "1vw"}
  },
  sample11: {
    name: { top: "5%", left: "80%", fontSize: "1vw" },
    date: { top: "25%", left: "5%", fontSize: "3vw" },
    time: { top: "25%", left: "35%", fontSize: "3vw" },
    information: { top: "50%", left: "30%", fontSize: "3vw" },
    add: { top: "25%" , left: "650%" , fontSize: "3vw"},
    telephone: { top: "85%" , left: "40%" , fontSize: "1vw"},
    email: { top: "95%" , left: "40%" , fontSize: "1vw"}
  },
  sample12: {
    name: { top: "5%", left: "10%", fontSize: "1vw" },
    date: { top: "85%", left: "10%", fontSize: "2vw" },
    time: { top: "85%", left: "35%", fontSize: "2vw" },
    information: { top: "15%", left: "10%", fontSize: "4vw" },
    add: { top: "40%" , left: "10%" , fontSize: "4vw"},
    telephone: { top: "65%" , left: "10%" , fontSize: "2vw"},
    email: { top: "75%" , left: "10%" , fontSize: "2vw"}
  }
};
function applyTemplate(templateName) {
  const template = templates[templateName];
  if (!template) return;

  Object.keys(template).forEach(key => {
    const element = document.getElementById(`preview-${key}`);
    const layout = template[key];
    if (element) {
      element.style.top = layout.top;
      element.style.left = layout.left;
      element.style.fontSize = layout.fontSize;
      element.style.position = "absolute";
      element.style.transform = "translate(0, 0)";
    }
  });

  // ✅ 텍스트 다시 드래그 가능하게
  addDragToTexts();
}
export { applyTemplate }; 

const colorSelectorEL = document.getElementById("seedColorSelect");
const colorPanelEl = document.querySelector(".colorSchemeGeneratedpanel").children;
let colorArr = []
let seedColorVal = "000000"
let mode = "monochrome"
const darkModeBtn = document.getElementById("darkMode")

let isDark = false

darkModeBtn.addEventListener("click", () => {
  if (!isDark) {
    isDark = true
    document.querySelector(".selectColorHeader").style.backgroundColor = "#161C26"
    let footer = document.querySelectorAll(".footer")
    document.body.style.backgroundColor = "#121212"
    document.getElementsByTagName("H1")[0].style.color = "#dcdcdc"
    darkModeBtn.style.color = "#fff"
    for (let i = 0; i < footer.length; i++) {
      footer[i].style.backgroundColor = "#161C26"
      footer[i].style.color = "#ffffff"
    }
  } else {
    isDark = false
    document.querySelector(".selectColorHeader").style.backgroundColor = "#fff"
    const footer = document.querySelectorAll(".footer")
    document.body.style.backgroundColor = "#dcdcdc"
    document.getElementsByTagName("H1")[0].style.color = "#000"
    darkModeBtn.style.color = "#000"
    for (let i = 0; i < footer.length; i++) {
      footer[i].style.backgroundColor = "#fff"
      footer[i].style.color = "#000000"
    }
  }
})

// Copies hex value to the clipboard
document.addEventListener("click", async (e) => {
  if (
    e.target.tagName.toLowerCase() === "div" &&
    e.target.classList.contains("schemeGenerated")
  ) {
    let copyText = e.target.querySelector("span").textContent
    try {
      await navigator.clipboard.writeText(copyText)
      displayToast()
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }
})

// Renders new color scheme when a color is changed
colorSelectorEL.addEventListener("change", () => {
  seedColorVal = colorSelectorEL.value.substring(1)
  genColorArr(seedColorVal, mode)
})

// Renders new color scheme when mode is changed
document.getElementById("modeChoice").addEventListener("change", () => {
  mode = document.getElementById("modeChoice").value
  genColorArr(seedColorVal, mode)
})

// Fetches the response from the API
function genColorArr(seedColorInput = "000000", mode = "monochrome") {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedColorInput}&mode=${mode}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      return (colorArr = data.colors.map((color) => {
        return color.hex.value
      }))
    })
    .then((cArr) => {
      renderColorScheme(cArr)
    })
}

// Renders colorScheme
function renderColorScheme(cArr) {
  for (let i = 0; i < colorPanelEl.length; i++) {
    const curEl = colorPanelEl[i].id
    let curElSpan = document.getElementsByClassName(curEl)[0]
    document.getElementById(curEl).style.backgroundColor = cArr[i]
    curElSpan.textContent = cArr[i]
  }
}

// Generates a toast Notification
function displayToast() {
  let toast = document.createElement("div")
  toast.classList.add("toast")
  toast.innerHTML = `<i class="fa-solid fa-square-check"></i>Copied to Clipboard`
  document.getElementById("toastBox").appendChild(toast)
  setTimeout(() => {
    toast.remove()
  }, 3000)
}

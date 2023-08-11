import {get, set} from "idb-keyval"

const doc = window.top.document

const html = `
    <button aria-label="Toggle side panel" class="toggle-panel">
      <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(180deg);"><path d="M2 3h6M2 8h12m0 0l-2.5-2.5M14 8l-2.5 2.5M2 13h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-dark"></path></svg>
    </button>
`

if (!doc.querySelector(".toggle-panel")) {
  const anchor = doc.querySelector(".testing-preferences-toggle").parentElement
  const span = doc.createElement("span")
  span.innerHTML = html
  anchor.parentElement.insertBefore(span, anchor)
  span.querySelector(".toggle-panel").addEventListener("click", togglePanel)
}

if (!doc.querySelector(".sidebar-toggle-panel")) {
  const nav = doc.querySelector("#sidebar nav")
  const button = doc.createElement("button")
  button.innerHTML = `
    <div class="flex justify-center my-4">
      <svg class="icon-dark-gray-500" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(180deg);">
        <path d="M2 3h6M2 8h12m0 0l-2.5-2.5M14 8l-2.5 2.5M2 13h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-dark" transform="scale(1.5)"></path>
      </svg>
    </div>
  `
  button.classList.add("sidebar-toggle-panel")
  button.setAttribute("aria-label", "Toggle panel")
  button.setAttribute("title", "Toggle panel")
  button.addEventListener("click", togglePanel)
  nav.parentElement.insertBefore(button, nav)
}

async function togglePanel() {
  const toggle = await get("toggle-panel-plugin")
  await set("toggle-panel-plugin", !toggle)
  await updateState()
}

async function updateState() {
  const toggle = await get("toggle-panel-plugin")
  const panel = doc.querySelector("[data-cy=reporter-panel]")
  if (toggle) {
    panel.style.display = "none"
    doc.querySelector(".sidebar-toggle-panel svg").style.transform = "rotate(0deg)"
  } else {
    panel.style.display = "block"
    doc.querySelector(".sidebar-toggle-panel svg").style.transform = "rotate(180deg)"
  }
}

updateState()
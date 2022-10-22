const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', event => {
  event.preventDefault()

  hidePopups()

  if (event.code.toLowerCase() === 'space') {
    changeColors()
    const intro = document.querySelector('.intro')

    intro.style.display = 'none'
  }
})

document.addEventListener('click', event => {
  const type = event.target.dataset.type

  hidePopups()

  if (type === 'lock') {
    const node = 
      event.target.tagName.toLowerCase() === 'i'
      ? event.target
      : event.target.children[0]

      node.classList.toggle('fa-lock-open')
      node.classList.toggle('fa-lock')
  } else if (type === 'copy') {
      copyToClipboard(event.target.textContent)
      const popup = event.target.nextElementSibling
      popup.classList.add("showPopup")
  }
})

function hidePopups() {
  const popups = document.querySelectorAll('[id="popup"]')

  popups.forEach(pop => {
    pop.classList.remove('showPopup')
  })
}

function generateRandomColor() {
  const hex = '0123456789ABCDEF'
  const hexPower = hex.length

  let color = ''
  for (let i = 0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * hexPower)]
  }

  return '#' + color
}

function setRightColor(title, color) {
  const luminance = chroma(color).luminance()

  title.style.color = luminance > 0.5 ? 'black' : 'white'
}

function copyToClipboard(text) {
  return navigator.clipboard.writeText(text)
}

function changeColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : []
  cols.forEach((col, index) => {
    const title = col.querySelector('h1')
    const lock = col.querySelector('button')

    const isLocked = col.querySelector('i').classList.contains('fa-lock')

    if (isLocked) {
      colors.push(title.textContent)
      return
    }

    const color = 
    isInitial 
    ? colors[index]
      ? colors[index]
      : generateRandomColor()
    : generateRandomColor()

    if (!isInitial) {
      colors.push(color)
    }

    col.style.background = color
    title.innerText = color

    setRightColor(title, color)
    setRightColor(lock, color)
  })

  setColorsHash(colors)
}

function setColorsHash(colors = []) {
  document.location.hash = colors.map(color => color.substring(1)).join('-')
}

function getColorsFromHash() {
  const hash = document.location.hash
  if (hash.length > 1) {
    return hash.substring(1).split('-').map(col => '#' + col)
  }
  
  return []
}

changeColors(true)
// Sections stack like slides: each one holds its place while the next slides over it. A section
// taller than the screen scrolls to its end first, so it sticks at a negative offset.
(() => {
  const slides = [...document.querySelectorAll('.slide')]
  const header = document.querySelector('.top')
  const place = () => {
    const top = header.offsetHeight
    for (const slide of slides) {
      slide.style.setProperty('--stick', `${Math.min(top, innerHeight - slide.offsetHeight)}px`)
    }
  }
  place()
  addEventListener('resize', place)
  const observer = new ResizeObserver(place)
  slides.forEach((slide) => observer.observe(slide))
})()

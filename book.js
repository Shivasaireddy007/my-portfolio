// The book tilts a little toward the pointer, and lifts its top page when the pointer is near.
(() => {
  const scene = document.getElementById('book-scene')
  const book = document.getElementById('book')
  if (!scene || !book || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const section = scene.closest('section')
  section.addEventListener('pointermove', (event) => {
    const box = scene.getBoundingClientRect()
    const x = (event.clientX - (box.left + box.width / 2)) / box.width
    const y = (event.clientY - (box.top + box.height / 2)) / box.height
    book.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`)
    book.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`)
    scene.classList.toggle('is-near', Math.abs(x) < 0.75 && Math.abs(y) < 0.75)
  })
  section.addEventListener('pointerleave', () => {
    book.style.setProperty('--ry', '0deg')
    book.style.setProperty('--rx', '0deg')
    scene.classList.remove('is-near')
  })
  // On touch screens, lift the page once the book scrolls into view.
  new IntersectionObserver(([entry]) => {
    if (matchMedia('(hover: none)').matches) scene.classList.toggle('is-near', entry.isIntersecting)
  }, { threshold: 0.6 }).observe(scene)
})()

// Sections slide in from the left as they come into view, like entrance animations on slides.
// Without JavaScript, or with reduced motion, everything is simply visible.
(() => {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const groups = [
    '.proof-grid > div',
    '.section-head',
    '.about-body > p',
    '.job',
    '.case',
    '.bg-item',
    '.contact-row > *',
  ]
  const items = []
  for (const selector of groups) {
    document.querySelectorAll(selector).forEach((el) => {
      // siblings in the same group follow one another
      const index = [...el.parentElement.children].filter((c) => c.matches(selector)).indexOf(el)
      el.style.setProperty('--delay', `${Math.min(index, 4) * 110}ms`)
      el.classList.add('reveal')
      items.push(el)
    })
  }
  document.documentElement.classList.add('reveal-ready')

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('is-in')
      observer.unobserve(entry.target)
    }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 })
  items.forEach((el) => observer.observe(el))
})()

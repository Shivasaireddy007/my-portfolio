// "Hi, I'm" in a few languages, one after another. Screen readers get a plain "Hi".
(() => {
  const el = document.getElementById('greet')
  if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const greetings = ['Hi', 'Hola', 'Bonjour', 'నమస్కారం', 'नमस्ते', 'Ciao', 'Hallo', 'Olá', 'こんにちは', 'Hello']
  let i = 0
  setInterval(() => {
    if (document.hidden) return
    el.classList.add('is-out')
    setTimeout(() => {
      i = (i + 1) % greetings.length
      el.textContent = greetings[i]
      el.classList.remove('is-out')
    }, 260)
  }, 2200)
})()

// The hero receipt, checked line by line. Two receipts alternate: one that proves itself and is
// approved, and one whose total was misread (38.90 as 3890-style) and goes to a person.
// The page loads in its finished state; this only animates when motion is welcome.
(() => {
  const receipt = document.getElementById('receipt')
  if (!receipt || matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const lines = [...receipt.querySelectorAll('li[data-check]')]
  const chips = lines.map((li) => li.querySelector('.chip'))
  const totalChip = document.getElementById('total-chip')
  const stamp = document.getElementById('stamp')
  const title = document.getElementById('stamp-title')
  const note = document.getElementById('stamp-note')

  const RUNS = [
    { total: ['ok', '✓ adds up'], stamp: ['ok', 'Approved', 'every value checked · no person needed'] },
    { total: ['flag', '✗ read as 4123: not on the page'], stamp: ['flag', 'To a person', 'total failed its checks'] },
  ]
  const wait = (ms) => new Promise((done) => setTimeout(done, ms))
  let visible = true
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }).observe(receipt)

  async function play(run) {
    totalChip.className = `chip ${run.total[0]}`
    totalChip.textContent = run.total[1]
    chips.forEach((chip) => chip.classList.add('is-hidden'))
    stamp.classList.add('is-hidden')
    await wait(500)
    for (const [i, line] of lines.entries()) {
      line.classList.add('is-reading')
      await wait(420)
      line.classList.remove('is-reading')
      chips[i].classList.remove('is-hidden')
      await wait(160)
    }
    stamp.className = `stamp ${run.stamp[0]}`
    title.textContent = run.stamp[1]
    note.textContent = run.stamp[2]
    await wait(3600)
  }

  ;(async () => {
    await wait(900)
    for (let i = 0; ; i = (i + 1) % RUNS.length) {
      while (!visible || document.hidden) await wait(500)
      await play(RUNS[i])
    }
  })()
})()

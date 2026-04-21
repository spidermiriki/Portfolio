let ctx: AudioContext | null = null
function getCtx() {
  if (!ctx) ctx = new AudioContext()
  return ctx
}

export function playHover() {
  const ac = getCtx()
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.connect(gain)
  gain.connect(ac.destination)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(900, ac.currentTime)
  osc.frequency.exponentialRampToValueAtTime(700, ac.currentTime + 0.07)
  gain.gain.setValueAtTime(0.08, ac.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.09)
  osc.start()
  osc.stop(ac.currentTime + 0.09)
}

export function playClick() {
  const ac = getCtx()
  // low thud
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.connect(gain)
  gain.connect(ac.destination)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(320, ac.currentTime)
  osc.frequency.exponentialRampToValueAtTime(160, ac.currentTime + 0.12)
  gain.gain.setValueAtTime(0.25, ac.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.18)
  osc.start()
  osc.stop(ac.currentTime + 0.18)

  // petit overtone aigu par dessus
  const osc2 = ac.createOscillator()
  const gain2 = ac.createGain()
  osc2.connect(gain2)
  gain2.connect(ac.destination)
  osc2.type = 'sine'
  osc2.frequency.setValueAtTime(1100, ac.currentTime)
  gain2.gain.setValueAtTime(0.06, ac.currentTime)
  gain2.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.06)
  osc2.start()
  osc2.stop(ac.currentTime + 0.06)
}

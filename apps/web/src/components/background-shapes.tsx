import seedrandom from 'seedrandom'
import './background-shapes.css'

export type Range = [number, number]

export type Distribution =
  | 'full'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'

export function BackgroundShapes() {
  let distribution: Distribution = 'full'
  let opacity = 0.4
  let seed = new Date().getMonth()

  let overflow = 0.3
  let disturb = 0.3
  let disturbChance = 0.3

  function distributionToLimits(distribution: Distribution) {
    const min = -0.2
    const max = 1.2
    let x: Range = [min, max]
    let y: Range = [min, max]

    function intersection(a: Range, b: Range): Range {
      return [Math.max(a[0], b[0]), Math.min(a[1], b[1])]
    }

    const limits = distribution.split('-')

    for (const limit of limits) {
      switch (limit) {
        case 'top':
          y = intersection(y, [min, 0.6])
          break
        case 'bottom':
          y = intersection(y, [0.4, max])
          break
        case 'left':
          x = intersection(x, [min, 0.6])
          break
        case 'right':
          x = intersection(x, [0.4, max])
          break
        case 'xcenter':
          x = intersection(x, [0.25, 0.75])
          break
        case 'ycenter':
          y = intersection(y, [0.25, 0.75])
          break
        case 'center':
          x = intersection(x, [0.25, 0.75])
          y = intersection(y, [0.25, 0.75])
          break
        case 'full':
          x = intersection(x, [0, 1])
          y = intersection(y, [0, 1])
          break
        default:
          break
      }
    }

    return { x, y }
  }

  function usePloy(number = 16) {
    function getPoints(): Range[] {
      const limits = distributionToLimits(distribution)
      const rng = seedrandom(`${seed}`)
      function randomBetween([a, b]: Range) {
        return rng() * (b - a) + a
      }
      function applyOverflow(random: number, overflow: number) {
        random = random * (1 + overflow * 2) - overflow
        return rng() < disturbChance ? random + (rng() - 0.5) * disturb : random
      }
      return Array.from({ length: number })
        .fill(0)
        .map(() => [
          applyOverflow(randomBetween(limits.x), overflow),
          applyOverflow(randomBetween(limits.y), overflow),
        ])
    }

    let points = getPoints()

    return points.map(([x, y]) => `${x * 100}% ${y * 100}%`).join(', ')
  }

  const poly1 = usePloy(14)
  const poly2 = usePloy(9)
  const poly3 = usePloy(3)

  return (
    <div
      className="bg-shapes-bg pointer-events-none transform-gpu overflow-hidden"
      style={{ filter: `blur(7vw)` }}
      aria-hidden="true"
    >
      <div
        className="bg-shapes-clip bg-gradient-to-r from-[#FC5920] to-white/10"
        style={{ clipPath: `polygon(${poly1})`, opacity }}
      />
      <div
        className="bg-shapes-clip bg-gradient-to-t from-[#0066C2] to-white/10"
        style={{ clipPath: `polygon(${poly2})`, opacity }}
      />
      <div
        className="bg-shapes-clip bg-gradient-to-t from-[#ef4444] to-white/10"
        style={{ clipPath: `polygon(${poly3})`, opacity: 0.2 }}
      />
    </div>
  )
}

import type { ObjectDirective } from 'vue'

/**
 * @reference https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline
 */
declare const ScrollTimeline: any

function shouldAnimationBeStopped(animation: CSSAnimation, animationName: string | null = null) {
  if (!ScrollTimeline || !(animation.timeline instanceof ScrollTimeline))
    return false

  if (animationName === null) {
    return true
  }

  return animation.animationName === animationName
}

function onAnimationEnd(e: AnimationEvent) {
  if (e.elapsedTime === 0)
    return

  const animations = (e.target! as HTMLElement).getAnimations() as CSSAnimation[]
  const animation = animations.find(a => a.animationName === e.animationName)
  if (!animation)
    return

  if (shouldAnimationBeStopped(animation, 'animate-enter')) {
    const fill = animation.effect?.getComputedTiming().fill
    if (fill && !['forwards', 'both'].includes(fill) && import.meta.env.DEV) {
      console.warn(`The fillMode for the animation “animate-enter” is not set to \`forwards\`. This can cause a glitch when removing the animation.`)
    }

    // Commit the styles and remove the animation
    animation.commitStyles()
    animation.cancel()
  }
}

export const vAnimationOnce: ObjectDirective<HTMLElement> = {
  created(el) {
    el.addEventListener('animationend', (e) => {
      onAnimationEnd(e)
      el.removeEventListener('animationend', onAnimationEnd)
    })
  },
  unmounted(el) {
    el.removeEventListener('animationend', onAnimationEnd)
  },
}

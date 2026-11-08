export function trapDialogFocus(event) {
  if (event.key !== 'Tab') return
  const dialog = event.currentTarget
  const controls = Array.from(dialog.querySelectorAll('a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')).filter(element => element.getClientRects().length)
  const first = controls[0]
  const last = controls[controls.length - 1]
  if (!first) return
  if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

let model = []

let root    // the #menu container
let button  // the corner button
let panel   // the dropdown

let opened = false
let expanded = null // name of the currently expanded group

function isSelected(item) {
    if (!item.selected) return false
    return !!item.selected()
}

function makeSpan(className, text) {
    const span = document.createElement('span')
    span.className = className
    span.textContent = text
    return span
}

function renderItem(item, className) {
    const el = document.createElement('div')
    el.className = className

    if (item.selected) {
        el.appendChild( makeSpan('menu-mark', isSelected(item)? '•' : '') )
    }
    el.appendChild( makeSpan('menu-name', item.name) )
    if (item.key) el.appendChild( makeSpan('menu-key', item.key) )

    el.onclick = function() {
        if (!item.keepOpen) hide()
        if (item.action) item.action()
    }
    return el
}

function renderGroup(group) {
    const isExpanded = (expanded === group.name)

    const head = document.createElement('div')
    head.className = 'menu-item menu-group'
    head.appendChild( makeSpan('menu-name', group.name) )
    head.appendChild( makeSpan('menu-key', isExpanded? '▾' : '▸') )
    head.onclick = function() {
        expanded = isExpanded? null : group.name
        render()
    }
    panel.appendChild(head)

    if (isExpanded) {
        group.items.forEach(item => {
            panel.appendChild( renderItem(item, 'menu-item menu-sub') )
        })
    }
}

function render() {
    if (!panel) return
    panel.innerHTML = ''

    model.forEach(entry => {
        if (entry.separator) {
            const sep = document.createElement('div')
            sep.className = 'menu-separator'
            panel.appendChild(sep)

        } else if (entry.items) {
            renderGroup(entry)

        } else {
            panel.appendChild( renderItem(entry, 'menu-item') )
        }
    })
}

export function show() {
    if (!root) return
    opened = true
    root.classList.add('opened')
    render()
}

export function hide() {
    if (!root) return
    opened = false
    expanded = null
    root.classList.remove('opened')
}

export function toggle() {
    if (opened) hide()
    else show()
}

export function isOpened() {
    return opened
}

// re-render the selection marks in case the state was changed elsewhere
export function refresh() {
    if (opened) render()
}

export function build(spec) {
    model = spec || []
    root = document.getElementById('menu')
    if (!root) return

    button = document.createElement('div')
    button.className = 'menu-button'
    button.textContent = '≡'
    button.onclick = toggle
    root.appendChild(button)

    panel = document.createElement('div')
    panel.className = 'menu-panel'
    root.appendChild(panel)

    // never take the focus away from the editor,
    // so the caret and the selection stay where they are
    root.onmousedown = function(e) {
        e.preventDefault()
    }

    document.addEventListener('mousedown', function(e) {
        if (opened && !root.contains(e.target)) hide()
    })
}

export default {
    build,
    show,
    hide,
    toggle,
    isOpened,
    refresh,
}

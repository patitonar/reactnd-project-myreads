export const NONE_VALUE = 'none'

export const NONE_DISABLED = 'noneDisabled'

export const shelves = [
  {
    id: 'currentlyReading',
    name: 'Currently Reading'
  },
  {
    id: 'wantToRead',
    name: 'Want to Read'
  },
  {
    id: 'read',
    name: 'Read'
  }
]

export const bookOptions = [
  {
    id: NONE_DISABLED,
    name: 'Move to...'
  },
  ...shelves,
  {
    id: NONE_VALUE,
    name: 'None'
  }
]


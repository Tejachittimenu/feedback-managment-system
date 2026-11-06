export const STORAGE_KEY = 'feedback-studio-v1'
export const SESSION_KEY = 'feedback-studio-session'
export const INITIAL_DATA = {
  users: [{ id: 'admin', name: 'Administrator', username: 'admin', email: 'admin@feedback.local', password: 'Admin123!', role: 'admin' }],
  feedback: [],
}

export function loadData(storage = globalThis.localStorage) {
  try { return { ...INITIAL_DATA, ...JSON.parse(storage?.getItem(STORAGE_KEY) || '{}') } }
  catch { return { ...INITIAL_DATA, users: [...INITIAL_DATA.users], feedback: [] } }
}

export function filterFeedback(items, users, search = '', status = 'All statuses') {
  const term = search.toLowerCase()
  return items.filter(item => {
    const customer = users.find(person => person.id === item.userId)
    const matchesText = !term || [item.subject, item.message, item.category, customer?.name, customer?.email].some(value => value?.toLowerCase().includes(term))
    return matchesText && (status === 'All statuses' || item.status === status)
  })
}

export function averageRating(items) {
  return items.length ? (items.reduce((sum, item) => sum + item.rating, 0) / items.length).toFixed(1) : '—'
}

export function toCSV(feedback, users, date = value => new Date(value).toLocaleDateString()) {
  const rows = [['Customer', 'Email', 'Subject', 'Category', 'Rating', 'Status', 'Feedback', 'Admin reply', 'Date'], ...feedback.map(item => {
    const person = users.find(user => user.id === item.userId)
    return [person?.name, person?.email, item.subject, item.category, item.rating, item.status, item.message, item.reply, date(item.createdAt)]
  })]
  return rows.map(row => row.map(value => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',')).join('\r\n')
}

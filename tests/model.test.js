import test from 'node:test'
import assert from 'node:assert/strict'
import { averageRating, filterFeedback, INITIAL_DATA, loadData, STORAGE_KEY, toCSV } from '../src/model.js'

const users = [{ id: 'u1', name: 'Alex Rivera', email: 'alex@example.com' }]
const items = [
  { id: 'f1', userId: 'u1', subject: 'Checkout issue', category: 'Website', rating: 2, message: 'Checkout failed', status: 'In review', reply: '', createdAt: '2026-01-01' },
  { id: 'f2', userId: 'u1', subject: 'Great service', category: 'Service', rating: 5, message: 'Very helpful', status: 'Resolved', reply: 'Thanks!', createdAt: '2026-01-02' },
]

test('default data includes the documented admin demo account', () => {
  assert.equal(INITIAL_DATA.users[0].username, 'admin')
  assert.equal(INITIAL_DATA.users[0].password, 'Admin123!')
  assert.equal(INITIAL_DATA.users[0].role, 'admin')
})

test('data loader recovers from malformed Local Storage', () => {
  const result = loadData({ getItem: () => '{bad json' })
  assert.equal(result.users[0].username, 'admin')
  assert.deepEqual(result.feedback, [])
  assert.equal(STORAGE_KEY, 'feedback-studio-v1')
})

test('feedback search checks customer and content and filters by status', () => {
  assert.deepEqual(filterFeedback(items, users, 'alex', 'All statuses').map(x => x.id), ['f1', 'f2'])
  assert.deepEqual(filterFeedback(items, users, 'checkout', 'In review').map(x => x.id), ['f1'])
  assert.deepEqual(filterFeedback(items, users, 'checkout', 'Resolved'), [])
})

test('rating average and CSV escaping cover report values', () => {
  assert.equal(averageRating(items), '3.5')
  assert.equal(averageRating([]), '—')
  const csv = toCSV([{ ...items[0], subject: 'Issue, "urgent"' }], users, () => 'Jan 1')
  assert.match(csv, /"Issue, ""urgent"""/)
  assert.match(csv, /"Alex Rivera"/)
})

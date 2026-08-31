import assert from 'node:assert/strict'
import { diagnoseClass, canConfirm } from '../src/classHealth.js'

const students = [
  { id: '1', sprint: 2.2, jump: 30, hop: 1.8, bfi: 8, asymmetry: 20, potential: 60 },
  { id: '2', sprint: 1.8, jump: 42, hop: 2.4, bfi: 2, asymmetry: 2, potential: 82 },
  { id: '3', sprint: 1.9, jump: 40, hop: 2.3, bfi: 3, asymmetry: 4, potential: 74 },
  { id: '4', sprint: 1.9, jump: 41, hop: 2.3, bfi: 3, asymmetry: 4, potential: 70 },
]
const complete = diagnoseClass(students, '完整测试')
assert.equal(complete.coverage, 100)
assert.equal(complete.issues.find((item) => item.id === 'flexibility').status, '数据不足')
assert.equal(complete.groups.find((item) => item.id === '1').risk, '重点干预')
assert.equal(canConfirm(complete.coverage), true)
assert.equal(canConfirm(diagnoseClass(students, '阶段复测').coverage), false)
console.log('class-health demo passed')

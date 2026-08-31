const severity = (rate) => rate >= 30 ? '重点干预' : rate >= 20 ? '关注' : rate >= 10 ? '轻度' : '正常'

const average = (items, key) => items.reduce((sum, item) => sum + item[key], 0) / items.length

export function diagnoseClass(students, batch) {
  const batchRate = batch === '阶段复测' ? 0.75 : batch === '试运行采样' ? 0.55 : 1
  const validStudents = students.slice(0, Math.ceil(students.length * batchRate))
  const coverage = students.length ? Math.round(validStudents.length / students.length * 100) : 0
  if (!validStudents.length) return { coverage, validStudents, issues: [], groups: [] }

  const sprintAverage = average(validStudents, 'sprint')
  const jumpAverage = average(validStudents, 'jump')
  const hopAverage = average(validStudents, 'hop')
  const rules = [
    { id: 'speed', label: '速度能力不足', project: '30m 短跑 / 启动加速', affected: (item) => item.sprint > sprintAverage * 1.04 },
    { id: 'explosive', label: '下肢刚性或爆发力不足', project: '纵跳 / 立定跳远 / 落地稳定', affected: (item) => item.jump < jumpAverage * 0.95 || item.hop < hopAverage * 0.95 },
    { id: 'flexibility', label: '柔韧性不足', project: '坐位体前屈', unavailable: true },
    { id: 'stability', label: '协调性或稳定性不足', project: '左右不对称 / 落地控制', affected: (item) => item.asymmetry >= 10 },
    { id: 'fatigue', label: '疲劳或风险偏高', project: 'BFI 疲劳度', affected: (item) => item.bfi >= 5 },
  ]
  const issues = rules.map((rule) => {
    if (rule.unavailable) return { ...rule, status: '数据不足', count: 0, rate: null, affectedIds: [] }
    const affected = validStudents.filter(rule.affected)
    const rate = Math.round(affected.length / validStudents.length * 100)
    return { ...rule, status: severity(rate), count: affected.length, rate, affectedIds: affected.map((item) => item.id) }
  })
  const groups = validStudents.map((student) => ({
    ...student,
    ability: student.potential >= 76 ? '优势组' : student.potential >= 68 ? '提升组' : '基础组',
    risk: student.bfi >= 7 || student.asymmetry >= 18 ? '重点干预' : student.bfi >= 5 || student.asymmetry >= 10 ? '关注' : '正常',
  }))
  return { coverage, validStudents, issues, groups }
}

export function canConfirm(coverage) {
  return coverage >= 80
}

export function coverageMessage(coverage) {
  return coverage < 60 ? '数据不足，不能生成正式方案' : coverage < 80 ? '覆盖率不足，仅允许预览' : '数据完整，可确认并发布'
}

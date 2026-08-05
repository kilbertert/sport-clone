export const schools = [
  '全部学校',
  '广州市天河区体育东路小学',
  '测试学校',
  '东莞湾区中学',
  '观澜中学',
]

const names = [
  ['100023040', '赵亚鑫', '男', '测试学校', '测试员', '1班'],
  ['100023015', '段岚予', '男', '测试学校', '高一', '1班'],
  ['100023016', '文福智', '男', '测试学校', '高一', '1班'],
  ['100023017', '张书豪', '男', '测试学校', '高一', '1班'],
  ['100023018', '郑锋杰', '男', '测试学校', '高一', '1班'],
  ['100023019', '余峻文', '男', '测试学校', '高一', '1班'],
  ['100023020', '周俊', '男', '测试学校', '高一', '1班'],
  ['100023021', '陈嘉成', '男', '测试学校', '高一', '1班'],
  ['100023022', '沈涛玮', '男', '测试学校', '高一', '1班'],
  ['100023023', '詹松树', '男', '测试学校', '高一', '1班'],
  ['100023024', '陈浩瀚', '男', '测试学校', '高一', '1班'],
  ['100023025', '邹旭', '男', '测试学校', '高一', '1班'],
  ['100023026', '刘梦', '女', '测试学校', '高一', '1班'],
  ['100023027', '谭依柔', '女', '测试学校', '高一', '1班'],
  ['100023028', '吴栅栅', '女', '测试学校', '高一', '1班'],
  ['100023029', '曾志鹏', '男', '测试学校', '高一', '1班'],
  ['100023030', '杨佳晔', '男', '测试学校', '高一', '1班'],
  ['4426', '刘珠平', '女', '广州市天河区体育东路小学', '四年级', '四4班'],
  ['4428', '马浩轩', '男', '广州市天河区体育东路小学', '四年级', '四4班'],
  ['4419', '廖元捷', '女', '广州市天河区体育东路小学', '四年级', '四4班'],
  ['4407', '杜金霖', '女', '广州市天河区体育东路小学', '四年级', '四4班'],
  ['4441', '黄嘉栩', '男', '广州市天河区体育东路小学', '四年级', '四4班'],
  ['4442', '崔宸淏', '男', '广州市天河区体育东路小学', '四年级', '四4班'],
  ['4431', '石寓梵', '男', '广州市天河区体育东路小学', '四年级', '四4班'],
  ['151620250545', '余源', '男', '东莞湾区中学', '七年级', '705'],
  ['151620250802', '陈俊宇', '男', '东莞湾区中学', '七年级', '708'],
  ['S2001', '陈俊豪', '男', '观澜中学', '高一', '1班'],
  ['S2007', '刘雨桐', '女', '观澜中学', '高一', '1班'],
  ['S2009', '孙诗涵', '女', '观澜中学', '高二', '3班'],
  ['S2019', '韩佳颖', '女', '观澜中学', '高二', '3班'],
]

export const students = names.map((item, index) => ({
  id: item[0],
  name: item[1],
  sex: item[2],
  school: item[3],
  grade: item[4],
  className: item[5],
  projects: index % 5 === 0 ? ['30m短跑', '立定跳远'] : ['30m短跑', '纵跳', '立定跳远'],
  latestTest: index < 17 ? `2026-06-18 15:${String(48 - (index % 17)).padStart(2, '0')}:2${index % 10}` : `2026-06-23 17:03:${String(59 - (index % 13)).padStart(2, '0')}`,
  sprint: Number((1.66 + (index % 13) * 0.08).toFixed(2)),
  jump: Number((48.16 - (index % 11) * 1.08).toFixed(2)),
  hop: Number((2.54 - (index % 9) * 0.06).toFixed(2)),
  potential: Number((82 - (index % 14) * 1.15).toFixed(1)),
  bfi: (index % 8) + 1,
  asymmetry: Number(((index * 3.7) % 28).toFixed(1)),
  face: index % 7 === 0,
}))

export const dashboardStudents = [
  students.find((item) => item.id === '4426'),
  students.find((item) => item.id === '4428'),
  students.find((item) => item.id === '4419'),
  students.find((item) => item.id === '4407'),
  students.find((item) => item.id === '4441'),
  students.find((item) => item.id === '4442'),
  students.find((item) => item.id === '4431'),
  students.find((item) => item.id === '100023017'),
  students.find((item) => item.id === '100023016'),
  students.find((item) => item.id === 'S2001'),
].filter(Boolean)

export const projectStats = [
  { name: '30m短跑', value: 313, color: '#f97316' },
  { name: '纵跳', value: 227, color: '#2563eb' },
  { name: '立定跳远', value: 302, color: '#10b981' },
]

export const schoolStats = [
  { name: '体育东路小学', value: 402, color: '#5470c6' },
  { name: '测试学校', value: 40, color: '#91cc75' },
  { name: '东莞湾区中学', value: 33, color: '#fac858' },
  { name: '观澜中学', value: 33, color: '#ee6666' },
  { name: '示例小学', value: 1, color: '#73c0de' },
]

export const sprintRank = [...students]
  .sort((a, b) => a.sprint - b.sprint)
  .slice(0, 10)
export const jumpRank = [...students]
  .sort((a, b) => b.jump - a.jump)
  .slice(0, 10)
export const hopRank = [...students]
  .sort((a, b) => b.hop - a.hop)
  .slice(0, 10)
export const potentialRank = [...students]
  .sort((a, b) => b.potential - a.potential)
  .slice(0, 10)

export const fatigueRisk = [
  { id: '12341234', name: '-', sex: '', grade: '-', className: '-', bfi: 10 },
  { id: '100023034', name: '曹语嫣', sex: '女', grade: '高一', className: '2班', bfi: 8 },
  { id: '100023023', name: '詹松树', sex: '男', grade: '高一', className: '1班', bfi: 8 },
  { id: '2024530110', name: '-', sex: '', grade: '-', className: '-', bfi: 7 },
  { id: '2024530852', name: '-', sex: '', grade: '-', className: '-', bfi: 7 },
  { id: '100023039', name: '梁光', sex: '男', grade: '高二', className: '1班', bfi: 7 },
  { id: '100023037', name: '张婉琳', sex: '女', grade: '高一', className: '2班', bfi: 7 },
  { id: '100023029', name: '曾志鹏', sex: '男', grade: '高一', className: '1班', bfi: 7 },
]

export const asymmetryRisk = [
  { id: '4215', name: '吴心瑶', sex: '女', grade: '四年级', className: '四2班', rate: 52.5, weak: '左腿' },
  { id: '4318', name: '朱汛', sex: '女', grade: '四年级', className: '四3班', rate: 49.5, weak: '左腿' },
  { id: '100023033', name: '罗威', sex: '男', grade: '高一', className: '1班', rate: 46.2, weak: '右腿' },
  { id: '4328', name: '吴樱筱', sex: '女', grade: '四年级', className: '四3班', rate: 43.7, weak: '左腿' },
  { id: '4319', name: '朱茗依', sex: '女', grade: '四年级', className: '四3班', rate: 43.4, weak: '右腿' },
  { id: '4108', name: '明卉苒', sex: '女', grade: '四年级', className: '四1班', rate: 42, weak: '右腿' },
  { id: '4112', name: '孔艺涵', sex: '女', grade: '四年级', className: '四1班', rate: 40.6, weak: '左腿' },
  { id: '4307', name: '宫悦鸣', sex: '女', grade: '四年级', className: '四3班', rate: 38.3, weak: '右腿' },
]

export const initialPlans = [
  { id: 'TP-260724-01', student: '吴心瑶', focus: '左右侧力量均衡', cycle: '4 周', sessions: 12, progress: 42, status: '进行中', risk: '高风险', next: '07-25 16:30' },
  { id: 'TP-260723-04', student: '詹松树', focus: '疲劳恢复与落地缓冲', cycle: '3 周', sessions: 9, progress: 67, status: '进行中', risk: '重度疲劳', next: '07-26 17:00' },
  { id: 'TP-260721-02', student: '张书豪', focus: '启动加速与快速伸缩', cycle: '6 周', sessions: 18, progress: 28, status: '进行中', risk: '中风险', next: '07-25 15:00' },
  { id: 'TP-260715-03', student: '刘雨桐', focus: '下肢爆发力提升', cycle: '4 周', sessions: 12, progress: 100, status: '已完成', risk: '低风险', next: '-' },
]

export const initialSchedules = [
  { id: 'SC-0725-A', title: '高一年级基础体能复测', school: '测试学校', date: '2026-07-25', time: '08:30', venue: '田径场 A 区', students: 86, projects: '30m短跑 / 纵跳', progress: 0, status: '待开始' },
  { id: 'SC-0726-B', title: '四年级爆发力抽测', school: '广州市天河区体育东路小学', date: '2026-07-26', time: '14:00', venue: '综合馆', students: 120, projects: '纵跳 / 立定跳远', progress: 0, status: '待开始' },
  { id: 'SC-0724-C', title: '区域人才筛选专项测试', school: '东莞湾区中学', date: '2026-07-24', time: '15:30', venue: '田径场 B 区', students: 33, projects: '30m短跑 / 纵跳 / 立定跳远', progress: 64, status: '进行中' },
  { id: 'SC-0722-D', title: '高二年级阶段复测', school: '观澜中学', date: '2026-07-22', time: '09:00', venue: '体育馆', students: 68, projects: '纵跳 / 立定跳远', progress: 100, status: '已完成' },
]

export const studentTrend = [
  { label: '第 1 次', sprint: 2.18, jump: 31.4, hop: 1.82 },
  { label: '第 2 次', sprint: 2.08, jump: 33.2, hop: 1.91 },
  { label: '第 3 次', sprint: 1.98, jump: 35.8, hop: 2.04 },
  { label: '第 4 次', sprint: 1.87, jump: 38.28, hop: 2.54 },
]

export const captureDevices = [
  { id: 'IR-30M-A01', name: '30m 红外计时终端 A', venue: '田径场 A 区', project: '30m短跑', status: '在线', battery: 92, signal: 96 },
  { id: 'IR-JP-B02', name: '纵跳采集终端 B', venue: '综合馆 1 区', project: '纵跳', status: '在线', battery: 78, signal: 91 },
  { id: 'IR-LJ-B03', name: '立定跳远终端 C', venue: '综合馆 2 区', project: '立定跳远', status: '在线', battery: 85, signal: 88 },
  { id: 'IR-30M-A04', name: '30m 红外计时终端 D', venue: '田径场 B 区', project: '30m短跑', status: '维护中', battery: 34, signal: 0 },
]

export const captureLanes = [
  { lane: 1, student: '张书豪', id: '100023017', project: '30m短跑', result: '1.87s', state: '已完成' },
  { lane: 2, student: '文福智', id: '100023016', project: '30m短跑', result: '计时中', state: '采集中' },
  { lane: 3, student: '吴栅栅', id: '100023028', project: '30m短跑', result: '等待', state: '待测试' },
  { lane: 4, student: '段岚予', id: '100023015', project: '30m短跑', result: '等待', state: '待测试' },
]

export const teachingGroups = [
  {
    id: 'fast',
    name: '突破提升组',
    level: '快',
    color: 'green',
    count: 14,
    focus: '起跑反应与最高速度保持',
    prescription: '30m 加速跑 5组 × 2次，组间歇 3分钟',
    target: '30m 成绩提升 3%-5%',
  },
  {
    id: 'middle',
    name: '能力发展组',
    level: '中',
    color: 'blue',
    count: 18,
    focus: '加速技术与快速伸缩能力',
    prescription: '低栏连续跳 4组 + 20m 加速跑 4组',
    target: '稳定动作节奏，提升加速效率',
  },
  {
    id: 'basic',
    name: '基础巩固组',
    level: '弱',
    color: 'orange',
    count: 12,
    focus: '基础跑姿、协调与力量启蒙',
    prescription: '原地摆臂 + 小步跑 + 10m 渐进跑',
    target: '建立动作信心，完成标准跑姿',
  },
]

export const lessonTimeline = [
  { phase: '课堂导入', duration: 3, detail: '目标说明、分组站位与安全提示', intensity: '低' },
  { phase: '动态热身', duration: 8, detail: '关节激活、A-Skip、渐进跑', intensity: '中' },
  { phase: '分层主训练', duration: 24, detail: '三梯队同步执行差异化动作清单', intensity: '高' },
  { phase: '整理放松', duration: 5, detail: '低强度慢跑、下肢拉伸与训练反馈', intensity: '低' },
]

export const recessZones = [
  { zone: 'A 区', group: '突破提升组', students: 142, activity: '30m 加速跑 + 接力挑战', equipment: '标志桶 12 / 接力棒 8', color: '#2563eb' },
  { zone: 'B 区', group: '能力发展组', students: 168, activity: '折返跑 + 低栏连续跳', equipment: '敏捷梯 6 / 低栏 24', color: '#10b981' },
  { zone: 'C 区', group: '基础巩固组', students: 99, activity: '节奏跑 + 协调闯关', equipment: '标志碟 40 / 跳绳 50', color: '#f97316' },
]

export const recessTimeline = [
  { minute: '0-4', title: '集合与节奏热身', bpm: 118, activity: '队列调动、动态关节活动' },
  { minute: '4-9', title: '跑姿激活', bpm: 124, activity: '摆臂、小步跑、高抬腿' },
  { minute: '9-23', title: '分区主训练', bpm: 132, activity: '加速、折返、爆发力循环' },
  { minute: '23-27', title: '全校挑战', bpm: 138, activity: '班级积分接力挑战' },
  { minute: '27-30', title: '整理放松', bpm: 105, activity: '呼吸调整与下肢拉伸' },
]

export const researchTrend = [
  { period: '2025 秋', pass: 82.4, excellent: 31.8, sprint: 4.92, jump: 31.2 },
  { period: '2026 春初', pass: 86.1, excellent: 36.5, sprint: 4.74, jump: 33.8 },
  { period: '2026 春中', pass: 89.3, excellent: 41.2, sprint: 4.58, jump: 35.7 },
  { period: '2026 春末', pass: 92.6, excellent: 46.8, sprint: 4.41, jump: 37.9 },
]

export const gradeComparison = [
  { grade: '四年级', pass: 94.2, excellent: 49.8, improvement: 8.4 },
  { grade: '七年级', pass: 90.1, excellent: 43.2, improvement: 6.8 },
  { grade: '高一', pass: 91.7, excellent: 45.6, improvement: 7.3 },
  { grade: '高二', pass: 88.9, excellent: 40.3, improvement: 5.9 },
]

export const researchProjects = [
  { id: 'RS-2026-01', title: '分层速度教学对高中生加速能力的干预研究', owner: '李老师', stage: '数据采集中', progress: 62, samples: 126, deadline: '2026-11-30' },
  { id: 'RS-2026-02', title: '智慧体育背景下大课间体能干预模式研究', owner: '王老师', stage: '方案实施', progress: 38, samples: 402, deadline: '2027-03-15' },
  { id: 'RS-2025-08', title: '青少年下肢爆发力与短跑表现相关性研究', owner: '陈老师', stage: '成果整理', progress: 88, samples: 198, deadline: '2026-08-20' },
]

export const homeworkTasks = [
  { id: 'HW-0724-01', title: '周末速度基础练习', target: '高一 1班', students: 40, completed: 31, due: '07-26 20:00', focus: '跑姿与启动', status: '进行中' },
  { id: 'HW-0723-02', title: '弱侧稳定性家庭处方', target: '高风险学生', students: 18, completed: 14, due: '07-27 20:00', focus: '单腿稳定', status: '进行中' },
  { id: 'HW-0718-03', title: '下肢柔韧恢复练习', target: '四年级', students: 198, completed: 184, due: '07-20 20:00', focus: '恢复与拉伸', status: '已结束' },
]

export const parentCheckins = [
  { student: '张书豪', task: '周末速度基础练习', time: '07-24 19:42', duration: 18, parent: '张女士', feeling: '轻松', score: 5 },
  { student: '文福智', task: '周末速度基础练习', time: '07-24 19:18', duration: 21, parent: '文先生', feeling: '适中', score: 4 },
  { student: '吴心瑶', task: '弱侧稳定性家庭处方', time: '07-24 18:56', duration: 16, parent: '吴女士', feeling: '适中', score: 5 },
  { student: '刘雨桐', task: '弱侧稳定性家庭处方', time: '07-24 18:20', duration: 17, parent: '刘先生', feeling: '轻松', score: 4 },
]

export const teamCandidates = [
  { id: '100023017', name: '张书豪', sex: '男', grade: '高一', event: '短跑', potential: 82, sprint: 1.87, risk: '中风险', selected: true },
  { id: '100023003', name: '陈泽炫', sex: '男', grade: '高二', event: '跳跃', potential: 79, sprint: 1.88, risk: '中风险', selected: true },
  { id: '100023016', name: '文福智', sex: '男', grade: '高一', event: '短跑', potential: 77.2, sprint: 1.76, risk: '低风险', selected: true },
  { id: 'S2001', name: '陈俊豪', sex: '男', grade: '高一', event: '跳远', potential: 76.3, sprint: 4.63, risk: '低风险', selected: false },
  { id: 'S2007', name: '刘雨桐', sex: '女', grade: '高一', event: '跳远', potential: 74.9, sprint: 4.88, risk: '低风险', selected: false },
  { id: '151620250545', name: '余源', sex: '男', grade: '七年级', event: '纵跳', potential: 73.4, sprint: 4.21, risk: '中风险', selected: false },
]

export const competitions = [
  { name: '市中学生田径锦标赛', date: '2026-09-18', days: 56, stage: '专项强化期', athletes: 12, status: '备战中' },
  { name: '区校园运动会', date: '2026-10-26', days: 94, stage: '基础储备期', athletes: 18, status: '计划中' },
  { name: '省青少年速度挑战赛', date: '2026-12-12', days: 141, stage: '年度目标赛', athletes: 8, status: '计划中' },
]

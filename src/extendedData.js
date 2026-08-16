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

export const precisionGrades = [
  { grade: '四年级', students: 198, pass: 94, bottleneck: '下肢柔韧与落地稳定', affected: 42, trend: '改善中', color: '#10b981' },
  { grade: '七年级', students: 66, pass: 90, bottleneck: '30m 启动加速', affected: 18, trend: '需关注', color: '#f97316' },
  { grade: '高一', students: 126, pass: 92, bottleneck: '速度耐力与后程保持', affected: 31, trend: '改善中', color: '#2563eb' },
  { grade: '高二', students: 119, pass: 89, bottleneck: '左右腿力量对称', affected: 27, trend: '重点干预', color: '#ef4444' },
]

export const precisionRiskItems = [
  { name: '吴心瑶', grade: '四年级', className: '四2班', risk: '膝踝落地稳定', level: '高', score: 52.5, action: '弱侧稳定 + 低冲击落地' },
  { name: '朱汛', grade: '四年级', className: '四3班', risk: '左右腿不对称', level: '高', score: 49.5, action: '单腿力量 + 动作纠正' },
  { name: '罗威', grade: '高一', className: '1班', risk: '疲劳恢复不足', level: '中', score: 46.2, action: '降低训练量，增加恢复' },
  { name: '詹松树', grade: '高一', className: '1班', risk: '后程速度衰减', level: '中', score: 38.4, action: '速度耐力 + 节奏跑' },
]

export const precisionTalent = [
  { name: '张书豪', school: '测试学校', grade: '高一', event: '100m 短跑', score: 92, basis: '启动加速与最高速度突出' },
  { name: '陈泽炫', school: '测试学校', grade: '高二', event: '立定跳远', score: 89, basis: '下肢爆发与水平位移优秀' },
  { name: '聂子菡', school: '体育东路小学', grade: '四年级', event: '纵跳 / 跳跃', score: 86, basis: '垂直爆发力同龄领先' },
  { name: '陈俊豪', school: '观澜中学', grade: '高一', event: '200m 短跑', score: 84, basis: '速度与节奏保持均衡' },
  { name: '刘雨桐', school: '观澜中学', grade: '高一', event: '网球敏捷', score: 81, basis: '协调性与变向潜力突出' },
]

export const projectFitProfiles = [
  { id: '100023017', name: '张书豪', grade: '高一', event: '100m 短跑', fitScore: 96, current: '30m 1.87s', target: '100m 13.42s', status: '可进入专项', basis: '前 30m 加速与反应速度突出', path: '起跑技术 → 最高速度 → 后程保持' },
  { id: '100023003', name: '陈泽炫', grade: '高二', event: '立定跳远', fitScore: 93, current: '纵跳 48.16cm', target: '立定跳远 2.70m', status: '强化力量', basis: '下肢爆发力与水平位移潜力高', path: '下肢力量 → 髋部发力 → 落地控制' },
  { id: '100023016', name: '文福智', grade: '高一', event: '200m 短跑', fitScore: 88, current: '30m 1.76s', target: '200m 27.80s', status: '重点培养', basis: '速度基础好，节奏保持待提升', path: '速度耐力 → 弯道技术 → 节奏分配' },
  { id: 'S2001', name: '陈俊豪', grade: '高一', event: '200m 短跑', fitScore: 86, current: '30m 4.63s', target: '200m 29.20s', status: '持续观察', basis: '速度与协调均衡，成长空间稳定', path: '跑姿优化 → 步频提升 → 专项耐力' },
  { id: 'S2007', name: '刘雨桐', grade: '高一', event: '网球敏捷', fitScore: 84, current: '变向稳定性 72', target: '折返测试提升 15%', status: '跨项潜力', basis: '变向协调、反应与空间感突出', path: '启动反应 → 侧向移动 → 击球步法' },
  { id: '151620250545', name: '余源', grade: '七年级', event: '纵跳 / 跳跃', fitScore: 79, current: '纵跳 39.38cm', target: '纵跳 46.00cm', status: '基础提升', basis: '爆发力基础可塑，需先稳固动作', path: '基础力量 → 摆臂协同 → 触地反应' },
]

export const benchmarkTrend = [
  { phase: '当前', athlete: 1.87, benchmark: 1.78, target: 1.72 },
  { phase: '基础期', athlete: 1.84, benchmark: 1.76, target: 1.70 },
  { phase: '专项期', athlete: 1.79, benchmark: 1.73, target: 1.67 },
  { phase: '赛前期', athlete: 1.74, benchmark: 1.70, target: 1.64 },
  { phase: '目标赛', athlete: 1.70, benchmark: 1.67, target: 1.62 },
]

export const researchPapers = [
  {
    id: 'P-2026-01',
    title: '智慧体育背景下学校体质健康干预的精准分层路径研究',
    authors: '李明 · 王珊',
    source: '体育科学',
    year: 2025,
    type: '期刊论文',
    keywords: ['精准干预', '体质健康', '分层教学'],
    abstract: '研究基于连续体测与课堂观察数据，构建“筛查—分层—干预—复测”的学校体质健康闭环，验证分层训练对速度耐力和下肢爆发力的改善效果。',
    insight: '将风险筛查与课堂分层绑定，比单次排名更适合持续改善。',
    citation: '李明, 王珊. 智慧体育背景下学校体质健康干预的精准分层路径研究[J]. 体育科学, 2025.',
  },
  {
    id: 'P-2025-18',
    title: '青少年短跑加速能力与下肢力量对称性的相关性分析',
    authors: '陈立 · 赵宁 · 周晨',
    source: '中国体育科技',
    year: 2024,
    type: '期刊论文',
    keywords: ['短跑', '力量对称', '运动风险'],
    abstract: '通过 30m 加速跑、单腿力量与落地稳定性指标，分析青少年短跑表现和下肢对称性之间的关系，为训练负荷调整提供量化依据。',
    insight: '对称性指标适合作为训练处方中的安全阈值，而不是单独的成绩排名。',
    citation: '陈立, 赵宁, 周晨. 青少年短跑加速能力与下肢力量对称性的相关性分析[J]. 中国体育科技, 2024.',
  },
  {
    id: 'P-2025-07',
    title: 'AI 辅助体育教学评价的证据链设计与应用',
    authors: '周怡 · 刘畅',
    source: '电化教育研究',
    year: 2025,
    type: '会议论文',
    keywords: ['AI 教学', '证据链', '学习评价'],
    abstract: '提出面向体育课堂的多模态评价证据链，将测试记录、教师观察和学生反馈统一到可追踪的教学决策中。',
    insight: 'AI 生成结论必须能回溯到原始测试、观察和干预记录。',
    citation: '周怡, 刘畅. AI 辅助体育教学评价的证据链设计与应用[C]. 电化教育研究, 2025.',
  },
  {
    id: 'P-2024-22',
    title: '学校大课间速度训练对学生执行功能的影响',
    authors: '孙悦 · 黄子涵',
    source: '北京体育大学学报',
    year: 2024,
    type: '期刊论文',
    keywords: ['大课间', '速度训练', '执行功能'],
    abstract: '比较节奏化速度训练与常规大课间活动对学生反应抑制、任务切换和课堂参与度的影响。',
    insight: '短时、节奏稳定、分区明确的训练更容易在学校场景中持续执行。',
    citation: '孙悦, 黄子涵. 学校大课间速度训练对学生执行功能的影响[J]. 北京体育大学学报, 2024.',
  },
  {
    id: 'P-2023-11',
    title: '青少年运动损伤风险筛查工具的学校场景适用性研究',
    authors: '高峰 · 郑雪',
    source: '上海体育学院学报',
    year: 2023,
    type: '学位论文',
    keywords: ['运动损伤', '风险筛查', '学校体育'],
    abstract: '评估不对称率、疲劳恢复与动作稳定性在学校运动损伤预警中的可操作性和解释边界。',
    insight: '风险分级应伴随明确的复核动作和转介规则，避免只展示一个分数。',
    citation: '高峰, 郑雪. 青少年运动损伤风险筛查工具的学校场景适用性研究[D]. 上海体育学院, 2023.',
  },
  {
    id: 'P-2022-09',
    title: '基于成长档案的学校体育家校协同干预机制',
    authors: '何青 · 赵宇',
    source: '教育发展研究',
    year: 2022,
    type: '期刊论文',
    keywords: ['成长档案', '家校协同', '运动处方'],
    abstract: '研究将校内诊断、家庭运动作业和家长反馈连成连续档案，分析数据回传对学生训练完成率的影响。',
    insight: '家庭端只需接收少量可执行动作，教师端保留完整诊断证据。',
    citation: '何青, 赵宇. 基于成长档案的学校体育家校协同干预机制[J]. 教育发展研究, 2022.',
  },
]

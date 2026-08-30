import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  Activity,
  Award,
  BarChart3,
  BookOpenCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleStop,
  ClipboardCheck,
  Clock3,
  Download,
  Dumbbell,
  FileBarChart,
  FileDown,
  Flag,
  FileText,
  Gauge,
  GraduationCap,
  HeartHandshake,
  LayoutGrid,
  Medal,
  MonitorSmartphone,
  Music,
  Pause,
  Play,
  Plus,
  Radio,
  RefreshCw,
  Search,
  Send,
  Signal,
  ShieldCheck,
  Sparkles,
  SquareActivity,
  Star,
  Trophy,
  Target,
  UploadCloud,
  Users,
  Video,
  Wifi,
  X,
  Zap,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { students } from './data'
import { canConfirm, coverageMessage, diagnoseClass } from './classHealth'
import {
  captureDevices,
  captureLanes,
  competitions,
  gradeComparison,
  homeworkTasks,
  lessonTimeline,
  parentCheckins,
  recessTimeline,
  recessZones,
  researchProjects,
  researchPapers,
  researchTrend,
  benchmarkTrend,
  precisionGrades,
  precisionRiskItems,
  precisionTalent,
  projectFitProfiles,
  teachingGroups,
  teamCandidates,
  writingToolProfiles,
} from './extendedData'

function loadArray(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return Array.isArray(value) ? value : fallback
  } catch {
    return fallback
  }
}

function PageHeader({ title, subtitle, actions }) {
  return <div className="page-header"><div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>{actions && <div className="page-actions">{actions}</div>}</div>
}

function Button({ children, icon: Icon, variant = 'default', className = '', ...props }) {
  return <button className={`button button-${variant} ${className}`} {...props}>{Icon && <Icon size={16} />}{children}</button>
}

function Tag({ children, color = 'blue' }) {
  return <span className={`tag tag-${color}`}>{children}</span>
}

function Select({ value, onChange, children, className = '' }) {
  return <select className={`select ${className}`} value={value} onChange={(event) => onChange(event.target.value)}>{children}</select>
}

function StatStrip({ items }) {
  return <div className="stat-strip">{items.map((item) => <div className="stat-cell" key={item.label}><span>{item.label}</span><strong style={{ color: item.color }}>{item.value}<small>{item.unit}</small></strong>{item.hint && <em>{item.hint}</em>}</div>)}</div>
}

function Progress({ value }) {
  return <div className="progress-wrap"><div className="progress-track"><span style={{ width: `${value}%` }} /></div><b>{value}%</b></div>
}

function Modal({ title, onClose, children, footer, wide = false }) {
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className={`modal ${wide ? 'modal-wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}><header><h2>{title}</h2><button className="icon-button" onClick={onClose} title="关闭"><X size={18} /></button></header><div className="modal-body">{children}</div>{footer && <footer>{footer}</footer>}</section></div>
}

function downloadText(name, content, type = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = name
  link.click()
  URL.revokeObjectURL(link.href)
}

export function CaptureCenter({ notify }) {
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [lanes, setLanes] = useState(captureLanes)
  const [project, setProject] = useState('30m短跑')

  useEffect(() => {
    if (!running) return undefined
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000)
    return () => window.clearInterval(timer)
  }, [running])

  useEffect(() => {
    if (running && elapsed === 4) {
      setLanes((items) => items.map((item) => item.lane === 2 ? { ...item, result: '1.76s', state: '已完成' } : item.lane === 3 ? { ...item, result: '计时中', state: '采集中' } : item))
      notify('2 号跑道成绩已自动入库')
    }
  }, [elapsed, running, notify])

  function toggleSession() {
    if (running) {
      setRunning(false)
      notify('采集批次已暂停')
    } else {
      setElapsed(0)
      setLanes(captureLanes)
      setRunning(true)
      notify('AI 无感采集已启动')
    }
  }

  return <>
    <PageHeader title="AI 采集中心" subtitle="无穿戴设备接入、测试批次控制与实时数据入库" actions={<><Select value={project} onChange={setProject}><option>30m短跑</option><option>纵跳</option><option>立定跳远</option></Select><Button variant={running ? 'default' : 'primary'} icon={running ? CircleStop : Radio} onClick={toggleSession}>{running ? '暂停采集' : '启动采集'}</Button></>} />
    <StatStrip items={[
      { label: '在线终端', value: 3, unit: '台', color: '#10b981', hint: '4 台已注册' },
      { label: '今日采集', value: 186, unit: '人次', color: '#2563eb' },
      { label: '自动入库率', value: 99.2, unit: '%', color: '#7c3aed' },
      { label: '平均延迟', value: 38, unit: 'ms', color: '#f97316' },
      { label: '待复核数据', value: 3, unit: '条', color: '#ef4444' },
    ]} />
    <div className="capture-layout">
      <section className="panel capture-session">
        <div className="panel-heading"><div><h2>实时采集批次</h2><p>测试学校 · 高一 1班 · {project}</p></div><div className={`live-badge ${running ? 'is-live' : ''}`}><span />{running ? `采集中 ${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')}` : '等待启动'}</div></div>
        <div className="lane-grid">{lanes.map((item) => <article className={`lane-card lane-${item.state}`} key={item.lane}><header><strong>{item.lane}</strong><span>跑道</span><Tag color={item.state === '已完成' ? 'green' : item.state === '采集中' ? 'orange' : 'default'}>{item.state}</Tag></header><div><h3>{item.student}</h3><p>{item.id}</p><b>{item.result}</b></div><footer>{item.state === '采集中' ? <span className="signal-bars"><i /><i /><i /><i /></span> : <SquareActivity size={18} />}<span>{item.project}</span></footer></article>)}</div>
        <div className="capture-stream"><div className="stream-title"><Activity size={17} /><b>数据流</b><span>毫秒级采集与异常校验</span></div>{[
          ['14:52:38.426', '2 号跑道', '10m 分段', '0.82s', '正常'],
          ['14:52:39.145', '2 号跑道', '20m 分段', '1.31s', '正常'],
          ['14:52:39.987', '2 号跑道', '30m 总成绩', '1.76s', '已入库'],
          ['14:52:41.204', '3 号跑道', '起跑触发', '反应 0.21s', '采集中'],
        ].map((row) => <div key={row.join('-')}><span className="mono">{row[0]}</span><b>{row[1]}</b><span>{row[2]}</span><strong>{row[3]}</strong><Tag color={row[4] === '已入库' ? 'green' : row[4] === '采集中' ? 'orange' : 'blue'}>{row[4]}</Tag></div>)}</div>
      </section>
      <aside className="panel device-panel">
        <div className="panel-heading"><h2>采集终端</h2><Button icon={RefreshCw} onClick={() => notify('终端状态已刷新')}>刷新</Button></div>
        <div className="device-list">{captureDevices.map((device) => <article key={device.id}><div className={`device-icon ${device.status === '在线' ? 'online' : ''}`}><Wifi size={19} /></div><div><strong>{device.name}</strong><span>{device.venue} · {device.id}</span><div className="device-metrics"><span><Signal size={13} />{device.signal}%</span><span><Gauge size={13} />{device.battery}%</span></div></div><Tag color={device.status === '在线' ? 'green' : 'orange'}>{device.status}</Tag></article>)}</div>
      </aside>
    </div>
  </>
}

export function PrecisionDashboard({ notify }) {
  const [school, setSchool] = useState('全域学校')
  const [grade, setGrade] = useState('全部年级')
  const [riskFilter, setRiskFilter] = useState('全部风险')
  const hasData = school === '全域学校'
  const visibleRisks = hasData ? precisionRiskItems.filter((item) => (riskFilter === '全部风险' || item.level === riskFilter) && (grade === '全部年级' || item.grade === grade)) : []
  const visibleGrades = hasData ? precisionGrades.filter((item) => grade === '全部年级' || item.grade === grade) : []
  const talentByEvent = precisionTalent.reduce((map, item) => {
    map[item.event] = (map[item.event] || 0) + 1
    return map
  }, {})
  const overview = hasData ? precisionGrades.map((item) => ({ name: item.grade, pass: item.pass, students: item.students })) : []
  const projectPass = hasData ? [{ name: '30m短跑', value: 94 }, { name: '纵跳', value: 88 }, { name: '立定跳远', value: 91 }, { name: '柔韧性', value: 76 }] : []
  const genderData = hasData ? [{ name: '女生', value: 54 }, { name: '男生', value: 46 }] : []

  function exportBrief() {
    const rows = [
      '精准体育系统管理简报',
      `数据范围：${school} / ${grade}`,
      '关键指标：受伤风险 17 人；田径人才储备 28 人；网球队人才储备 19 人',
      '',
      '年级,学生数,达标率,核心卡点,受影响学生,趋势',
      ...precisionGrades.map((item) => [item.grade, item.students, `${item.pass}%`, item.bottleneck, item.affected, item.trend].join(',')),
    ]
    const blob = new Blob([`\ufeff${rows.join('\n')}`], { type: 'text/csv;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = '精准体育系统管理简报.csv'
    link.click()
    URL.revokeObjectURL(link.href)
    notify('精准体育管理简报已导出')
  }

  return <>
    <PageHeader title="精准体育系统" subtitle="一屏尽揽全校精准体质数据，管理决策有支撑" actions={<><Select value={school} onChange={setSchool}><option>全域学校</option><option>测试学校</option><option>体育东路小学</option><option>观澜中学</option></Select><Select value={grade} onChange={setGrade}><option>全部年级</option><option>四年级</option><option>七年级</option><option>高一</option><option>高二</option></Select><Button icon={Download} onClick={exportBrief}>导出管理简报</Button></>} />
    <StatStrip items={[
      { label: '受伤风险人数', value: hasData ? 17 : '--', unit: hasData ? '人' : '', color: '#ef4444', hint: hasData ? '高风险 5 人' : '暂无数据' },
      { label: '田径人才储备', value: hasData ? 28 : '--', unit: hasData ? '人' : '', color: '#2563eb', hint: hasData ? '短跑 / 跳跃专项' : '暂无数据' },
      { label: '网球队人才储备', value: hasData ? 19 : '--', unit: hasData ? '人' : '', color: '#10b981', hint: hasData ? '敏捷与协调专项' : '暂无数据' },
      { label: '核心卡点年级', value: hasData ? 3 : '--', unit: hasData ? '个' : '', color: '#f97316', hint: hasData ? '需要重点干预' : '暂无数据' },
      { label: '数据覆盖率', value: hasData ? 96.4 : '--', unit: hasData ? '%' : '', color: '#7c3aed', hint: hasData ? '本学期已采集' : '暂无数据' },
    ]} />
    <section className="precision-insight panel"><strong>驾驶舱概览</strong><span>优点：覆盖率高、核心指标集中；缺点：高风险学生仍需重点干预。</span><span>当前口径：{school} · {grade}，筛选结果同步更新全部模块。</span></section>
    <div className="precision-top-grid">
      <section className="panel precision-risk-panel"><div className="panel-heading"><div><h2>受伤风险预警</h2><p>基于不对称率、疲劳度与落地稳定性综合评估</p></div><div className="segmented">{['全部风险', '高', '中'].map((item) => <button key={item} className={riskFilter === item ? 'active' : ''} onClick={() => setRiskFilter(item)}>{item}</button>)}</div></div><div className="risk-meter"><div className="risk-meter-ring"><strong>17</strong><span>待干预</span></div><div className="risk-meter-bars"><div><span>左右腿不对称</span><b>9 人</b><i><em style={{ width: '76%', background: '#ef4444' }} /></i></div><div><span>疲劳恢复不足</span><b>5 人</b><i><em style={{ width: '48%', background: '#f97316' }} /></i></div><div><span>落地稳定风险</span><b>3 人</b><i><em style={{ width: '30%', background: '#f59e0b' }} /></i></div></div></div><div className="table-scroll"><table><thead><tr><th>学生</th><th>年级 / 班级</th><th>主要风险</th><th>风险值</th><th>建议动作</th></tr></thead><tbody>{visibleRisks.map((item) => <tr key={item.name}><td><b>{item.name}</b></td><td>{item.grade} · {item.className}</td><td><Tag color={item.level === '高' ? 'red' : 'orange'}>{item.risk}</Tag></td><td className="danger-text"><b>{item.score}%</b></td><td>{item.action}</td></tr>)}</tbody></table></div></section>
      <section className="panel talent-reserve-panel"><div className="panel-heading"><div><h2>专项人才储备</h2><p>从全校体测数据提取可培养人才</p></div><Tag color="purple">47 人</Tag></div><div className="talent-reserve-summary"><div><span>田径队</span><strong>28</strong><small>人 · 59.6%</small></div><div><span>网球队</span><strong>19</strong><small>人 · 40.4%</small></div></div><div className="reserve-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={precisionTalent.slice(0, 5)} layout="vertical" margin={{ top: 0, right: 25, left: 6, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" horizontal={false} /><XAxis type="number" domain={[0, 100]} hide /><YAxis type="category" dataKey="name" width={52} tick={{ fill: '#64748b', fontSize: 10 }} /><Tooltip /><Bar dataKey="score" name="潜力分" fill="#2563eb" radius={[0, 5, 5, 0]} /></BarChart></ResponsiveContainer></div><div className="reserve-event-list">{Object.entries(talentByEvent).map(([event, count]) => <div key={event}><span>{event}</span><b>{count} 人</b></div>)}</div></section>
    </div>
    <div className="precision-cockpit-grid">
      <section className="panel chart-panel"><div className="panel-heading"><div><h2>区域/学校排名</h2><p>优点：重点对象清晰；缺点：校际样本仍需补齐。</p></div></div><div className="rank-list">{(hasData ? [{ name: '测试学校', value: 96.4 }, { name: '体育东路小学', value: 93.1 }, { name: '观澜中学', value: 89.8 }] : []).map((item, index) => <div key={item.name}><b>{String(index + 1).padStart(2, '0')}</b><span>{item.name}</span><strong>{item.value}%</strong></div>)}{!hasData && <div className="empty-state">暂无数据</div>}</div></section>
      <section className="panel chart-panel"><div className="panel-heading"><div><h2>项目达标率</h2><p>优点：项目差异可比较；缺点：柔韧性仍是主要短板。</p></div></div><div className="small-chart">{projectPass.length ? <ResponsiveContainer width="100%" height="100%"><BarChart data={projectPass} layout="vertical"><CartesianGrid strokeDasharray="3 3" horizontal={false} /><XAxis type="number" domain={[0, 100]} /><YAxis dataKey="name" type="category" width={70} tick={{ fontSize: 11 }} /><Tooltip /><Bar dataKey="value" name="达标率" fill="#2563eb" radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer> : <div className="empty-state">暂无数据</div>}</div></section>
      <section className="panel chart-panel"><div className="panel-heading"><div><h2>年级达标趋势</h2><p>优点：年级差异直观；缺点：当前仅展示阶段性结果。</p></div></div><div className="small-chart">{overview.length ? <ResponsiveContainer width="100%" height="100%"><LineChart data={overview}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" /><YAxis domain={[70, 100]} /><Tooltip /><Line dataKey="pass" name="达标率" stroke="#10b981" strokeWidth={3} /></LineChart></ResponsiveContainer> : <div className="empty-state">暂无数据</div>}</div></section>
      <section className="panel chart-panel"><div className="panel-heading"><div><h2>男女生比例</h2><p>优点：群体结构一目了然；缺点：比例不能替代分项目表现。</p></div></div><div className="small-chart">{genderData.length ? <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={genderData} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78} label>{genderData.map((item, index) => <Cell key={item.name} fill={index ? '#2563eb' : '#10b981'} />)}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer> : <div className="empty-state">暂无数据</div>}</div></section>
    </div>
    <div className="precision-bottom-grid">
      <section className="panel grade-bottleneck-panel"><div className="panel-heading"><div><h2>各年级体质核心卡点</h2><p>达标率、短板与影响人数同步呈现</p></div><Tag color="orange">决策重点</Tag></div><div className="table-scroll"><table><thead><tr><th>年级</th><th>样本</th><th>达标率</th><th>核心卡点</th><th>影响人数</th><th>趋势</th><th>动作</th></tr></thead><tbody>{precisionGrades.map((item) => <tr key={item.grade}><td><b>{item.grade}</b></td><td>{item.students} 人</td><td><div className="inline-progress"><span style={{ width: `${item.pass}%`, background: item.color }} /><b>{item.pass}%</b></div></td><td>{item.bottleneck}</td><td className="warning-text"><b>{item.affected} 人</b></td><td><Tag color={item.trend === '重点干预' ? 'red' : item.trend === '需关注' ? 'orange' : 'green'}>{item.trend}</Tag></td><td><button className="link-button" onClick={() => notify(`${item.grade} 已生成专项干预建议`)}>生成建议</button></td></tr>)}</tbody></table></div></section>
      <section className="panel decision-panel"><div className="panel-heading"><div><h2>管理决策提示</h2><p>从数据到动作的优先级建议</p></div><AlertTriangle size={20} className="warning-text" /></div><div className="decision-list"><article><span className="decision-index">01</span><div><strong>先处理高风险学生</strong><p>优先安排 17 名学生进行弱侧稳定、疲劳恢复和落地动作复核。</p></div><Tag color="red">立即</Tag></article><article><span className="decision-index">02</span><div><strong>高二左右腿对称专项</strong><p>建议将高二年级纳入下一轮分层课堂，连续跟踪 4 周。</p></div><Tag color="orange">本周</Tag></article><article><span className="decision-index">03</span><div><strong>扩充网球队选才</strong><p>从敏捷、协调与反应数据中再筛选 6 名跨项潜力学生。</p></div><Tag color="green">规划</Tag></article></div><Button variant="primary" icon={FileBarChart} onClick={() => notify('校级管理驾驶舱报告已生成')}>生成校级报告</Button></section>
    </div>
  </>
}

export function LayeredTeaching({ notify }) {
  const [school, setSchool] = useState('测试学校')
  const [grade, setGrade] = useState('高一')
  const [className, setClassName] = useState('1班')
  const [batch, setBatch] = useState('完整测试')
  const [activeGroup, setActiveGroup] = useState('fast')
  const [duration, setDuration] = useState('40 分钟')
  const [venue, setVenue] = useState('田径场 1/2 场')
  const [equipment, setEquipment] = useState('标志桶、低栏、敏捷梯')
  const [generatedAt, setGeneratedAt] = useState('14:36')
  const [issueLevels, setIssueLevels] = useState({})
  const [groups, setGroups] = useState({})
  const [adjustment, setAdjustment] = useState('')
  const [status, setStatus] = useState('系统生成')
  const [confirmRisk, setConfirmRisk] = useState(null)
  const [riskReason, setRiskReason] = useState('')
  const scope = useMemo(() => students.filter((item) => item.school === school && item.grade === grade && item.className === className), [school, grade, className])
  const diagnosis = useMemo(() => diagnoseClass(scope, batch), [scope, batch])
  const schoolOptions = [...new Set(students.map((item) => item.school))]
  const gradeOptions = [...new Set(students.filter((item) => item.school === school).map((item) => item.grade))]
  const classOptions = [...new Set(students.filter((item) => item.school === school && item.grade === grade).map((item) => item.className))]
  const resolvedGroups = diagnosis.groups.map((item) => ({ ...item, ability: groups[item.id]?.ability || item.ability, risk: groups[item.id]?.risk || item.risk }))
  const active = teachingGroups.find((item) => item.id === activeGroup)
  const groupedStudents = resolvedGroups.filter((item) => ({ fast: '优势组', middle: '提升组', basic: '基础组' }[activeGroup] === item.ability))
  const points = resolvedGroups.slice(0, 8).map((item, index) => ({ ...item, points: 980 - index * 46, streak: 7 - (index % 4) }))

  function chooseSchool(value) {
    const firstGrade = students.find((item) => item.school === value)?.grade || ''
    const firstClass = students.find((item) => item.school === value && item.grade === firstGrade)?.className || ''
    setSchool(value); setGrade(firstGrade); setClassName(firstClass); setGroups({}); setIssueLevels({}); setStatus('系统生成')
  }

  function chooseGrade(value) {
    setGrade(value); setClassName(students.find((item) => item.school === school && item.grade === value)?.className || ''); setGroups({}); setIssueLevels({}); setStatus('系统生成')
  }

  function generate() {
    setGeneratedAt(new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }))
    setStatus('教师调整')
    notify('分层课堂方案已重新生成')
  }

  function updateGroup(student, ability) {
    if (student.risk === '重点干预' && ability === '优势组') {
      setConfirmRisk({ student, ability })
      return
    }
    setGroups({ ...groups, [student.id]: { ...groups[student.id], ability } })
    setStatus('教师调整')
  }

  function confirmRiskChange() {
    if (!riskReason.trim()) return
    setGroups({ ...groups, [confirmRisk.student.id]: { ...groups[confirmRisk.student.id], ability: confirmRisk.ability, riskReason } })
    setStatus('教师调整'); setConfirmRisk(null); setRiskReason('')
    notify('高风险调整已记录原因')
  }

  function confirmDiagnosis() {
    setStatus('教师确认')
    notify('班级诊断已由教师确认')
  }

  function syncDrafts() {
    const draft = { school, grade, className, batch, coverage: diagnosis.coverage, issues: diagnosis.issues, groups: resolvedGroups, status: '已同步', updatedAt: new Date().toISOString() }
    localStorage.setItem('sport-class-health-draft', JSON.stringify(draft))
    setStatus('已同步')
    notify('四类成果草稿已同步至教学、大课间、家校协同和报告区')
  }

  function exportReport() {
    const rows = ['班级体质健康分析报告', `范围,${school} ${grade} ${className}`, `覆盖率,${diagnosis.coverage}%`, '', '问题,影响人数,有效样本,占比,严重程度,影响项目', ...diagnosis.issues.map((item) => [item.label, item.count, diagnosis.validStudents.length, item.rate === null ? '数据不足' : `${item.rate}%`, issueLevels[item.id] || item.status, item.project].join(','))]
    downloadText(`${grade}${className}-班级体质健康报告.csv`, `\ufeff${rows.join('\n')}`, 'text/csv;charset=utf-8')
  }

  function exportPlan() {
    const content = `速度分层课堂方案\n时长：${duration}\n场地：${venue}\n器械：${equipment}\n\n${lessonTimeline.map((item) => `${item.phase} ${item.duration}分钟：${item.detail}`).join('\n')}\n\n${teachingGroups.map((item) => `${item.name}：${item.prescription}`).join('\n')}`
    downloadText('速度分层课堂方案.txt', content)
    notify('课堂方案已导出')
  }

  return <>
    <PageHeader title="分层教学" subtitle="以班级体质问题为依据生成课堂、大课间、家庭作业与分析报告" actions={<><Button icon={Download} onClick={exportReport}>导出 Excel</Button><Button icon={FileText} onClick={() => window.print()}>打印 / 保存 PDF</Button><Button variant="primary" icon={Sparkles} onClick={generate}>生成班级方案</Button></>} />
    <div className="teaching-toolbar panel"><div><label>学校<Select value={school} onChange={chooseSchool}>{schoolOptions.map((item) => <option key={item}>{item}</option>)}</Select></label><label>年级<Select value={grade} onChange={chooseGrade}>{gradeOptions.map((item) => <option key={item}>{item}</option>)}</Select></label><label>班级<Select value={className} onChange={(value) => { setClassName(value); setGroups({}); setIssueLevels({}); setStatus('系统生成') }}>{classOptions.map((item) => <option key={item}>{item}</option>)}</Select></label><label>测试批次<Select value={batch} onChange={setBatch}><option>完整测试</option><option>阶段复测</option><option>试运行采样</option></Select></label><label>课堂时长<Select value={duration} onChange={setDuration}><option>40 分钟</option><option>45 分钟</option><option>60 分钟</option></Select></label><label>场地<Select value={venue} onChange={setVenue}><option>田径场 1/2 场</option><option>综合馆</option><option>室内走廊</option></Select></label></div><span><CheckCircle2 size={16} />{coverageMessage(diagnosis.coverage)}</span></div>
    <StatStrip items={[{ label: '班级学生', value: scope.length, unit: '人', color: '#2563eb' }, { label: '有效样本', value: diagnosis.validStudents.length, unit: '人', color: '#10b981' }, { label: '数据覆盖率', value: diagnosis.coverage, unit: '%', color: diagnosis.coverage >= 80 ? '#10b981' : '#f97316' }, { label: '主要问题', value: diagnosis.issues.filter((item) => item.status === '关注' || item.status === '重点干预').length, unit: '项', color: '#ef4444' }, { label: '方案状态', value: status, unit: '', color: '#7c3aed', hint: '同步不等于发布' }]} />
    <section className="panel class-diagnosis-panel"><div className="panel-heading"><div><h2>班级体质问题诊断</h2><p>问题占比分母为对应项目有效样本；当前为演示判定口径</p></div><Tag color={canConfirm(diagnosis.coverage) ? 'green' : 'orange'}>{canConfirm(diagnosis.coverage) ? '可确认' : '仅预览'}</Tag></div><div className="class-issue-grid">{diagnosis.issues.map((issue) => <article key={issue.id} className={`class-issue issue-${issue.status}`}><header><strong>{issue.label}</strong>{issue.rate === null ? <Tag color="default">数据不足</Tag> : <Select value={issueLevels[issue.id] || issue.status} onChange={(value) => { setIssueLevels({ ...issueLevels, [issue.id]: value }); setStatus('教师调整') }}><option>正常</option><option>轻度</option><option>关注</option><option>重点干预</option></Select>}</header>{issue.rate === null ? <p>该维度数据不足，暂不推断结果。</p> : <><b>{issue.rate}%</b><p>{issue.count} / {diagnosis.validStudents.length} 人 · {issue.project}</p><small>系统判定：{issue.status}</small></>}</article>)}</div></section>
    <section className="panel class-group-panel"><div className="panel-heading"><div><h2>能力分组与风险分层</h2><p>能力用于组织教学，风险用于控制负荷，两者独立展示</p></div><Tag color="purple">教师可调整</Tag></div><div className="table-scroll"><table><thead><tr><th>学生</th><th>能力分组</th><th>风险等级</th><th>30m</th><th>纵跳</th><th>调整备注</th></tr></thead><tbody>{resolvedGroups.map((student) => <tr key={student.id}><td><b>{student.name}</b><small className="cell-note">{student.id}</small></td><td><Select value={student.ability} onChange={(value) => updateGroup(student, value)}><option>优势组</option><option>提升组</option><option>基础组</option></Select></td><td><Tag color={student.risk === '重点干预' ? 'red' : student.risk === '关注' ? 'orange' : 'green'}>{student.risk}</Tag></td><td>{student.sprint}s</td><td>{student.jump}cm</td><td><input className="input compact-input" value={groups[student.id]?.note || ''} onChange={(event) => { setGroups({ ...groups, [student.id]: { ...groups[student.id], note: event.target.value } }); setStatus('教师调整') }} placeholder="教师备注" /></td></tr>)}</tbody></table></div></section>
    <section className="panel class-output-panel"><div className="panel-heading"><div><h2>班级解决方案</h2><p>确认后生成四类草稿；同步后需在目标模块再次发布</p></div><Tag color={status === '已同步' ? 'green' : 'blue'}>{status}</Tag></div><div className="class-output-grid"><article><BookOpenCheck size={20} /><strong>体育课训练计划</strong><span>分组、动作、组数与强度</span></article><article><Music size={20} /><strong>大课间分层计划</strong><span>分区、节奏、场地与流程</span></article><article><HeartHandshake size={20} /><strong>分层家庭作业</strong><span>按能力组生成 3—5 份草稿</span></article><article><FileBarChart size={20} /><strong>班级分析报告</strong><span>问题、方案与复测建议</span></article></div><label className="class-note">教师备注<textarea value={adjustment} onChange={(event) => { setAdjustment(event.target.value); setStatus('教师调整') }} placeholder="补充本班场地、学生状态或执行限制" /></label><div className="class-actions"><Button onClick={confirmDiagnosis} disabled={!canConfirm(diagnosis.coverage)} icon={CheckCircle2}>教师确认</Button><Button variant="primary" onClick={syncDrafts} disabled={status !== '教师确认'} icon={Send}>同步四类草稿</Button></div></section>
    <div className="teaching-group-grid">{teachingGroups.map((group) => <button key={group.id} className={`group-card group-${group.color} ${activeGroup === group.id ? 'active' : ''}`} onClick={() => setActiveGroup(group.id)}><header><span>{group.level}</span><div><h2>{group.name}</h2><p>{group.count} 名学生</p></div><ChevronRight size={18} /></header><strong>{group.focus}</strong><p>{group.prescription}</p><footer><TargetIcon />{group.target}</footer></button>)}</div>
    <div className="teaching-main-grid">
      <section className="panel lesson-panel"><div className="panel-heading"><div><h2>课堂执行单</h2><p>{duration} · {venue}</p></div><Tag color="green">可直接授课</Tag></div><div className="lesson-timeline">{lessonTimeline.map((item, index) => <article key={item.phase}><div><span>{index + 1}</span><i /></div><div><header><strong>{item.phase}</strong><b>{item.duration} 分钟</b></header><p>{item.detail}</p><Tag color={item.intensity === '高' ? 'orange' : item.intensity === '中' ? 'blue' : 'green'}>{item.intensity}强度</Tag></div></article>)}</div><div className="teacher-script"><BookOpenCheck size={20} /><div><strong>标准授课话术</strong><p>“今天按能力梯队完成不同挑战。动作质量优先，完成后记录个人积分，不比较同学间成绩。”</p></div></div></section>
      <section className="panel roster-panel"><div className="panel-heading"><div><h2>{active.name}学生表</h2><p>{active.focus}</p></div><Tag color={active.color}>{active.count} 人</Tag></div><div className="table-scroll"><table><thead><tr><th>学生</th><th>30m</th><th>纵跳</th><th>潜力</th><th>本节负荷</th></tr></thead><tbody>{groupedStudents.map((item, index) => <tr key={item.id}><td><b>{item.name}</b><small className="cell-note">{item.id}</small></td><td>{item.sprint}s</td><td>{item.jump}cm</td><td><b className="metric-blue">{item.potential}</b></td><td><Tag color={index % 3 === 0 ? 'orange' : 'green'}>{index % 3 === 0 ? '80%' : '90%'}</Tag></td></tr>)}</tbody></table></div></section>
    </div>
    <section className="panel points-panel"><div className="panel-heading"><div><h2>课堂积分榜</h2><p>个人进步、动作质量与坚持度综合积分</p></div><Tag color="purple">本周</Tag></div><div className="points-list">{points.map((item, index) => <article key={item.id}><span className={`rank rank-${index + 1}`}>{index + 1}</span><div className="mini-avatar">{item.name.slice(0, 1)}</div><div><strong>{item.name}</strong><small>{item.grade} {item.className}</small></div><b>{item.points}<small> pts</small></b><Tag color={item.streak >= 6 ? 'orange' : 'blue'}>连续 {item.streak} 天</Tag></article>)}</div></section>
    {confirmRisk && <Modal title="高风险学生调整确认" onClose={() => { setConfirmRisk(null); setRiskReason('') }} footer={<><Button onClick={() => { setConfirmRisk(null); setRiskReason('') }}>取消</Button><Button variant="primary" onClick={confirmRiskChange} disabled={!riskReason.trim()}>确认调整</Button></>}><div className="form-stack"><p>{confirmRisk.student.name} 当前为重点干预。调整到优势组前需说明原因。</p><label>调整原因<textarea className="textarea" value={riskReason} onChange={(event) => setRiskReason(event.target.value)} /></label></div></Modal>}
  </>
}

function TargetIcon() {
  return <Zap size={15} />
}

export function RecessProgram({ notify }) {
  const [duration, setDuration] = useState('30 分钟')
  const [field, setField] = useState('标准 400m 操场')
  const [bpm, setBpm] = useState(132)
  const [playing, setPlaying] = useState(false)
  const [activeVideo, setActiveVideo] = useState(null)
  const [enabled, setEnabled] = useState(false)
  const [classDraft] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sport-class-health-draft')) } catch { return null }
  })
  const actions = [
    { name: '30m 渐进加速跑', focus: '起跑、加速、身体前倾', duration: '02:18', icon: Zap },
    { name: '低栏连续跳', focus: '快速触地、踝膝稳定', duration: '01:46', icon: SquareActivity },
    { name: '折返跑组织示范', focus: '队列流转、安全间距', duration: '02:34', icon: Users },
  ]

  function exportPlan() {
    downloadText('速度大课间执行方案.txt', `速度大课间执行方案\n时长：${duration}\n场地：${field}\n节奏：${bpm} BPM\n\n${recessTimeline.map((item) => `${item.minute}分钟 ${item.title}：${item.activity}`).join('\n')}\n\n${recessZones.map((item) => `${item.zone} ${item.group} ${item.activity} ${item.equipment}`).join('\n')}`)
    notify('大课间执行方案已导出')
  }

  return <>
    <PageHeader title="速度大课间" subtitle="根据学生分层、操场容量和课间时长生成全校同步训练方案" actions={<><Button icon={FileDown} onClick={exportPlan}>导出执行单</Button><Button variant="primary" icon={enabled ? Check : Send} onClick={() => { setEnabled(!enabled); notify(enabled ? '方案已停用' : classDraft ? '班级大课间草稿已确认发布' : '方案已发布到教师端') }}>{enabled ? '已启用' : classDraft ? '确认发布草稿' : '发布方案'}</Button></>} />
    {classDraft && <section className="class-sync-note panel"><CheckCircle2 size={18} /><div><strong>已同步班级大课间草稿</strong><span>{classDraft.school} · {classDraft.grade}{classDraft.className} · 覆盖率 {classDraft.coverage}%</span></div><Tag color={enabled ? 'green' : 'orange'}>{enabled ? '已发布' : '待确认发布'}</Tag></section>}
    <div className="recess-config panel"><label>课间时长<Select value={duration} onChange={setDuration}><option>25 分钟</option><option>30 分钟</option></Select></label><label>场地条件<Select value={field} onChange={setField}><option>标准 400m 操场</option><option>200m 操场</option><option>室内场地</option></Select></label><label>参与学生<input className="input" value="409 人" readOnly /></label><label>训练分区<input className="input" value="3 个" readOnly /></label><Button icon={Sparkles} onClick={() => notify('已按当前条件重新排布场地与动作')}>重新生成</Button></div>
    <div className="recess-grid">
      <section className="panel recess-flow"><div className="panel-heading"><div><h2>30 分钟执行流程</h2><p>集合、热身、主训练、挑战与放松完整闭环</p></div><Tag color="green">总计 30 分钟</Tag></div><div className="flow-track">{recessTimeline.map((item, index) => <article key={item.minute} style={{ flex: index === 2 ? 2.2 : 1 }}><header><strong>{item.minute}</strong><span>{item.bpm} BPM</span></header><div><b>{item.title}</b><p>{item.activity}</p></div></article>)}</div><div className="music-player"><button onClick={() => setPlaying(!playing)} title={playing ? '暂停节奏' : '播放节奏'}>{playing ? <Pause size={19} /> : <Play size={19} />}</button><Music size={18} /><div><strong>大课间节奏轨</strong><span>{bpm} BPM · {playing ? '播放中' : '已暂停'}</span></div><div className={`waveform ${playing ? 'playing' : ''}`}>{Array.from({ length: 28 }, (_, index) => <i key={index} style={{ height: `${8 + (index * 7) % 22}px` }} />)}</div><Select value={String(bpm)} onChange={(value) => setBpm(Number(value))}><option>118</option><option>124</option><option>132</option><option>138</option></Select></div></section>
      <section className="panel zone-panel"><div className="panel-heading"><h2>场地分区</h2><Tag>{field}</Tag></div><div className="field-map">{recessZones.map((zone) => <article key={zone.zone} style={{ borderColor: zone.color }}><span style={{ background: zone.color }}>{zone.zone}</span><h3>{zone.group}</h3><strong>{zone.activity}</strong><p>{zone.students} 人 · {zone.equipment}</p></article>)}</div></section>
    </div>
    <section className="panel demo-panel"><div className="panel-heading"><div><h2>动作示范库</h2><p>教师端与大屏同步调用</p></div><Tag color="purple">专业动作 18 个</Tag></div><div className="demo-grid">{actions.map((action) => { const Icon = action.icon; return <button key={action.name} onClick={() => setActiveVideo(action)}><div className="demo-visual"><Icon size={34} /><span><Play size={18} /></span></div><div><strong>{action.name}</strong><p>{action.focus}</p><small><Video size={13} />{action.duration}</small></div></button> })}</div></section>
    {activeVideo && <Modal title={`动作示范 · ${activeVideo.name}`} onClose={() => setActiveVideo(null)} wide footer={<Button variant="primary" onClick={() => setActiveVideo(null)}>完成学习</Button>}><div className="motion-demo"><div className="runner"><span /><i /><b /></div><div className="motion-track"><i /><i /><i /><i /></div></div><div className="motion-notes"><div><span>动作重点</span><strong>{activeVideo.focus}</strong></div><div><span>建议节奏</span><strong>{bpm} BPM</strong></div><div><span>组织方式</span><strong>每组 8-10 人，间隔 2 米</strong></div></div></Modal>}
  </>
}

function ResearchSubnav({ active, navigate }) {
  return <div className="tabs research-tabs"><button className={active === 'analysis' ? 'active' : ''} onClick={() => navigate('/research')}>科研分析</button><button className={active === 'writing' ? 'active' : ''} onClick={() => navigate('/research/writing')}>AI 写作</button><button className={active === 'scholar' ? 'active' : ''} onClick={() => navigate('/research/scholar')}>学术搜索</button></div>
}

function buildWritingDraft(form, profile) {
  const customOutline = form.outline.split('\n').map((item) => item.trim()).filter(Boolean)
  const sections = form.outlineMode === '指定大纲' && customOutline.length ? customOutline : profile.sections
  const style = { 深奥风格: '以概念辨析和深层论证为主', 理论风格: '以理论框架和逻辑推演为主', 专业风格: '以专业、清晰、可核验为主' }[form.style] || '以专业、清晰、可核验为主'
  const references = form.references === 'AI 智能'
    ? '系统将根据主题推荐参考文献，正式提交前请核验作者、年份、刊名与 DOI。'
    : (form.referenceText || (form.referenceFiles.length ? form.referenceFiles.map((file) => `- ${file}`).join('\n') : '请上传或粘贴实际使用的参考文献。'))
  return [`# ${form.topic}`, '', `> ${profile.name} · ${form.language} · ${form.size} · ${form.style}`, '', '## 内容提要', `本文围绕“${form.topic}”展开，按照${style}的表达要求，形成一份可编辑、可复核的 ${profile.name} 结构化初稿。提交前请结合原始记录、数据和引用逐项核验。`, '', ...sections.flatMap((section, index) => [`## ${index + 1}. ${section}`, '', `本节围绕“${form.topic}”梳理${section}，建议补充真实对象、时间、数据、案例和责任人，避免将占位内容直接作为最终结论。`, index === 0 ? '研究范围、目标和评价指标应与实际方案保持一致。' : index === sections.length - 1 ? '请在本节补充可执行的结论、建议或下一阶段安排，并注明证据边界。' : '请结合过程记录、测评结果和相关材料补充本节事实依据。', '']), '', '## 辅助信息', form.auxiliary || '暂无补充信息，请补充背景、成果、问题、计划或其他写作要求。', '', '## 参考文献', references].join('\n')
}

function ResearchAnalysis({ notify }) {
  const [projects, setProjects] = useState(() => loadArray('sport-research-projects', researchProjects))
  const [modal, setModal] = useState(false)
  const [compare, setCompare] = useState('周期对比')
  const [form, setForm] = useState({ title: '分层训练对学生速度素质提升的实证研究', owner: '体育教研组', samples: 120, deadline: '2026-12-30' })
  useEffect(() => localStorage.setItem('sport-research-projects', JSON.stringify(projects)), [projects])

  function exportData() {
    const rows = ['周期,达标率,优良率,30m平均成绩,纵跳平均高度', ...researchTrend.map((item) => [item.period, item.pass, item.excellent, item.sprint, item.jump].join(','))]
    downloadText('体质健康科研数据.csv', `\ufeff${rows.join('\n')}`, 'text/csv;charset=utf-8')
    notify('科研数据已导出为 Excel 兼容格式')
  }

  function createProject() {
    setProjects([{ id: `RS-2026-${String(projects.length + 3).padStart(2, '0')}`, ...form, stage: '方案设计', progress: 8 }, ...projects])
    setModal(false)
    notify('课题档案已创建')
  }

  const weakData = [{ name: '速度耐力', value: 68, color: '#f97316' }, { name: '下肢爆发', value: 76, color: '#2563eb' }, { name: '柔韧性', value: 61, color: '#ef4444' }, { name: '协调性', value: 83, color: '#10b981' }]
  return <>
    <PageHeader title="科研分析" subtitle="全校体质报告、多维对比、数据导出与课题申报全过程管理" actions={<><Button icon={Download} onClick={exportData}>导出科研数据</Button><Button variant="primary" icon={Plus} onClick={() => setModal(true)}>新建课题</Button></>} />
    <StatStrip items={[
      { label: '体质达标率', value: 92.6, unit: '%', color: '#10b981', hint: '较上周期 +3.3%' },
      { label: '优良率', value: 46.8, unit: '%', color: '#2563eb', hint: '较上周期 +5.6%' },
      { label: '覆盖样本', value: 509, unit: '人' },
      { label: '跟踪周期', value: 4, unit: '期', color: '#7c3aed' },
      { label: '进行中课题', value: projects.filter((item) => item.progress < 100).length, unit: '项', color: '#f97316' },
    ]} />
    <div className="research-chart-grid">
      <section className="panel chart-panel"><div className="panel-heading"><div><h2>体质健康成长趋势</h2><p>月度 / 学期纵向追踪</p></div><Select value={compare} onChange={setCompare}><option>周期对比</option><option>班级对比</option><option>年级对比</option></Select></div><div className="research-chart"><ResponsiveContainer width="100%" height="100%"><LineChart data={researchTrend} margin={{ top: 18, right: 20, left: -5, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="period" /><YAxis domain={[20, 100]} /><Tooltip /><Legend /><Line dataKey="pass" name="达标率(%)" stroke="#10b981" strokeWidth={3} /><Line dataKey="excellent" name="优良率(%)" stroke="#2563eb" strokeWidth={3} /></LineChart></ResponsiveContainer></div></section>
      <section className="panel chart-panel"><div className="panel-heading"><div><h2>各年级提升效果</h2><p>干预前后达标率对比</p></div><Tag color="green">平均 +7.1%</Tag></div><div className="research-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={gradeComparison} margin={{ top: 18, right: 10, left: -10, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="grade" /><YAxis /><Tooltip /><Legend /><Bar dataKey="pass" name="达标率" fill="#2563eb" radius={[4, 4, 0, 0]} /><Bar dataKey="excellent" name="优良率" fill="#10b981" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></section>
    </div>
    <div className="research-bottom-grid">
      <section className="panel weakness-panel"><div className="panel-heading"><div><h2>核心短板分布</h2><p>分数越低代表越需优先干预</p></div><Tag color="red">柔韧性优先</Tag></div><div className="weakness-content"><div className="weakness-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={weakData} dataKey="value" nameKey="name" innerRadius={56} outerRadius={82}>{weakData.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer></div><div className="weakness-list">{weakData.map((item) => <div key={item.name}><span><i style={{ background: item.color }} />{item.name}</span><b>{item.value} 分</b><Progress value={item.value} /></div>)}</div></div></section>
      <section className="panel project-panel"><div className="panel-heading"><div><h2>课题申报与研究进度</h2><p>方法、样本、数据和成果归档</p></div><Tag color="purple">{projects.length} 项</Tag></div><div className="project-list">{projects.map((project) => <article key={project.id}><div><Tag color={project.progress >= 80 ? 'green' : project.progress >= 35 ? 'blue' : 'orange'}>{project.stage}</Tag><span>{project.id}</span></div><h3>{project.title}</h3><p>{project.owner} · 样本 {project.samples} 人 · 截止 {project.deadline}</p><Progress value={project.progress} /></article>)}</div></section>
    </div>
    {modal && <Modal title="新建课题档案" onClose={() => setModal(false)} footer={<><Button onClick={() => setModal(false)}>取消</Button><Button variant="primary" onClick={createProject}>创建课题</Button></>}><div className="form-stack"><label>课题名称<input className="input" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></label><label>负责人<input className="input" value={form.owner} onChange={(event) => setForm({ ...form, owner: event.target.value })} /></label><label>计划样本数<input className="input" type="number" value={form.samples} onChange={(event) => setForm({ ...form, samples: Number(event.target.value) })} /></label><label>计划结题日期<input className="input" type="date" value={form.deadline} onChange={(event) => setForm({ ...form, deadline: event.target.value })} /></label><div className="ai-hint"><GraduationCap size={20} /><p>系统将创建数据采集方案、干预组/对照组结构、周期复测节点和成果材料目录。</p></div></div></Modal>}
  </>
}

function WritingHub({ navigate }) {
  const categories = ['推荐写作', '学术教育', '学生常用', '职场精选', '机关单位']
  const [category, setCategory] = useState('推荐写作')
  const [query, setQuery] = useState('')
  const filtered = writingToolProfiles.filter((profile) => profile.category === category && `${profile.name} ${profile.description}`.includes(query.trim()))
  const recent = loadArray('sport-writing-recent', []).map((slug) => writingToolProfiles.find((profile) => profile.slug === slug)).filter(Boolean)
  function open(profile) {
    navigate(`/research/writing/${profile.slug}`)
  }
  return <>
    <PageHeader title="AI 写作" subtitle="选择写作类型，按截图中的统一流程生成可编辑初稿" actions={<Tag color="purple">{writingToolProfiles.length} 个工具</Tag>} />
    <div className="writing-hub-layout">
      <aside className="panel writing-category-panel"><div className="writing-category-title"><Sparkles size={18} /><strong>写作分类</strong></div>{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => { setCategory(item); setQuery('') }}>{item}<span>{writingToolProfiles.filter((profile) => profile.category === item).length}</span></button>)}</aside>
      <section className="writing-hub-main"><div className="panel writing-hub-toolbar"><div className="search-box"><Search size={16} /><input aria-label="搜索写作工具" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索其它写作类型" /></div><span>支持标题、课题、主题和辅助信息生成</span></div>{recent.length > 0 && <section className="writing-recent"><div className="section-label">最近使用</div><div className="writing-tool-grid compact">{recent.slice(0, 4).map((profile) => <button className="writing-tool-card" key={profile.slug} onClick={() => open(profile)}><FileText size={22} /><div><strong>{profile.name}</strong><p>{profile.description}</p></div></button>)}</div></section>}<section className="writing-catalog"><div className="section-label">{category}</div><div className="writing-tool-grid">{filtered.map((profile) => <button className="writing-tool-card" key={profile.slug} onClick={() => open(profile)}><span className="writing-tool-icon"><FileText size={22} /></span><div><strong>{profile.name}</strong><p>{profile.description}</p></div><ChevronRight size={17} /></button>)}</div>{!filtered.length && <div className="empty-state"><Search size={26} /><strong>没有匹配的写作工具</strong><p>换一个关键词试试。</p></div>}</section></section>
    </div>
  </>
}

function WritingToolPage({ profile, notify, navigate }) {
  const carriedCitation = localStorage.getItem('sport-research-citation-draft') || ''
  const defaultTopic = profile.slug === 'jietibaogao' ? '基于精准体育数据的学校体质健康分层干预研究' : ''
  const [form, setForm] = useState({ topic: defaultTopic, outlineMode: 'AI 智能', outline: '', references: carriedCitation ? '手动上传' : 'AI 智能', referenceText: carriedCitation, referenceFiles: [], style: '专业风格', auxiliary: '', language: '中文', size: '短（约4000字）' })
  const [draft, setDraft] = useState('')
  const [generating, setGenerating] = useState(false)
  function update(field, value) { setForm((current) => ({ ...current, [field]: value })) }
  function remember() {
    const current = loadArray('sport-writing-recent', [])
    localStorage.setItem('sport-writing-recent', JSON.stringify([profile.slug, ...current.filter((slug) => slug !== profile.slug)].slice(0, 8)))
  }
  function generateDraft() {
    if (!form.topic.trim()) return notify(`请先填写${profile.inputLabel}`, 'error')
    setGenerating(true)
    remember()
    window.setTimeout(() => { setDraft(buildWritingDraft(form, profile)); setGenerating(false); notify(`${profile.name}初稿已生成`) }, 350)
  }
  function copyDraft() {
    if (!draft) return notify('请先生成初稿', 'error')
    const copy = navigator.clipboard?.writeText(draft)
    if (!copy) return notify('当前浏览器未授权剪贴板，请直接选中复制', 'error')
    copy.then(() => notify('初稿已复制')).catch(() => notify('当前浏览器未授权剪贴板，请直接选中复制', 'error'))
  }
  function exportDraft() {
    if (!draft) return notify('请先生成初稿', 'error')
    downloadText(`${profile.name}-AI辅助初稿.md`, draft)
    notify('初稿已导出')
  }
  return <>
    <PageHeader title={profile.name} subtitle={profile.description} actions={<><Button icon={ChevronRight} onClick={() => navigate('/research/writing')}>返回工具中心</Button><Button icon={FileDown} onClick={exportDraft} disabled={!draft}>导出初稿</Button></>} />
    <div className="writing-tool-layout"><section className="panel writing-tool-form"><div className="writing-tool-heading"><span className="writing-tool-icon large"><FileText size={24} /></span><div><h2>{profile.name}</h2><p>{profile.description}</p></div></div><label className="writing-topic-field">* {profile.inputLabel}<textarea aria-label={profile.inputLabel} maxLength={100} value={form.topic} onChange={(event) => update('topic', event.target.value)} placeholder={profile.placeholder} /><small>{form.topic.length} / 100</small></label><div className="writing-option"><h3>写作大纲 <span>?</span></h3><div className="writing-segmented"><button className={form.outlineMode === 'AI 智能' ? 'active' : ''} onClick={() => update('outlineMode', 'AI 智能')}>AI 智能</button><button className={form.outlineMode === '指定大纲' ? 'active' : ''} onClick={() => update('outlineMode', '指定大纲')}>指定大纲</button></div>{form.outlineMode === '指定大纲' && <textarea aria-label="自定义大纲" className="textarea" value={form.outline} onChange={(event) => update('outline', event.target.value)} placeholder="每行输入一个章节标题" />}</div><div className="writing-option"><h3>* 参考文献 <span>?</span></h3><div className="writing-segmented"><button className={form.references === 'AI 智能' ? 'active' : ''} onClick={() => update('references', 'AI 智能')}>AI 智能</button><button className={form.references === '手动上传' ? 'active' : ''} onClick={() => update('references', '手动上传')}>手动上传</button></div>{form.references === '手动上传' && <><textarea aria-label="引用文本" className="textarea" value={form.referenceText} onChange={(event) => update('referenceText', event.target.value)} placeholder="粘贴标准引用或参考文献列表" /><label className="file-picker">上传参考资料<input type="file" multiple accept=".pdf,.docx,.txt" onChange={(event) => update('referenceFiles', Array.from(event.target.files || []).map((file) => file.name))} /><span>{form.referenceFiles.length ? form.referenceFiles.join('、') : '选择 PDF、DOCX 或 TXT 文件'}</span></label></>}</div><div className="writing-option"><h3>* 写作风格 <span>?</span></h3><div className="writing-style-grid">{['专业风格', '深奥风格', '理论风格'].map((style) => <button key={style} className={form.style === style ? 'active' : ''} onClick={() => update('style', style)}><b>{style.slice(0, 1)}</b>{style}</button>)}</div></div><label className="writing-topic-field auxiliary-field">辅助信息<textarea aria-label="辅助信息" value={form.auxiliary} onChange={(event) => update('auxiliary', event.target.value)} placeholder="建议输入关键词、背景、目的、方法、计划、成果等具体信息（非必填）" /><small>{form.auxiliary.length} / 5000</small></label><div className="form-grid two-cols writing-extra-fields"><label>写作语言<select className="select" value={form.language} onChange={(event) => update('language', event.target.value)}><option>中文</option><option>英文</option></select></label><label>篇幅长度<select className="select" value={form.size} onChange={(event) => update('size', event.target.value)}><option>短（约4000字）</option><option>中（约8000字）</option></select></label></div><Button variant="primary" icon={generating ? RefreshCw : Sparkles} aria-label={profile.slug === 'jietibaogao' ? '生成报告初稿' : '开始写作'} onClick={generateDraft} disabled={generating}>{generating ? '生成中...' : '写作'}</Button><div className="writing-guard"><ShieldCheck size={17} /><span>AI 只生成结构化初稿，正式提交前请人工核验数据、引用和事实。</span></div></section><aside className="panel writing-tool-info"><span className="writing-word-icon">W</span><h2>{profile.name}</h2><p>{profile.description}</p><ul>{profile.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></aside></div><section className="panel writing-result-panel"><div className="panel-heading"><div><h2>在线编辑区</h2><p>{draft ? '可直接编辑、复制或导出 Markdown 初稿' : '生成后在此核验正文结构和证据占位'}</p></div><div className="preview-actions"><Button icon={ClipboardCheck} onClick={copyDraft} disabled={!draft}>复制</Button><Button icon={Download} onClick={exportDraft} disabled={!draft}>导出</Button></div></div>{draft ? <textarea className="draft-editor" value={draft} onChange={(event) => setDraft(event.target.value)} /> : <div className="empty-state writing-empty"><Sparkles size={30} /><strong>等待生成初稿</strong><p>先填写主题和写作要求，再生成一份可编辑的结构化草稿。</p></div>}</section>
  </>
}

function ResearchScholar({ notify, navigate }) {
  const [query, setQuery] = useState('体质健康')
  const [source, setSource] = useState('全部来源')
  const [year, setYear] = useState('全部年份')
  const [activeId, setActiveId] = useState(researchPapers[0].id)
  const [knowledgeIds, setKnowledgeIds] = useState(() => loadArray('sport-research-knowledge', []))
  const [citations, setCitations] = useState(() => loadArray('sport-research-citations', []))
  useEffect(() => localStorage.setItem('sport-research-knowledge', JSON.stringify(knowledgeIds)), [knowledgeIds])
  useEffect(() => localStorage.setItem('sport-research-citations', JSON.stringify(citations)), [citations])
  const filtered = researchPapers.filter((paper) => {
    const haystack = `${paper.title} ${paper.authors} ${paper.source} ${paper.abstract} ${paper.keywords.join(' ')}`.toLowerCase()
    const matchesQuery = !query.trim() || haystack.includes(query.trim().toLowerCase())
    const matchesSource = source === '全部来源' || paper.type === source
    const matchesYear = year === '全部年份' || (year === '近三年' ? paper.year >= 2024 : paper.year >= 2022)
    return matchesQuery && matchesSource && matchesYear
  })
  const activePaper = researchPapers.find((paper) => paper.id === activeId) || filtered[0] || researchPapers[0]

  function search() {
    notify(`已检索 ${filtered.length} 篇相关文献`)
    if (filtered[0]) setActiveId(filtered[0].id)
  }

  function toggleKnowledge(id) {
    setKnowledgeIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
    notify(knowledgeIds.includes(id) ? '已移出科研知识库' : '已加入科研知识库')
  }

  function saveCitation(paper) {
    if (!citations.includes(paper.id)) setCitations((current) => [...current, paper.id])
    const copy = navigator.clipboard?.writeText(paper.citation)
    copy?.catch(() => {})
    notify('引用已保存并复制')
  }

  function openWriting() {
    if (activePaper) localStorage.setItem('sport-research-citation-draft', activePaper.citation)
    navigate('/research/writing/jietibaogao')
    notify('已带入 AI 写作工作区')
  }

  return <>
    <PageHeader title="学术搜索" subtitle="检索体育教育文献，沉淀知识库，并把可信引用带回科研写作" actions={<Tag color="green">本地示例文献库 · {researchPapers.length} 篇</Tag>} />
    <section className="panel scholar-search-panel"><div className="scholar-searchbar"><div className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && search()} placeholder="输入主题、关键词或作者" /></div><Button variant="primary" icon={Search} onClick={search}>搜索文献</Button></div><div className="scholar-filters"><label>来源<Select value={source} onChange={setSource}><option>全部来源</option><option>期刊论文</option><option>会议论文</option><option>学位论文</option></Select></label><label>年份<Select value={year} onChange={setYear}><option>全部年份</option><option>近三年</option><option>近五年</option></Select></label><span><BookOpenCheck size={15} />已收藏 {knowledgeIds.length} 篇 · 已保存引用 {citations.length} 条</span></div></section>
    <div className="scholar-layout"><section className="panel scholar-results-panel"><div className="panel-heading"><div><h2>检索结果</h2><p>按相关性展示标题、来源、摘要和关键词</p></div><Tag color="blue">{filtered.length} 篇</Tag></div>{filtered.length ? <div className="paper-list">{filtered.map((paper) => <article key={paper.id} className={activePaper.id === paper.id ? 'paper-card active' : 'paper-card'} onClick={() => setActiveId(paper.id)}><div className="paper-card-head"><Tag color={paper.type === '学位论文' ? 'orange' : paper.type === '会议论文' ? 'purple' : 'blue'}>{paper.type}</Tag><span>{paper.year} · {paper.source}</span></div><h3>{paper.title}</h3><p className="paper-authors">{paper.authors}</p><p>{paper.abstract}</p><div className="paper-keywords">{paper.keywords.map((keyword) => <Tag key={keyword} color="default">{keyword}</Tag>)}</div><footer><button className="link-button" onClick={(event) => { event.stopPropagation(); toggleKnowledge(paper.id) }}>{knowledgeIds.includes(paper.id) ? '已在知识库' : '加入知识库'}</button><button className="link-button" onClick={(event) => { event.stopPropagation(); saveCitation(paper) }}>保存引用</button></footer></article>)}</div> : <div className="empty-state"><Search size={28} /><strong>没有匹配文献</strong><p>试试减少关键词或切换来源、年份筛选。</p></div>}</section><aside className="panel scholar-detail-panel"><div className="panel-heading"><div><h2>关键知识点</h2><p>选中文献的可复用结论</p></div><Tag color="green">可回溯</Tag></div><div className="paper-detail"><Tag color="blue">{activePaper.type}</Tag><h3>{activePaper.title}</h3><p className="paper-authors">{activePaper.authors} · {activePaper.source} · {activePaper.year}</p><div className="insight-box"><Sparkles size={18} /><div><strong>{activePaper.insight}</strong><p>建议在研究记录中标注原文页码、样本范围和适用边界。</p></div></div><h4>摘要</h4><p>{activePaper.abstract}</p><h4>标准引用</h4><div className="citation-box">{activePaper.citation}</div><div className="detail-actions"><Button icon={BookOpenCheck} onClick={() => toggleKnowledge(activePaper.id)}>{knowledgeIds.includes(activePaper.id) ? '移出知识库' : '加入知识库'}</Button><Button icon={ClipboardCheck} onClick={() => saveCitation(activePaper)}>复制引用</Button><Button variant="primary" icon={Sparkles} onClick={openWriting}>带入 AI 写作</Button></div></div></aside></div>
  </>
}

export function ResearchCenter({ path, notify, navigate }) {
  const active = path.startsWith('/research/writing') ? 'writing' : path.endsWith('/scholar') ? 'scholar' : 'analysis'
  if (active === 'writing') {
    const slug = path.split('/').filter(Boolean).pop()
    const profile = writingToolProfiles.find((item) => item.slug === slug)
    return <><ResearchSubnav active="writing" navigate={navigate} />{profile ? <WritingToolPage profile={profile} notify={notify} navigate={navigate} /> : <WritingHub navigate={navigate} />}</>
  }
  return <><ResearchSubnav active={active} navigate={navigate} />{active === 'scholar' ? <ResearchScholar notify={notify} navigate={navigate} /> : <ResearchAnalysis notify={notify} />}</>
}

export function HomeSchool({ notify }) {
  const [tasks, setTasks] = useState(() => loadArray('sport-homework-tasks', homeworkTasks))
  const [modal, setModal] = useState(false)
  const [preview, setPreview] = useState(false)
  const [form, setForm] = useState({ title: '周末个性化速度处方', target: '高一 1班', due: '2026-07-27T20:00', focus: '启动加速与下肢协调' })
  const [classDraft] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sport-class-health-draft')) } catch { return null }
  })
  useEffect(() => localStorage.setItem('sport-homework-tasks', JSON.stringify(tasks)), [tasks])

  function publish() {
    const targetCount = form.target.includes('高一') ? 40 : 18
    setTasks([{ id: `HW-0724-${String(tasks.length + 1).padStart(2, '0')}`, ...form, students: targetCount, completed: 0, due: form.due.replace('2026-', '').replace('T', ' '), status: '进行中' }, ...tasks])
    setModal(false)
    notify('家庭运动作业已发布到家长端')
  }

  function importClassDraft() {
    if (!classDraft) return
    setForm({ ...form, title: `${classDraft.grade}${classDraft.className}分层家庭训练`, target: `${classDraft.grade} ${classDraft.className}`, focus: '按优势组、提升组、基础组分层训练' })
    setModal(true)
  }

  return <>
    <PageHeader title="家校协同" subtitle="学生成长档案、家庭运动处方、家长打卡和教师反馈同步闭环" actions={<><Button icon={MonitorSmartphone} onClick={() => setPreview(true)}>家长端预览</Button><Button variant="primary" icon={Plus} onClick={classDraft ? importClassDraft : () => setModal(true)}>{classDraft ? '确认班级作业草稿' : '发布家庭作业'}</Button></>} />
    {classDraft && <section className="class-sync-note panel"><CheckCircle2 size={18} /><div><strong>已同步分层家庭作业草稿</strong><span>{classDraft.grade}{classDraft.className} · 将按 3 个能力组生成家庭训练</span></div><Tag color="orange">待确认发布</Tag></section>}
    <StatStrip items={[
      { label: '本周家庭作业', value: tasks.filter((item) => item.status === '进行中').length, unit: '项', color: '#2563eb' },
      { label: '覆盖学生', value: 256, unit: '人' },
      { label: '今日打卡', value: 87, unit: '次', color: '#10b981' },
      { label: '整体完成率', value: 84.6, unit: '%', color: '#7c3aed' },
      { label: '待教师反馈', value: 12, unit: '条', color: '#f97316' },
    ]} />
    <div className="homework-layout">
      <section className="panel homework-panel"><div className="panel-heading"><div><h2>家庭运动作业</h2><p>校内诊断自动匹配居家场景动作</p></div><Tag color="green">家长端已同步</Tag></div><div className="homework-list">{tasks.map((task) => { const percent = Math.round(task.completed / task.students * 100); return <article key={task.id}><header><div><Tag color={task.status === '已结束' ? 'default' : 'blue'}>{task.status}</Tag><span className="mono">{task.id}</span></div><Button icon={Send} onClick={() => notify(`已向 ${task.students - task.completed} 名未打卡学生发送提醒`)}>提醒</Button></header><h3>{task.title}</h3><p>{task.target} · {task.focus}</p><div className="homework-meta"><span><Users size={14} />{task.students} 人</span><span><Clock3 size={14} />截止 {task.due}</span><span><CheckCircle2 size={14} />已完成 {task.completed}</span></div><Progress value={percent} /></article> })}</div></section>
      <section className="panel checkin-panel"><div className="panel-heading"><div><h2>最新家长打卡</h2><p>居家训练数据自动回传校园端</p></div><Button icon={RefreshCw} onClick={() => notify('打卡数据已刷新')}>刷新</Button></div><div className="checkin-list">{parentCheckins.map((item) => <article key={`${item.student}-${item.time}`}><div className="mini-avatar">{item.student.slice(0, 1)}</div><div><strong>{item.student}</strong><p>{item.task}</p><span>{item.parent} · {item.time} · {item.duration} 分钟</span></div><div><Tag color={item.feeling === '轻松' ? 'green' : 'blue'}>{item.feeling}</Tag><span className="stars">{Array.from({ length: item.score }, (_, index) => <Star key={index} size={12} fill="currentColor" />)}</span></div></article>)}</div></section>
    </div>
    <section className="panel family-archive"><div className="panel-heading"><div><h2>个人成长档案同步</h2><p>面向家长展示个体成长，不进行学生间横向排名</p></div><Tag color="purple">月度更新</Tag></div><div className="archive-strip">{students.slice(0, 5).map((student, index) => <article key={student.id}><div className="mini-avatar">{student.name.slice(0, 1)}</div><div><strong>{student.name}</strong><span>{student.grade} {student.className}</span></div><b className="success-text">+{(3.2 + index * .7).toFixed(1).replace('.0', '')}%</b><small>本月综合提升</small><Button onClick={() => setPreview(true)}>查看档案</Button></article>)}</div></section>
    {modal && <Modal title="发布家庭运动作业" onClose={() => setModal(false)} footer={<><Button onClick={() => setModal(false)}>取消</Button><Button variant="primary" icon={Send} onClick={publish}>发布到家长端</Button></>}><div className="form-stack"><label>作业名称<input className="input" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></label><label>发布对象<Select value={form.target} onChange={(value) => setForm({ ...form, target: value })}><option>高一 1班</option><option>四年级</option><option>高风险学生</option></Select></label><label>训练重点<input className="input" value={form.focus} onChange={(event) => setForm({ ...form, focus: event.target.value })} /></label><label>截止时间<input className="input" type="datetime-local" value={form.due} onChange={(event) => setForm({ ...form, due: event.target.value })} /></label><div className="ai-hint"><HeartHandshake size={20} /><p>系统将按学生短板分别生成动作、组数和强度，家长端展示相应示范与打卡入口。</p></div></div></Modal>}
    {preview && <Modal title="家长端 · 张书豪成长档案" onClose={() => setPreview(false)} wide footer={<Button variant="primary" onClick={() => setPreview(false)}>关闭预览</Button>}><div className="parent-preview"><header><div className="student-avatar">张</div><div><h2>张书豪</h2><p>高一 1班 · 本月完成训练 9 次</p></div><Tag color="green">状态良好</Tag></header><div className="parent-stats"><div><span>综合能力</span><strong>82 分</strong><small>本月 +4.6%</small></div><div><span>30m短跑</span><strong>1.87s</strong><small>提升 0.11s</small></div><div><span>家庭作业</span><strong>92%</strong><small>完成率</small></div></div><div className="parent-homework"><Video size={28} /><div><strong>本周家庭处方</strong><p>动态热身 5分钟 · 原地快速纵跳 3组 · 10m启动练习 4组 · 放松 5分钟</p></div><Button icon={Play}>动作示范</Button></div></div></Modal>}
  </>
}

export function SchoolTeam({ notify }) {
  const [candidates, setCandidates] = useState(() => loadArray('sport-team-candidates', teamCandidates))
  const [event, setEvent] = useState('全部项目')
  const [tab, setTab] = useState('selection')
  const [fitQuery, setFitQuery] = useState('')
  const [selectedFitId, setSelectedFitId] = useState('100023017')
  useEffect(() => localStorage.setItem('sport-team-candidates', JSON.stringify(candidates)), [candidates])
  const visible = event === '全部项目' ? candidates : candidates.filter((item) => item.event === event)
  const fitVisible = projectFitProfiles.filter((item) => !fitQuery || item.name.includes(fitQuery) || item.id.includes(fitQuery) || item.event.includes(fitQuery))
  const selectedFit = projectFitProfiles.find((item) => item.id === selectedFitId) || projectFitProfiles[0]

  function toggleSelection(id) {
    setCandidates(candidates.map((item) => item.id === id ? { ...item, selected: !item.selected } : item))
    notify('校队候选名单已更新')
  }

  function exportReport() {
    const rows = ['学号,姓名,性别,年级,建议专项,潜力分,30m成绩,风险,是否入队', ...candidates.map((item) => [item.id, item.name, item.sex, item.grade, item.event, item.potential, item.sprint, item.risk, item.selected ? '是' : '否'].join(','))]
    downloadText('特色田径队选材报告.csv', `\ufeff${rows.join('\n')}`, 'text/csv;charset=utf-8')
    notify('选材报告已导出')
  }

  function exportFitReport() {
    const rows = ['学号,姓名,年级,适合项目,适配度,当前情况,预期目标,状态,训练路径', ...projectFitProfiles.map((item) => [item.id, item.name, item.grade, item.event, item.fitScore, item.current, item.target, item.status, item.path].join(','))]
    downloadText('冠军训练体系项目适配报告.csv', `\ufeff${rows.join('\n')}`, 'text/csv;charset=utf-8')
    notify('项目适配报告已导出')
  }

  return <>
    <PageHeader title="特色田径队" subtitle="AI 选材、运动员档案、周期化竞技训练与赛事备战" actions={<><Button icon={Download} onClick={exportReport}>导出选材报告</Button><Button variant="primary" icon={Plus} onClick={() => notify('已创建新一轮校队选拔批次')}>新建选拔</Button></>} />
    <StatStrip items={[
      { label: '校队运动员', value: candidates.filter((item) => item.selected).length, unit: '人', color: '#2563eb' },
      { label: '高潜候选', value: 12, unit: '人', color: '#7c3aed' },
      { label: '备战赛事', value: competitions.length, unit: '场', color: '#f97316' },
      { label: '本周训练', value: 6, unit: '次', color: '#10b981' },
      { label: '伤病高风险', value: 1, unit: '人', color: '#ef4444' },
    ]} />
    <div className="tabs team-tabs"><button className={tab === 'selection' ? 'active' : ''} onClick={() => setTab('selection')}>AI 选材</button><button className={tab === 'fit' ? 'active' : ''} onClick={() => setTab('fit')}>冠军训练体系</button><button className={tab === 'training' ? 'active' : ''} onClick={() => setTab('training')}>竞技训练</button><button className={tab === 'competition' ? 'active' : ''} onClick={() => setTab('competition')}>赛事备战</button></div>
    {tab === 'fit' && <div className="champion-layout"><section className="panel fit-table-panel"><div className="panel-heading"><div><h2>AI 项目适配报告</h2><p>直接回答“谁适合什么项目、目标是什么、当前处于什么阶段”</p></div><div><div className="search-box"><input value={fitQuery} onChange={(event) => setFitQuery(event.target.value)} placeholder="搜索学生 / 项目" /><Search size={16} /></div><Button icon={Download} onClick={exportFitReport}>导出适配报告</Button></div></div><div className="fit-callout"><Target size={19} /><div><strong>适配不是标签，而是训练决策起点</strong><p>系统综合速度、爆发力、协调、对称和风险指标，为每位孩子给出主项建议、阶段目标与优先训练路径。</p></div></div><div className="table-scroll"><table><thead><tr><th>学生</th><th>适合项目</th><th>适配度</th><th>当前情况</th><th>预期目标</th><th>培养阶段</th></tr></thead><tbody>{fitVisible.map((item) => <tr key={item.id} className={selectedFit.id === item.id ? 'selected-row' : 'clickable-row'} onClick={() => setSelectedFitId(item.id)}><td><b>{item.name}</b><small className="cell-note">{item.grade} · {item.id}</small></td><td><Tag color={item.event.includes('网球') ? 'green' : 'purple'}>{item.event}</Tag></td><td><div className="fit-score"><b>{item.fitScore}</b><span><i style={{ width: `${item.fitScore}%` }} /></span></div></td><td>{item.current}</td><td className="success-text"><b>{item.target}</b></td><td><Tag color={item.status === '可进入专项' ? 'green' : item.status === '基础提升' ? 'orange' : 'blue'}>{item.status}</Tag></td></tr>)}</tbody></table></div></section><aside className="panel fit-detail-panel"><div className="panel-heading"><div><h2>{selectedFit.name} · 目标画像</h2><p>{selectedFit.grade} · {selectedFit.id}</p></div><Tag color="gold">适配度 {selectedFit.fitScore}</Tag></div><div className="fit-hero"><div className="student-avatar">{selectedFit.name.slice(0, 1)}</div><div><strong>最适合：{selectedFit.event}</strong><p>{selectedFit.basis}</p></div></div><div className="fit-current-target"><div><span>当下情况</span><strong>{selectedFit.current}</strong><Tag color="orange">现状</Tag></div><ChevronRight size={18} /><div><span>预期目标</span><strong>{selectedFit.target}</strong><Tag color="green">目标</Tag></div></div><div className="fit-chart-title"><h3>与苏炳添速度基准的阶段对比</h3><Tag color="blue">越低越快</Tag></div><div className="fit-chart"><ResponsiveContainer width="100%" height="100%"><LineChart data={benchmarkTrend} margin={{ top: 14, right: 12, left: -16, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="phase" tick={{ fill: '#64748b', fontSize: 10 }} /><YAxis domain={[1.55, 1.95]} tick={{ fill: '#94a3b8', fontSize: 9 }} /><Tooltip /><Legend /><Line type="monotone" dataKey="athlete" name="学生当前路径" stroke="#2563eb" strokeWidth={3} dot={{ r: 3 }} /><Line type="monotone" dataKey="benchmark" name="苏炳添基准" stroke="#ef4444" strokeDasharray="5 5" /><Line type="monotone" dataKey="target" name="阶段目标" stroke="#10b981" strokeDasharray="3 3" /></LineChart></ResponsiveContainer></div><div className="fit-path"><span>优先训练路径</span><strong>{selectedFit.path}</strong><Button variant="primary" icon={ClipboardCheck} onClick={() => notify(`已为 ${selectedFit.name} 创建 ${selectedFit.event} 训练计划`)}>生成专项计划</Button></div></aside></div>}
    {tab === 'selection' && <div className="team-selection-grid"><section className="panel table-panel"><div className="panel-heading"><div><h2>选材候选名单</h2><p>速度、爆发力、风险与专项潜力综合评估</p></div><Select value={event} onChange={setEvent}><option>全部项目</option><option>短跑</option><option>纵跳</option><option>跳远</option><option>跳跃</option></Select></div><div className="table-scroll"><table><thead><tr><th>学生</th><th>年级</th><th>建议专项</th><th>潜力分</th><th>30m</th><th>风险</th><th>操作</th></tr></thead><tbody>{visible.map((item) => <tr key={item.id}><td><b>{item.name}</b><small className="cell-note">{item.id}</small></td><td>{item.grade}</td><td><Tag color="purple">{item.event}</Tag></td><td><b className="metric-purple">{item.potential}</b></td><td>{item.sprint}s</td><td><Tag color={item.risk === '低风险' ? 'green' : 'orange'}>{item.risk}</Tag></td><td><Button variant={item.selected ? 'default' : 'primary'} onClick={() => toggleSelection(item.id)}>{item.selected ? '移出校队' : '选入校队'}</Button></td></tr>)}</tbody></table></div></section><aside className="panel athlete-profile"><div className="panel-heading"><div><h2>重点运动员档案</h2><p>张书豪 · 短跑专项</p></div><Tag color="gold">A 级潜力</Tag></div><div className="athlete-head"><div className="student-avatar">张</div><div><strong>张书豪</strong><span>高一 · 100023017</span></div><Award size={32} /></div><div className="athlete-metrics"><div><span>速度潜力</span><b>92</b><Progress value={92} /></div><div><span>爆发力</span><b>86</b><Progress value={86} /></div><div><span>训练适应</span><b>81</b><Progress value={81} /></div><div><span>伤病风险</span><b className="warning-text">中</b><Progress value={46} /></div></div><div className="selection-note"><Sparkles size={18} /><p>建议主项 100m，副项 200m。启动反应和前 30m 加速能力突出，需加强后程速度保持与踝膝稳定。</p></div></aside></div>}
    {tab === 'training' && <section className="panel cycle-panel"><div className="panel-heading"><div><h2>年度周期化训练</h2><p>赛前备战、专项强化、比赛调整与赛后恢复</p></div><Tag color="blue">2026 赛季</Tag></div><div className="cycle-track">{[
      ['基础储备期', '7-8月', 82, '力量基础、动作技术、一般耐力', 'green'],
      ['专项强化期', '8-9月', 64, '启动加速、最高速度、专项力量', 'blue'],
      ['赛前调整期', '9月中旬', 28, '减量提质、比赛节奏、心理准备', 'orange'],
      ['赛后恢复期', '9月下旬', 0, '主动恢复、伤病筛查、赛季复盘', 'purple'],
    ].map(([name, date, progress, focus, color], index) => <article key={name}><header><span>{index + 1}</span><Tag color={color}>{date}</Tag></header><h3>{name}</h3><p>{focus}</p><Progress value={progress} /></article>)}</div><div className="coach-panel"><div><GraduationCap size={30} /><div><strong>冠军教练训练周模板</strong><p>起跑技术 2 次 · 最高速度 1 次 · 专项力量 2 次 · 主动恢复 1 次</p></div></div><Button icon={ClipboardCheck} onClick={() => notify('冠军教练训练周模板已应用')}>应用模板</Button></div></section>}
    {tab === 'competition' && <div className="competition-grid">{competitions.map((item, index) => <article className="panel competition-card" key={item.name}><header><span className={`competition-icon competition-${index}`}><Trophy size={22} /></span><Tag color={item.status === '备战中' ? 'orange' : 'default'}>{item.status}</Tag></header><h2>{item.name}</h2><p><CalendarDays size={15} />{item.date} · 距离比赛 {item.days} 天</p><div><span>备战阶段</span><strong>{item.stage}</strong></div><div><span>参赛运动员</span><strong>{item.athletes} 人</strong></div><Button variant={index === 0 ? 'primary' : 'default'} icon={Flag} onClick={() => notify(`${item.name}备战计划已打开`)}>备战计划</Button></article>)}</div>}
  </>
}

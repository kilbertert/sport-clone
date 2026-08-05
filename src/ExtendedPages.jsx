import { useEffect, useMemo, useState } from 'react'
import {
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
  Sparkles,
  SquareActivity,
  Star,
  Trophy,
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
  researchTrend,
  teachingGroups,
  teamCandidates,
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

export function LayeredTeaching({ notify }) {
  const [activeGroup, setActiveGroup] = useState('fast')
  const [duration, setDuration] = useState('40 分钟')
  const [venue, setVenue] = useState('田径场 1/2 场')
  const [equipment, setEquipment] = useState('标志桶、低栏、敏捷梯')
  const [generatedAt, setGeneratedAt] = useState('14:36')
  const active = teachingGroups.find((item) => item.id === activeGroup)
  const groupedStudents = students.filter((_, index) => ['fast', 'middle', 'basic'][index % 3] === activeGroup).slice(0, 8)
  const points = students.slice(0, 8).map((item, index) => ({ ...item, points: 980 - index * 46, streak: 7 - (index % 4) }))

  function generate() {
    setGeneratedAt(new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }))
    notify('分层课堂方案已重新生成')
  }

  function exportPlan() {
    const content = `速度分层课堂方案\n时长：${duration}\n场地：${venue}\n器械：${equipment}\n\n${lessonTimeline.map((item) => `${item.phase} ${item.duration}分钟：${item.detail}`).join('\n')}\n\n${teachingGroups.map((item) => `${item.name}：${item.prescription}`).join('\n')}`
    downloadText('速度分层课堂方案.txt', content)
    notify('课堂方案已导出')
  }

  return <>
    <PageHeader title="分层教学" subtitle="基于体测数据自动分组并生成可直接执行的差异化体育课方案" actions={<><Button icon={Download} onClick={exportPlan}>导出方案</Button><Button variant="primary" icon={Sparkles} onClick={generate}>AI 生成课堂方案</Button></>} />
    <div className="teaching-toolbar panel"><div><label>班级<Select value="高一 1班" onChange={() => {}}><option>高一 1班</option><option>高一 2班</option><option>四年级 四4班</option></Select></label><label>课堂时长<Select value={duration} onChange={setDuration}><option>40 分钟</option><option>45 分钟</option><option>60 分钟</option></Select></label><label>场地<Select value={venue} onChange={setVenue}><option>田径场 1/2 场</option><option>综合馆</option><option>室内走廊</option></Select></label><label>器械<input className="input" value={equipment} onChange={(event) => setEquipment(event.target.value)} /></label></div><span><CheckCircle2 size={16} />方案更新于 {generatedAt}</span></div>
    <div className="teaching-group-grid">{teachingGroups.map((group) => <button key={group.id} className={`group-card group-${group.color} ${activeGroup === group.id ? 'active' : ''}`} onClick={() => setActiveGroup(group.id)}><header><span>{group.level}</span><div><h2>{group.name}</h2><p>{group.count} 名学生</p></div><ChevronRight size={18} /></header><strong>{group.focus}</strong><p>{group.prescription}</p><footer><TargetIcon />{group.target}</footer></button>)}</div>
    <div className="teaching-main-grid">
      <section className="panel lesson-panel"><div className="panel-heading"><div><h2>课堂执行单</h2><p>{duration} · {venue}</p></div><Tag color="green">可直接授课</Tag></div><div className="lesson-timeline">{lessonTimeline.map((item, index) => <article key={item.phase}><div><span>{index + 1}</span><i /></div><div><header><strong>{item.phase}</strong><b>{item.duration} 分钟</b></header><p>{item.detail}</p><Tag color={item.intensity === '高' ? 'orange' : item.intensity === '中' ? 'blue' : 'green'}>{item.intensity}强度</Tag></div></article>)}</div><div className="teacher-script"><BookOpenCheck size={20} /><div><strong>标准授课话术</strong><p>“今天按能力梯队完成不同挑战。动作质量优先，完成后记录个人积分，不比较同学间成绩。”</p></div></div></section>
      <section className="panel roster-panel"><div className="panel-heading"><div><h2>{active.name}学生表</h2><p>{active.focus}</p></div><Tag color={active.color}>{active.count} 人</Tag></div><div className="table-scroll"><table><thead><tr><th>学生</th><th>30m</th><th>纵跳</th><th>潜力</th><th>本节负荷</th></tr></thead><tbody>{groupedStudents.map((item, index) => <tr key={item.id}><td><b>{item.name}</b><small className="cell-note">{item.id}</small></td><td>{item.sprint}s</td><td>{item.jump}cm</td><td><b className="metric-blue">{item.potential}</b></td><td><Tag color={index % 3 === 0 ? 'orange' : 'green'}>{index % 3 === 0 ? '80%' : '90%'}</Tag></td></tr>)}</tbody></table></div></section>
    </div>
    <section className="panel points-panel"><div className="panel-heading"><div><h2>课堂积分榜</h2><p>个人进步、动作质量与坚持度综合积分</p></div><Tag color="purple">本周</Tag></div><div className="points-list">{points.map((item, index) => <article key={item.id}><span className={`rank rank-${index + 1}`}>{index + 1}</span><div className="mini-avatar">{item.name.slice(0, 1)}</div><div><strong>{item.name}</strong><small>{item.grade} {item.className}</small></div><b>{item.points}<small> pts</small></b><Tag color={item.streak >= 6 ? 'orange' : 'blue'}>连续 {item.streak} 天</Tag></article>)}</div></section>
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
    <PageHeader title="速度大课间" subtitle="根据学生分层、操场容量和课间时长生成全校同步训练方案" actions={<><Button icon={FileDown} onClick={exportPlan}>导出执行单</Button><Button variant="primary" icon={enabled ? Check : Send} onClick={() => { setEnabled(!enabled); notify(enabled ? '方案已停用' : '方案已发布到教师端') }}>{enabled ? '已启用' : '发布方案'}</Button></>} />
    <div className="recess-config panel"><label>课间时长<Select value={duration} onChange={setDuration}><option>25 分钟</option><option>30 分钟</option></Select></label><label>场地条件<Select value={field} onChange={setField}><option>标准 400m 操场</option><option>200m 操场</option><option>室内场地</option></Select></label><label>参与学生<input className="input" value="409 人" readOnly /></label><label>训练分区<input className="input" value="3 个" readOnly /></label><Button icon={Sparkles} onClick={() => notify('已按当前条件重新排布场地与动作')}>重新生成</Button></div>
    <div className="recess-grid">
      <section className="panel recess-flow"><div className="panel-heading"><div><h2>30 分钟执行流程</h2><p>集合、热身、主训练、挑战与放松完整闭环</p></div><Tag color="green">总计 30 分钟</Tag></div><div className="flow-track">{recessTimeline.map((item, index) => <article key={item.minute} style={{ flex: index === 2 ? 2.2 : 1 }}><header><strong>{item.minute}</strong><span>{item.bpm} BPM</span></header><div><b>{item.title}</b><p>{item.activity}</p></div></article>)}</div><div className="music-player"><button onClick={() => setPlaying(!playing)} title={playing ? '暂停节奏' : '播放节奏'}>{playing ? <Pause size={19} /> : <Play size={19} />}</button><Music size={18} /><div><strong>大课间节奏轨</strong><span>{bpm} BPM · {playing ? '播放中' : '已暂停'}</span></div><div className={`waveform ${playing ? 'playing' : ''}`}>{Array.from({ length: 28 }, (_, index) => <i key={index} style={{ height: `${8 + (index * 7) % 22}px` }} />)}</div><Select value={String(bpm)} onChange={(value) => setBpm(Number(value))}><option>118</option><option>124</option><option>132</option><option>138</option></Select></div></section>
      <section className="panel zone-panel"><div className="panel-heading"><h2>场地分区</h2><Tag>{field}</Tag></div><div className="field-map">{recessZones.map((zone) => <article key={zone.zone} style={{ borderColor: zone.color }}><span style={{ background: zone.color }}>{zone.zone}</span><h3>{zone.group}</h3><strong>{zone.activity}</strong><p>{zone.students} 人 · {zone.equipment}</p></article>)}</div></section>
    </div>
    <section className="panel demo-panel"><div className="panel-heading"><div><h2>动作示范库</h2><p>教师端与大屏同步调用</p></div><Tag color="purple">专业动作 18 个</Tag></div><div className="demo-grid">{actions.map((action) => { const Icon = action.icon; return <button key={action.name} onClick={() => setActiveVideo(action)}><div className="demo-visual"><Icon size={34} /><span><Play size={18} /></span></div><div><strong>{action.name}</strong><p>{action.focus}</p><small><Video size={13} />{action.duration}</small></div></button> })}</div></section>
    {activeVideo && <Modal title={`动作示范 · ${activeVideo.name}`} onClose={() => setActiveVideo(null)} wide footer={<Button variant="primary" onClick={() => setActiveVideo(null)}>完成学习</Button>}><div className="motion-demo"><div className="runner"><span /><i /><b /></div><div className="motion-track"><i /><i /><i /><i /></div></div><div className="motion-notes"><div><span>动作重点</span><strong>{activeVideo.focus}</strong></div><div><span>建议节奏</span><strong>{bpm} BPM</strong></div><div><span>组织方式</span><strong>每组 8-10 人，间隔 2 米</strong></div></div></Modal>}
  </>
}

export function ResearchCenter({ notify }) {
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

export function HomeSchool({ notify }) {
  const [tasks, setTasks] = useState(() => loadArray('sport-homework-tasks', homeworkTasks))
  const [modal, setModal] = useState(false)
  const [preview, setPreview] = useState(false)
  const [form, setForm] = useState({ title: '周末个性化速度处方', target: '高一 1班', due: '2026-07-27T20:00', focus: '启动加速与下肢协调' })
  useEffect(() => localStorage.setItem('sport-homework-tasks', JSON.stringify(tasks)), [tasks])

  function publish() {
    const targetCount = form.target.includes('高一') ? 40 : 18
    setTasks([{ id: `HW-0724-${String(tasks.length + 1).padStart(2, '0')}`, ...form, students: targetCount, completed: 0, due: form.due.replace('2026-', '').replace('T', ' '), status: '进行中' }, ...tasks])
    setModal(false)
    notify('家庭运动作业已发布到家长端')
  }

  return <>
    <PageHeader title="家校协同" subtitle="学生成长档案、家庭运动处方、家长打卡和教师反馈同步闭环" actions={<><Button icon={MonitorSmartphone} onClick={() => setPreview(true)}>家长端预览</Button><Button variant="primary" icon={Plus} onClick={() => setModal(true)}>发布家庭作业</Button></>} />
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
  useEffect(() => localStorage.setItem('sport-team-candidates', JSON.stringify(candidates)), [candidates])
  const visible = event === '全部项目' ? candidates : candidates.filter((item) => item.event === event)

  function toggleSelection(id) {
    setCandidates(candidates.map((item) => item.id === id ? { ...item, selected: !item.selected } : item))
    notify('校队候选名单已更新')
  }

  function exportReport() {
    const rows = ['学号,姓名,性别,年级,建议专项,潜力分,30m成绩,风险,是否入队', ...candidates.map((item) => [item.id, item.name, item.sex, item.grade, item.event, item.potential, item.sprint, item.risk, item.selected ? '是' : '否'].join(','))]
    downloadText('特色田径队选材报告.csv', `\ufeff${rows.join('\n')}`, 'text/csv;charset=utf-8')
    notify('选材报告已导出')
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
    <div className="tabs team-tabs"><button className={tab === 'selection' ? 'active' : ''} onClick={() => setTab('selection')}>AI 选材</button><button className={tab === 'training' ? 'active' : ''} onClick={() => setTab('training')}>竞技训练</button><button className={tab === 'competition' ? 'active' : ''} onClick={() => setTab('competition')}>赛事备战</button></div>
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

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  Activity,
  BarChart3,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Crown,
  Cpu,
  Download,
  Eye,
  EyeOff,
  FileText,
  Fingerprint,
  Gauge,
  HeartHandshake,
  Inbox,
  LayoutDashboard,
  Layers3,
  LockKeyhole,
  LogOut,
  Menu,
  Microscope,
  Music2,
  Plus,
  RefreshCw,
  RotateCcw,
  ScanFace,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Trophy,
  TrendingUp,
  Upload,
  User,
  UserRound,
  Users,
  X,
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
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  CaptureCenter,
  HomeSchool,
  LayeredTeaching,
  PrecisionDashboard,
  RecessProgram,
  ResearchCenter,
  SchoolTeam,
} from './ExtendedPages'
import {
  asymmetryRisk,
  dashboardStudents,
  fatigueRisk,
  hopRank,
  initialPlans,
  initialSchedules,
  jumpRank,
  potentialRank,
  projectStats,
  schoolStats,
  schools,
  sprintRank,
  studentTrend,
  students,
} from './data'

const AppContext = createContext(null)

const navItems = [
  { path: '/dashboard', label: '仪表盘', icon: LayoutDashboard, section: '数据中心' },
  { path: '/precision', label: '精准体育系统', icon: BarChart3 },
  { path: '/capture', label: 'AI采集中心', icon: Cpu },
  { path: '/students', label: '学生信息', icon: Users },
  { path: '/talent', label: '人才地图', icon: Crown },
  { path: '/risk', label: '风险管理', icon: ShieldCheck },
  { path: '/teaching', label: '分层教学', icon: Layers3, section: '教学提升', fresh: true },
  { path: '/recess', label: '速度大课间', icon: Music2, fresh: true },
  { path: '/training', label: '训练处方', icon: ClipboardCheck },
  { path: '/schedules', label: '测试计划', icon: CalendarDays, fresh: true },
  { path: '/home-school', label: '家校协同', icon: HeartHandshake, section: '协同与科研', fresh: true },
  { path: '/research', label: '科研分析', icon: Microscope, fresh: true },
  { path: '/team', label: '特色田径队', icon: Trophy, fresh: true },
  { path: '/face', label: '人脸识别', icon: ScanFace, section: '系统工具' },
  { path: '/reports', label: '我的报告', icon: Inbox },
]

const pageMeta = {
  '/dashboard': ['仪表盘', '数据域范围内的学生测试记录全景'],
  '/precision': ['精准体育系统', '一屏尽揽全校精准体质数据，管理决策有支撑'],
  '/capture': ['AI采集中心', '无穿戴设备接入、测试批次控制与实时数据入库'],
  '/students': ['学生信息', '查看、新增、编辑学生基础信息，支持数据域过滤'],
  '/talent': ['人才地图', '基于 30m短跑 / 纵跳 / 立定跳远 + 综合潜力分的 4 大维度排行'],
  '/risk': ['风险管理', 'BFI 疲劳值 & 左右腿不对称率双维度风控'],
  '/teaching': ['分层教学', 'AI 自动分组与差异化体育课执行方案'],
  '/recess': ['速度大课间', '全校分区训练与节奏化课间方案'],
  '/training': ['训练处方', '基于学生能力诊断与风险等级制定、跟踪个性化训练方案'],
  '/schedules': ['测试计划', '统一安排测试批次、场地、项目与执行进度'],
  '/home-school': ['家校协同', '个人档案、家庭作业与家长打卡'],
  '/research': ['科研分析', '体质报告、多维对比与课题申报'],
  '/team': ['特色田径队', 'AI 选材、竞技训练与赛事备战'],
  '/face': ['人脸识别管理', ''],
  '/reports': ['我的报告', '查看并下载管理员定向下发给您的报告文件'],
  '/profile': ['个人中心', '账号基础信息与密码修改'],
}

function getPath() {
  const path = window.location.pathname
  return path === '/' ? '/dashboard' : path
}

function loadStored(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return Array.isArray(value) ? value : fallback
  } catch {
    return fallback
  }
}

function useApp() {
  return useContext(AppContext)
}

function App() {
  const [authed, setAuthed] = useState(() => localStorage.getItem('sport-auth') === '1')
  const [path, setPath] = useState(getPath)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const handlePop = () => setPath(getPath())
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])

  function navigate(nextPath) {
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function login() {
    localStorage.setItem('sport-auth', '1')
    setAuthed(true)
    navigate('/dashboard')
  }

  function logout() {
    localStorage.removeItem('sport-auth')
    setAuthed(false)
    window.history.replaceState({}, '', '/')
    setPath('/dashboard')
  }

  const context = { navigate, notify: (message, type = 'success') => setToast({ message, type }) }

  return (
    <AppContext.Provider value={context}>
      {authed ? <MainLayout path={path} logout={logout} /> : <LoginPage onLogin={login} />}
      {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}
    </AppContext.Provider>
  )
}

function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function submit(event) {
    event.preventDefault()
    if (!form.username || !form.password) {
      setError('请输入用户名和密码')
      return
    }
    setLoading(true)
    setError('')
    window.setTimeout(() => {
      if (form.username === '产品' && form.password === 'Sports1116.') onLogin()
      else {
        setError('用户名或密码错误')
        setLoading(false)
      }
    }, 450)
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>运动能力分析系统</h1>
        <p>Sports Ability Analysis · 权限分级管理平台</p>
        <form onSubmit={submit}>
          <label className="field-label" htmlFor="username"><span>*</span> 用户名</label>
          <div className="input-affix">
            <UserRound size={17} />
            <input
              id="username"
              value={form.username}
              onChange={(event) => setForm({ ...form, username: event.target.value })}
              placeholder="请输入用户名"
              autoComplete="username"
            />
          </div>
          <label className="field-label" htmlFor="password"><span>*</span> 密码</label>
          <div className="input-affix">
            <LockKeyhole size={17} />
            <input
              id="password"
              type={visible ? 'text' : 'password'}
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="请输入密码"
              autoComplete="current-password"
            />
            <button className="icon-plain" type="button" onClick={() => setVisible(!visible)} title={visible ? '隐藏密码' : '显示密码'}>
              {visible ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {error && <div className="form-error">{error}</div>}
          <button className="primary-button login-button" type="submit" disabled={loading}>
            {loading ? '登录中...' : '登 录'}
          </button>
        </form>
      </section>
    </main>
  )
}

function MainLayout({ path, logout }) {
  const { navigate } = useApp()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const normalizedPath = path.startsWith('/students/') ? '/students' : (path.startsWith('/research/') ? '/research' : path)
  const meta = path.startsWith('/students/') ? ['学生分析', '学生运动能力综合分析与训练建议'] : (pageMeta[normalizedPath] || pageMeta['/dashboard'])

  function go(nextPath) {
    navigate(nextPath)
    setMobileOpen(false)
  }

  return (
    <div className={`app-shell ${collapsed ? 'is-collapsed' : ''}`}>
      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <button className="brand" onClick={() => go('/dashboard')}>
          <span className="logo-dot" />
          {!collapsed && <span>运动能力分析系统</span>}
        </button>
        <nav className="nav-list">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = normalizedPath === item.path
            return (
              <div className="nav-entry" key={item.path}>
                {item.section && !collapsed && <span className="nav-section">{item.section}</span>}
                <button className={`nav-item ${active ? 'active' : ''}`} onClick={() => go(item.path)} title={collapsed ? item.label : undefined}>
                  <Icon size={18} />
                  {!collapsed && <span>{item.label}</span>}
                  {!collapsed && item.fresh && <small>新增</small>}
                </button>
              </div>
            )
          })}
        </nav>
      </aside>
      {mobileOpen && <button className="sidebar-scrim" aria-label="关闭导航" onClick={() => setMobileOpen(false)} />}
      <div className="workspace">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button desktop-menu" onClick={() => setCollapsed(!collapsed)} title={collapsed ? '展开侧栏' : '收起侧栏'}><Menu size={19} /></button>
            <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} title="打开导航"><Menu size={19} /></button>
            <div className="breadcrumb"><span>首页</span><b>/</b><span>{meta[0]}</span></div>
          </div>
          <div className="topbar-right">
            <span className="role-tag">区域教育管理层</span>
            <div className="profile-wrap">
              <button className="profile-trigger" onClick={() => setProfileOpen(!profileOpen)}>
                <span className="avatar">产</span><span className="profile-name">产品</span><ChevronDown size={14} />
              </button>
              {profileOpen && (
                <div className="profile-menu">
                  <button onClick={() => { go('/profile'); setProfileOpen(false) }}><User size={16} />个人中心</button>
                  <button className="danger-text" onClick={logout}><LogOut size={16} />退出登录</button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="content">
          <RouteContent path={path} />
        </main>
      </div>
    </div>
  )
}

function RouteContent({ path }) {
  const { navigate, notify } = useApp()
  if (path.startsWith('/students/')) return <StudentDetail id={decodeURIComponent(path.split('/').pop())} />
  if (path === '/precision') return <PrecisionDashboard notify={notify} navigate={navigate} />
  if (path === '/capture') return <CaptureCenter notify={notify} navigate={navigate} />
  if (path === '/students') return <StudentList />
  if (path === '/talent') return <TalentMap />
  if (path === '/risk') return <RiskOverview />
  if (path === '/teaching') return <LayeredTeaching notify={notify} navigate={navigate} />
  if (path === '/recess') return <RecessProgram notify={notify} navigate={navigate} />
  if (path === '/training') return <TrainingPlans />
  if (path === '/schedules') return <TestSchedules />
  if (path === '/home-school') return <HomeSchool notify={notify} navigate={navigate} />
  if (path === '/research' || path.startsWith('/research/')) return <ResearchCenter path={path} notify={notify} navigate={navigate} />
  if (path === '/team') return <SchoolTeam notify={notify} navigate={navigate} />
  if (path === '/face') return <FaceManage />
  if (path === '/reports') return <Reports />
  if (path === '/profile') return <Profile />
  return <Dashboard />
}

function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-header">
      <div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>
      {actions && <div className="page-actions">{actions}</div>}
    </div>
  )
}

function Button({ children, icon: Icon, variant = 'default', className = '', ...props }) {
  return <button className={`button button-${variant} ${className}`} {...props}>{Icon && <Icon size={16} />}{children}</button>
}

function Select({ value, onChange, children, className = '', ariaLabel }) {
  return <select className={`select ${className}`} value={value} onChange={(event) => onChange(event.target.value)} aria-label={ariaLabel}>{children}</select>
}

function Tag({ children, color = 'blue', className = '' }) {
  return <span className={`tag tag-${color} ${className}`}>{children}</span>
}

function StatStrip({ items }) {
  return <div className="stat-strip">{items.map((item) => <div className="stat-cell" key={item.label}><span>{item.label}</span><strong style={{ color: item.color }}>{item.value}<small>{item.unit}</small></strong>{item.hint && <em>{item.hint}</em>}</div>)}</div>
}

function SearchBox({ value, onChange, placeholder = '搜索' }) {
  return <div className="search-box"><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /><Search size={17} /></div>
}

function EmptyState({ icon: Icon = Inbox, title, description }) {
  return <div className="empty-state"><Icon size={42} /><strong>{title}</strong>{description && <p>{description}</p>}</div>
}

function Pagination({ page, total, pageSize = 10, onChange }) {
  const pages = Math.max(1, Math.ceil(total / pageSize))
  const visible = Array.from({ length: Math.min(5, pages) }, (_, index) => index + 1)
  return (
    <div className="pagination">
      <span>共 {total} 条</span>
      <button disabled={page === 1} onClick={() => onChange(page - 1)}><ChevronLeft size={15} /></button>
      {visible.map((item) => <button key={item} className={page === item ? 'active' : ''} onClick={() => onChange(item)}>{item}</button>)}
      {pages > 5 && <><span>•••</span><button className={page === pages ? 'active' : ''} onClick={() => onChange(pages)}>{pages}</button></>}
      <button disabled={page === pages} onClick={() => onChange(page + 1)}><ChevronRight size={15} /></button>
      <span className="page-size">{pageSize} 条/页</span>
    </div>
  )
}

function Dashboard() {
  const { navigate } = useApp()
  const [school, setSchool] = useState('全部学校')
  const [query, setQuery] = useState('')
  const [sex, setSex] = useState('全部性别')
  const [project, setProject] = useState('全部项目')
  const [page, setPage] = useState(1)
  const baseRows = useMemo(() => [...dashboardStudents, ...students], [])
  const filtered = useMemo(() => baseRows.filter((item) => {
    const matchesQuery = !query || item.name.includes(query) || item.id.includes(query)
    const matchesSchool = school === '全部学校' || item.school === school
    const matchesSex = sex === '全部性别' || item.sex === sex
    const matchesProject = project === '全部项目' || item.projects.includes(project)
    return matchesQuery && matchesSchool && matchesSex && matchesProject
  }), [baseRows, query, school, sex, project])
  const pageRows = filtered.slice((page - 1) * 10, page * 10)

  function reset() {
    setSchool('全部学校'); setQuery(''); setSex('全部性别'); setProject('全部项目'); setPage(1)
  }

  return (
    <>
      <PageHeader title="仪表盘" subtitle="数据域范围内的学生测试记录全景" actions={<><Select value={school} onChange={(value) => { setSchool(value); setPage(1) }} ariaLabel="学校筛选">{schools.map((item) => <option key={item}>{item}</option>)}</Select><Tag>区域教育管理层</Tag><Tag color="green">区域数据域</Tag></>} />
      <StatStrip items={[
        { label: '学生总数', value: 509, unit: '人' },
        { label: '已测试', value: 336, unit: '人', color: '#2563eb', hint: '完成率 66.0%' },
        { label: '覆盖学校', value: 4, unit: '所' },
        { label: '覆盖班级', value: 22, unit: '个' },
        { label: '30m短跑', value: 313, unit: '人次', color: '#f97316' },
        { label: '纵跳', value: 227, unit: '人次', color: '#2563eb' },
        { label: '立定跳远', value: 302, unit: '人次', color: '#10b981' },
      ]} />
      <section className="panel table-panel">
        <div className="panel-heading"><h2>学生测试记录</h2><div><Tag>当前结果 {filtered.length} / 509</Tag><Button icon={RotateCcw} onClick={reset}>重置筛选</Button></div></div>
        <div className="filters six-cols">
          <SearchBox value={query} onChange={(value) => { setQuery(value); setPage(1) }} placeholder="搜索学号 / 姓名" />
          <Select value={school} onChange={(value) => { setSchool(value); setPage(1) }} ariaLabel="学校">{schools.map((item) => <option key={item}>{item}</option>)}</Select>
          <Select value="全部年级" onChange={() => {}} ariaLabel="年级"><option>全部年级</option><option>高一</option><option>四年级</option></Select>
          <Select value="全部班级" onChange={() => {}} ariaLabel="班级"><option>全部班级</option><option>1班</option><option>四4班</option></Select>
          <Select value={sex} onChange={(value) => { setSex(value); setPage(1) }} ariaLabel="性别"><option>全部性别</option><option>男</option><option>女</option></Select>
          <Select value={project} onChange={(value) => { setProject(value); setPage(1) }} ariaLabel="已测项目"><option>全部项目</option><option>30m短跑</option><option>纵跳</option><option>立定跳远</option></Select>
        </div>
        <div className="table-scroll">
          <table>
            <thead><tr><th>#</th><th>学校</th><th>学号</th><th>姓名</th><th>性别</th><th>年级</th><th>班级</th><th>已测项目</th><th>最近测试</th></tr></thead>
            <tbody>{pageRows.map((item, index) => <tr key={`${item.id}-${index}`} onClick={() => navigate(`/students/${item.id}`)} className="clickable-row"><td>{(page - 1) * 10 + index + 1}</td><td>{item.school}</td><td><b>{item.id}</b></td><td>{item.name}</td><td><Tag color={item.sex === '男' ? 'blue' : 'pink'}>{item.sex}</Tag></td><td>{item.grade}</td><td>{item.className}</td><td><div className="tag-row">{item.projects.map((name) => <Tag key={name} color={name === '30m短跑' ? 'orange' : name === '纵跳' ? 'blue' : 'green'}>{name}</Tag>)}</div></td><td className="mono">{item.latestTest}</td></tr>)}</tbody>
          </table>
        </div>
        {!pageRows.length && <EmptyState title="当前筛选无匹配记录" />}
        <Pagination page={page} total={filtered.length} onChange={setPage} />
      </section>
      <div className="chart-grid">
        <section className="panel chart-panel">
          <div className="panel-heading"><h2>测试项目参与人数</h2><div className="segmented"><button className="active">核心 3 项</button><button>全部 14 项</button></div></div>
          <div className="chart-height">
            <ResponsiveContainer width="100%" height="100%"><BarChart data={projectStats} margin={{ top: 20, right: 10, bottom: 0, left: -12 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8edf4" /><XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} /><YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} /><Tooltip /><Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={42}>{projectStats.map((item) => <Cell fill={item.color} key={item.name} />)}</Bar></BarChart></ResponsiveContainer>
          </div>
        </section>
        <section className="panel chart-panel">
          <div className="panel-heading"><h2>学校分布 TOP 8</h2></div>
          <div className="chart-height">
            <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={schoolStats} dataKey="value" nameKey="name" innerRadius={68} outerRadius={100} paddingAngle={2}>{schoolStats.map((item) => <Cell fill={item.color} key={item.name} />)}</Pie><Tooltip /><Legend layout="vertical" verticalAlign="middle" align="right" iconType="rect" /></PieChart></ResponsiveContainer>
          </div>
        </section>
      </div>
    </>
  )
}

function StudentList() {
  const { navigate, notify } = useApp()
  const [query, setQuery] = useState('')
  const [school, setSchool] = useState('全部学校')
  const [sex, setSex] = useState('全部性别')
  const [grade, setGrade] = useState('全部年级')
  const [page, setPage] = useState(1)
  const [dateModal, setDateModal] = useState(false)
  const filtered = students.filter((item) => (!query || item.id.includes(query) || item.name.includes(query)) && (school === '全部学校' || item.school === school) && (sex === '全部性别' || item.sex === sex) && (grade === '全部年级' || item.grade === grade))
  const rows = filtered.slice((page - 1) * 10, page * 10)

  function exportCsv(scope = filtered) {
    const header = '学号,姓名,性别,学校,年级,班级\n'
    const body = scope.map((item) => [item.id, item.name, item.sex, item.school, item.grade, item.className].join(',')).join('\n')
    const blob = new Blob([`\ufeff${header}${body}`], { type: 'text/csv;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = '学生测评数据.csv'
    link.click()
    URL.revokeObjectURL(link.href)
    notify('学生数据已导出')
  }

  return (
    <>
      <PageHeader title="学生信息" subtitle="查看、新增、编辑学生基础信息，支持数据域过滤" actions={<><Button icon={Download} onClick={() => exportCsv()}>导出学生数据</Button><Button icon={CalendarDays} onClick={() => setDateModal(true)}>按学校日期导出</Button></>} />
      <section className="panel table-panel">
        <div className="filters student-filters">
          <SearchBox value={query} onChange={(value) => { setQuery(value); setPage(1) }} placeholder="学号/姓名" />
          <Select value={school} onChange={(value) => { setSchool(value); setPage(1) }} ariaLabel="学校">{schools.map((item) => <option key={item}>{item}</option>)}</Select>
          <Select value={sex} onChange={(value) => { setSex(value); setPage(1) }} ariaLabel="性别"><option>全部性别</option><option>男</option><option>女</option></Select>
          <Select value={grade} onChange={(value) => { setGrade(value); setPage(1) }} ariaLabel="年级"><option>全部年级</option><option>高一</option><option>高二</option><option>四年级</option><option>七年级</option></Select>
          <Button variant="primary" icon={Search}>搜索</Button>
          <Button onClick={() => { setQuery(''); setSchool('全部学校'); setSex('全部性别'); setGrade('全部年级') }}>重置</Button>
        </div>
        <div className="table-scroll">
          <table>
            <thead><tr><th>学号</th><th>姓名</th><th>性别</th><th>学校</th><th>年级</th><th>班级</th><th>人脸照片</th><th>归一化状态</th><th>操作</th></tr></thead>
            <tbody>{rows.map((item) => <tr key={item.id}><td className="mono">{item.id}</td><td>{item.name}</td><td><Tag color={item.sex === '男' ? 'blue' : 'pink'}>{item.sex}</Tag></td><td>{item.school}</td><td>{item.grade}</td><td>{item.className}</td><td><div className={`face-thumb ${item.face ? 'has-face' : ''}`}>{item.face ? <Fingerprint size={20} /> : '暂无照片'}</div></td><td><Tag color={item.face ? 'green' : 'default'}>{item.face ? '已归一化' : '未录入'}</Tag></td><td><button className="link-button" onClick={() => navigate(`/students/${item.id}`)}>分析</button></td></tr>)}</tbody>
          </table>
        </div>
        <Pagination page={page} total={filtered.length} onChange={setPage} />
      </section>
      {dateModal && <Modal title="按学校检测日期导出" onClose={() => setDateModal(false)} footer={<><Button onClick={() => setDateModal(false)}>取消</Button><Button variant="primary" icon={Download} onClick={() => { exportCsv(); setDateModal(false) }}>导出</Button></>}><div className="form-grid"><label>学校<Select value={school} onChange={setSchool}>{schools.map((item) => <option key={item}>{item}</option>)}</Select></label><label>检测日期<input className="input" type="date" defaultValue="2026-07-24" /></label></div><p className="help-text">学校可选；留空则导出该日全部有成绩记录的学生。同一学生不同日期测试互不影响。</p></Modal>}
    </>
  )
}

function StudentDetail({ id }) {
  const { navigate, notify } = useApp()
  const student = students.find((item) => item.id === id) || students[3]
  const radarData = [
    { metric: '速度', score: 88 },
    { metric: '爆发力', score: 82 },
    { metric: '协调性', score: 74 },
    { metric: '稳定性', score: Math.max(48, 90 - student.asymmetry) },
    { metric: '恢复力', score: Math.max(42, 92 - student.bfi * 7) },
  ]
  return (
    <>
      <PageHeader title="学生分析" subtitle={`${student.school} · ${student.grade} ${student.className}`} actions={<><Button icon={ChevronLeft} onClick={() => navigate('/students')}>返回列表</Button><Button icon={RefreshCw} onClick={() => notify('分析数据已刷新')}>刷新</Button></>} />
      <section className="student-hero panel">
        <div className="student-avatar">{student.name.slice(0, 1)}</div>
        <div className="student-main"><div className="student-name-row"><h2>{student.name}</h2><Tag color={student.sex === '男' ? 'blue' : 'pink'}>{student.sex}</Tag><Tag color={student.bfi >= 7 ? 'red' : student.bfi >= 3 ? 'orange' : 'green'}>{student.bfi >= 7 ? '高风险' : student.bfi >= 3 ? '注意' : '状态良好'}</Tag></div><p>学号 {student.id} · 最近测试 {student.latestTest}</p></div>
        <div className="student-facts"><div><span>年龄</span><strong>{student.grade.includes('四') ? 10 : 16} 岁</strong></div><div><span>身高</span><strong>172 cm</strong></div><div><span>体重</span><strong>61.5 kg</strong></div></div>
      </section>
      <StatStrip items={[
        { label: '能力得分', value: student.potential, unit: '分', color: '#7c3aed', hint: '运动员等级：良好' },
        { label: '30m 总成绩', value: student.sprint, unit: 's', color: '#f97316', hint: '同年级前 8%' },
        { label: '纵跳高度', value: student.jump, unit: 'cm', color: '#2563eb', hint: 'SSC 能力良好' },
        { label: '立定跳远', value: student.hop, unit: 'm', color: '#10b981', hint: '高考评分 23/25' },
        { label: 'BFI 疲劳度', value: student.bfi, unit: '/10', color: student.bfi >= 7 ? '#ef4444' : '#f59e0b', hint: student.bfi >= 7 ? '重度疲劳' : '中度疲劳' },
      ]} />
      <div className="detail-grid">
        <section className="panel chart-panel"><div className="panel-heading"><h2>能力画像</h2><Tag color="purple">综合潜力 {student.potential} 分</Tag></div><div className="detail-chart"><ResponsiveContainer width="100%" height="100%"><RadarChart data={radarData}><PolarGrid stroke="#dbe3ee" /><PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 12 }} /><Radar dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.18} /></RadarChart></ResponsiveContainer></div></section>
        <section className="panel diagnosis-card"><div className="panel-heading"><h2>核心诊断结论</h2><Tag color="orange">建议复测 14 天</Tag></div><div className="diagnosis-score"><Gauge size={34} /><div><strong>启动加速优秀，落地稳定性需提升</strong><p>30m 前段速度优势明显；左右腿力量差异 {student.asymmetry}% ，应控制连续跳跃训练量并加强弱侧单腿稳定。</p></div></div><div className="diagnosis-list"><div><span>短板</span><b>弱侧离心控制</b></div><div><span>提升潜力</span><b className="success-text">高</b></div><div><span>训练原则</span><b>质量优先 · 充分恢复</b></div></div></section>
      </div>
      <div className="detail-grid">
        <section className="panel chart-panel"><div className="panel-heading"><h2>30m 短跑趋势</h2><Tag color="orange">最佳 {student.sprint}s</Tag></div><div className="detail-chart"><ResponsiveContainer width="100%" height="100%"><LineChart data={studentTrend} margin={{ top: 18, right: 20, left: -10, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="label" /><YAxis domain={[1.6, 2.4]} /><Tooltip /><Line type="monotone" dataKey="sprint" name="30m 成绩" stroke="#f97316" strokeWidth={3} dot={{ r: 4 }} /></LineChart></ResponsiveContainer></div></section>
        <section className="panel chart-panel"><div className="panel-heading"><h2>跳跃能力变化</h2><div className="tag-row"><Tag>纵跳</Tag><Tag color="green">立定跳远</Tag></div></div><div className="detail-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={studentTrend} margin={{ top: 18, right: 20, left: -10, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="label" /><YAxis /><Tooltip /><Legend /><Bar dataKey="jump" name="纵跳(cm)" fill="#2563eb" radius={[4, 4, 0, 0]} /><Bar dataKey="hop" name="立定跳远(m)" fill="#10b981" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></section>
      </div>
      <section className="panel prescription-preview">
        <div className="panel-heading"><div><h2>运动处方</h2><p>根据当前诊断自动生成的 4 周训练建议</p></div><Button variant="primary" icon={ClipboardCheck} onClick={() => { notify(`已为 ${student.name} 创建处方草稿`); navigate('/training') }}>加入训练处方</Button></div>
        <div className="prescription-grid">
          {[['热身要求', '动态活动 8 分钟 + A-Skip 2×20m'], ['训练动作', '弱侧单腿蹲 / 低栏连续跳 / 10m 加速跑'], ['组数与间歇', '3-4 组，每组间歇 120 秒'], ['放松要求', '臀中肌与小腿后侧拉伸，各 45 秒']].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
        </div>
      </section>
    </>
  )
}

function TalentMap() {
  const { notify } = useApp()
  const [school, setSchool] = useState('全部学校')
  const cards = [
    { title: '30m 短跑 TOP 榜(用时最短)', data: sprintRank, keyName: 'sprint', suffix: 's', color: 'orange' },
    { title: '纵跳 TOP 榜(最高)', data: jumpRank, keyName: 'jump', suffix: 'cm', color: 'blue' },
    { title: '立定跳远 TOP 榜(最远)', data: hopRank, keyName: 'hop', suffix: 'm', color: 'green' },
    { title: '综合潜力 TOP 榜', data: potentialRank, keyName: 'potential', suffix: '分', color: 'purple' },
  ]
  const filterData = (data) => school === '全部学校' ? data : data.filter((item) => item.school === school)
  return (
    <>
      <PageHeader title="人才地图" subtitle="基于 30m短跑 / 纵跳 / 立定跳远 + 综合潜力分的 4 大维度排行" actions={<><Select value={school} onChange={setSchool}>{schools.map((item) => <option key={item}>{item}</option>)}</Select><Select value="全量维度" onChange={() => {}}><option>全量维度</option><option>本校维度</option></Select><Button icon={RefreshCw} onClick={() => notify('人才排行已刷新')}>刷新</Button></>} />
      <StatStrip items={[
        { label: '有效测试', value: 336, unit: '人', hint: '全量维度' },
        { label: '30m有效成绩', value: 50, unit: '人', color: '#f97316' },
        { label: '纵跳有效成绩', value: 50, unit: '人', color: '#2563eb' },
        { label: '立定跳远有效', value: 50, unit: '人', color: '#10b981' },
        { label: '潜力综合入榜', value: 50, unit: '人', color: '#7c3aed' },
      ]} />
      <div className="leaderboard-grid">
        {cards.map((card) => <Leaderboard key={card.title} {...card} data={filterData(card.data)} />)}
      </div>
    </>
  )
}

function Leaderboard({ title, data, keyName, suffix, color }) {
  return <section className="panel leaderboard"><div className="panel-heading"><h2>{title}</h2><Tag color={color}>TOP 50</Tag></div><div className="table-scroll"><table><thead><tr><th>排名</th><th>学生</th><th>学校</th><th>班级</th><th>成绩</th><th>风险</th></tr></thead><tbody>{data.map((item, index) => <tr key={item.id}><td><Tag color={index < 3 ? 'gold' : 'default'}>#{index + 1}</Tag></td><td><b>{item.name}</b> <Tag color={item.sex === '男' ? 'blue' : 'pink'}>{item.sex}</Tag></td><td>{item.school}</td><td>{item.className}</td><td className={`metric metric-${color}`}>{item[keyName]}<small>{suffix}</small></td><td><Tag color={item.bfi >= 7 || item.asymmetry >= 15 ? 'red' : item.bfi >= 3 ? 'orange' : 'green'}>BFI {item.bfi} · 不对称 {item.asymmetry}%</Tag></td></tr>)}</tbody></table></div>{!data.length && <EmptyState title="当前学校暂无入榜学生" />}</section>
}

function RiskOverview() {
  const { notify } = useApp()
  const [school, setSchool] = useState('全部学校')
  const [fatigueQuery, setFatigueQuery] = useState('')
  const [asymQuery, setAsymQuery] = useState('')
  const fatigueRows = fatigueRisk.filter((item) => !fatigueQuery || item.name.includes(fatigueQuery) || item.id.includes(fatigueQuery))
  const asymRows = asymmetryRisk.filter((item) => !asymQuery || item.name.includes(asymQuery) || item.id.includes(asymQuery))
  return (
    <>
      <PageHeader title="风险管理" subtitle="BFI 疲劳值 & 左右腿不对称率双维度风控" actions={<><Select value={school} onChange={setSchool}>{schools.map((item) => <option key={item}>{item}</option>)}</Select><Button icon={RefreshCw} onClick={() => notify('风险名单已刷新')}>刷新</Button></>} />
      <div className="risk-summary-grid">
        <RiskSummary title="疲劳风控 · 基于纵跳 BFI" color="red" items={[['总样本', '106', ''], ['重度疲劳', '9', 'BFI ≥ 7'], ['中度疲劳', '61', '3 ≤ BFI < 7']]} />
        <RiskSummary title="不对称风控 · 基于立定跳远左右腿差" color="orange" items={[['总样本', '301', ''], ['高风险', '57', '差率 ≥ 15%'], ['中风险', '39', '10% ~ 15%']]} />
      </div>
      <div className="risk-table-grid">
        <section className="panel table-panel"><div className="panel-heading"><h2>疲劳风险名单</h2><SearchBox value={fatigueQuery} onChange={setFatigueQuery} placeholder="姓名/学号" /></div><div className="table-scroll"><table><thead><tr><th>学生</th><th>年级</th><th>班级</th><th>BFI</th><th>疲劳等级</th></tr></thead><tbody>{fatigueRows.map((item) => <tr key={item.id}><td><b>{item.name === '-' ? item.id : item.name}</b> {item.sex && <Tag color={item.sex === '男' ? 'blue' : 'pink'}>{item.sex}</Tag>}</td><td>{item.grade}</td><td>{item.className}</td><td className={`risk-number ${item.bfi >= 7 ? 'danger-text' : 'warning-text'}`}>{item.bfi}<small> / 10</small></td><td><Tag color={item.bfi >= 7 ? 'red' : 'orange'}>{item.bfi >= 7 ? '重度疲劳' : '中度疲劳'}</Tag></td></tr>)}</tbody></table></div><Pagination page={1} total={106} pageSize={10} onChange={() => {}} /></section>
        <section className="panel table-panel"><div className="panel-heading"><h2>不对称风险名单</h2><SearchBox value={asymQuery} onChange={setAsymQuery} placeholder="姓名/学号" /></div><div className="table-scroll"><table><thead><tr><th>学生</th><th>年级</th><th>班级</th><th>不对称率</th><th>弱侧</th><th>风险</th></tr></thead><tbody>{asymRows.map((item) => <tr key={item.id}><td><b>{item.name}</b> <Tag color={item.sex === '男' ? 'blue' : 'pink'}>{item.sex}</Tag></td><td>{item.grade}</td><td>{item.className}</td><td className="risk-number danger-text">{item.rate}%</td><td><Tag color="orange">{item.weak}</Tag></td><td><Tag color="red">高风险</Tag></td></tr>)}</tbody></table></div><Pagination page={1} total={301} pageSize={10} onChange={() => {}} /></section>
      </div>
    </>
  )
}

function RiskSummary({ title, color, items }) {
  return <section className="panel risk-summary"><h2 className={`title-${color}`}>{title}</h2><div>{items.map(([label, value, hint]) => <article key={label}><span>{label}</span><strong className={label === '总样本' ? '' : color === 'red' ? 'danger-text' : 'warning-text'}>{value}</strong>{hint && <em>{hint}</em>}</article>)}</div></section>
}

function FaceManage() {
  const { notify } = useApp()
  const [tab, setTab] = useState('normalize')
  const [fileName, setFileName] = useState('')
  const [result, setResult] = useState(null)
  function pickFile(event) { const file = event.target.files?.[0]; if (file) { setFileName(file.name); setResult(null) } }
  function process() { if (!fileName) { notify('请先选择图片', 'error'); return } setResult(tab === 'identify' ? '识别成功：张书豪（100023017）' : '归一化完成：输出 112 × 112'); notify('处理完成') }
  return (
    <>
      <PageHeader title="人脸识别管理" actions={<div className="engine-status"><span className="status-dot" />人脸引擎正常<Tag>已录入 7 人</Tag></div>} />
      <section className="panel face-panel">
        <div className="tabs"><button className={tab === 'normalize' ? 'active' : ''} onClick={() => { setTab('normalize'); setResult(null) }}>图片归一化</button><button className={tab === 'identify' ? 'active' : ''} onClick={() => { setTab('identify'); setResult(null) }}>人脸识别 (1:N)</button><button className={tab === 'status' ? 'active' : ''} onClick={() => { setTab('status'); setResult(null) }}>人脸状态</button></div>
        {tab === 'status' ? <FaceStatus /> : <div className="face-workbench"><label className={`upload-zone ${fileName ? 'has-file' : ''}`}><input type="file" accept="image/*" onChange={pickFile} /><div className="upload-icon"><Upload size={28} /></div><strong>{fileName || '选择图片'}</strong><p>支持 JPG、PNG、HEIC，单张图片不超过 8MB</p>{fileName && <Tag color="green">等待处理</Tag>}</label><div className="face-settings"><h2>{tab === 'identify' ? '人脸识别' : '输出设置'}</h2>{tab === 'normalize' ? <><label>输出尺寸<Select value="112 × 112" onChange={() => {}}><option>112 × 112</option><option>224 × 224</option></Select></label><div className="quality-grid"><div><span>清晰度</span><strong>{fileName ? '92' : '--'}</strong></div><div><span>检测置信度</span><strong>{fileName ? '98.6%' : '--'}</strong></div></div></> : <><label>识别阈值<input className="input" type="number" defaultValue="720" /></label><p className="help-text">在已录入学生人脸库中执行 1:N 检索。</p></>}<Button variant="primary" icon={tab === 'identify' ? Fingerprint : Sparkles} onClick={process}>{tab === 'identify' ? '开始识别' : '开始归一化'}</Button>{result && <div className="result-box"><ShieldCheck size={22} /><div><strong>{result}</strong><p>人脸检测通过，质量指标符合入库要求。</p></div></div>}</div></div>}
      </section>
    </>
  )
}

function FaceStatus() {
  return <div className="status-list"><div><Activity size={20} /><span>模型状态</span><strong className="success-text">运行正常</strong></div><div><Fingerprint size={20} /><span>已录入人脸</span><strong>7 人</strong></div><div><Gauge size={20} /><span>识别阈值</span><strong>720 / 1000</strong></div><div><RefreshCw size={20} /><span>最近更新</span><strong>2026-07-24 14:20</strong></div></div>
}

function Reports() {
  const { notify } = useApp()
  return <><PageHeader title="我的报告" subtitle="查看并下载管理员定向下发给您的报告文件" actions={<Button icon={RefreshCw} onClick={() => notify('报告列表已刷新')}>刷新</Button>} /><section className="panel table-panel report-panel"><div className="table-scroll"><table><thead><tr><th>标题</th><th>说明</th><th>文件名</th><th>大小</th><th>上传人</th><th>下发时间</th><th>操作</th></tr></thead><tbody /></table></div><EmptyState icon={FileText} title="暂无下发给您的报告" description="管理员下发的测试报告会显示在这里" /></section></>
}

function Profile() {
  const { notify } = useApp()
  const [passwords, setPasswords] = useState({ old: '', next: '', confirm: '' })
  function submit(event) { event.preventDefault(); if (!passwords.old || !passwords.next || passwords.next !== passwords.confirm) { notify('请检查密码输入', 'error'); return } setPasswords({ old: '', next: '', confirm: '' }); notify('密码修改成功') }
  return <><PageHeader title="个人中心" subtitle="账号基础信息与密码修改" /><div className="profile-grid"><section className="panel profile-info"><div className="panel-heading"><h2>账号信息</h2></div>{[['用户名', '产品'], ['姓名', '-'], ['工号', '-'], ['单位', '-'], ['学校', '-'], ['区域', '-'], ['联系电话', '-'], ['角色', '区域教育管理层'], ['数据域', '区域级'], ['上次登录', '2026-07-24 14:29:15']].map(([key, value]) => <div key={key}><span>{key}</span><strong>{value}</strong></div>)}</section><section className="panel password-panel"><div className="panel-heading"><h2>修改密码</h2></div><form onSubmit={submit}><label>原密码<input className="input" type="password" value={passwords.old} onChange={(event) => setPasswords({ ...passwords, old: event.target.value })} /></label><label>新密码<input className="input" type="password" value={passwords.next} onChange={(event) => setPasswords({ ...passwords, next: event.target.value })} /></label><label>确认新密码<input className="input" type="password" value={passwords.confirm} onChange={(event) => setPasswords({ ...passwords, confirm: event.target.value })} /></label><Button variant="primary" type="submit">提交修改</Button></form></section></div></>
}

function TrainingPlans() {
  const { notify } = useApp()
  const [plans, setPlans] = useState(() => loadStored('sport-training-plans', initialPlans))
  const [selectedId, setSelectedId] = useState(initialPlans[0].id)
  const [modal, setModal] = useState(false)
  const [query, setQuery] = useState('')
  const selected = plans.find((item) => item.id === selectedId) || plans[0]
  const [form, setForm] = useState({ student: '张书豪', focus: '启动加速与下肢爆发力', cycle: '4 周' })
  const [completed, setCompleted] = useState([true, false, false, false])
  const exercises = ['动态热身与神经激活', '弱侧单腿离心控制', '10m 启动加速跑', '低强度放松与拉伸']
  const filtered = plans.filter((item) => !query || item.student.includes(query) || item.id.includes(query) || item.focus.includes(query))

  useEffect(() => localStorage.setItem('sport-training-plans', JSON.stringify(plans)), [plans])

  function createPlan() {
    const plan = { id: `TP-260724-${String(plans.length + 1).padStart(2, '0')}`, student: form.student, focus: form.focus, cycle: form.cycle, sessions: Number.parseInt(form.cycle, 10) * 3, progress: 0, status: '待开始', risk: '中风险', next: '待排期' }
    setPlans([plan, ...plans]); setSelectedId(plan.id); setModal(false); notify(`已生成 ${form.student} 的训练处方`)
  }

  return (
    <>
      <PageHeader title="训练处方" subtitle="基于学生能力诊断与风险等级制定、跟踪个性化训练方案" actions={<Button variant="primary" icon={Plus} onClick={() => setModal(true)}>生成处方</Button>} />
      <StatStrip items={[
        { label: '处方总数', value: plans.length, unit: '份' },
        { label: '进行中', value: plans.filter((item) => item.status === '进行中').length, unit: '份', color: '#2563eb' },
        { label: '本周训练', value: 9, unit: '次', color: '#7c3aed' },
        { label: '平均完成率', value: 59, unit: '%', color: '#10b981' },
        { label: '待复测', value: 3, unit: '人', color: '#f97316' },
      ]} />
      <div className="training-layout">
        <section className="panel table-panel">
          <div className="panel-heading"><h2>训练处方列表</h2><SearchBox value={query} onChange={setQuery} placeholder="学生/处方编号" /></div>
          <div className="table-scroll"><table><thead><tr><th>编号</th><th>学生</th><th>训练重点</th><th>周期</th><th>进度</th><th>状态</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id} className={`clickable-row ${selectedId === item.id ? 'selected-row' : ''}`} onClick={() => setSelectedId(item.id)}><td className="mono">{item.id}</td><td><b>{item.student}</b><br /><Tag color={item.risk.includes('高') || item.risk.includes('重度') ? 'red' : item.risk.includes('低') ? 'green' : 'orange'}>{item.risk}</Tag></td><td>{item.focus}</td><td>{item.cycle}<small className="cell-note">{item.sessions} 次训练</small></td><td><Progress value={item.progress} /></td><td><Tag color={item.status === '已完成' ? 'green' : item.status === '待开始' ? 'default' : 'blue'}>{item.status}</Tag></td></tr>)}</tbody></table></div>
        </section>
        <aside className="panel plan-detail">
          <div className="panel-heading"><div><h2>{selected.student} · 本周计划</h2><p>{selected.focus}</p></div><Tag color="purple">{selected.cycle}</Tag></div>
          <div className="next-session"><CalendarDays size={22} /><div><span>下次训练</span><strong>{selected.next}</strong></div></div>
          <h3>今日训练清单</h3>
          <div className="exercise-list">{exercises.map((item, index) => <label key={item} className={completed[index] ? 'done' : ''}><input type="checkbox" checked={completed[index]} onChange={() => setCompleted(completed.map((value, itemIndex) => itemIndex === index ? !value : value))} /><span><b>{index + 1}</b></span><div><strong>{item}</strong><small>{index === 0 ? '8 分钟 · RPE 3' : index === 1 ? '3 组 × 8 次 · 间歇 90s' : index === 2 ? '5 组 × 2 次 · 间歇 120s' : '10 分钟 · RPE 2'}</small></div></label>)}</div>
          <Button variant="primary" icon={ClipboardCheck} className="full-button" onClick={() => notify('本次训练记录已保存')}>保存训练记录</Button>
        </aside>
      </div>
      {modal && <Modal title="生成个性化训练处方" onClose={() => setModal(false)} footer={<><Button onClick={() => setModal(false)}>取消</Button><Button variant="primary" icon={Sparkles} onClick={createPlan}>生成处方</Button></>}><div className="form-stack"><label>选择学生<Select value={form.student} onChange={(value) => setForm({ ...form, student: value })}>{students.slice(0, 12).map((item) => <option key={item.id}>{item.name}</option>)}</Select></label><label>训练重点<input className="input" value={form.focus} onChange={(event) => setForm({ ...form, focus: event.target.value })} /></label><label>训练周期<Select value={form.cycle} onChange={(value) => setForm({ ...form, cycle: value })}><option>3 周</option><option>4 周</option><option>6 周</option><option>8 周</option></Select></label><div className="ai-hint"><Sparkles size={20} /><p>系统将结合学生最近 4 次测试、BFI 疲劳度和左右腿不对称率生成动作、组数、强度与复测节点。</p></div></div></Modal>}
    </>
  )
}

function Progress({ value }) {
  return <div className="progress-wrap"><div className="progress-track"><span style={{ width: `${value}%` }} /></div><b>{value}%</b></div>
}

function TestSchedules() {
  const { notify } = useApp()
  const [items, setItems] = useState(() => loadStored('sport-test-schedules', initialSchedules))
  const [filter, setFilter] = useState('全部')
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ title: '阶段体能复测', school: '测试学校', date: '2026-07-28', time: '09:00', venue: '田径场 A 区', students: 60, projects: '30m短跑 / 纵跳' })
  const visible = filter === '全部' ? items : items.filter((item) => item.status === filter)
  const dates = [{ day: '24', week: '今天' }, { day: '25', week: '周六' }, { day: '26', week: '周日' }, { day: '27', week: '周一' }, { day: '28', week: '周二' }, { day: '29', week: '周三' }, { day: '30', week: '周四' }]

  useEffect(() => localStorage.setItem('sport-test-schedules', JSON.stringify(items)), [items])

  function createSchedule() {
    const item = { ...form, id: `SC-${form.date.slice(5).replace('-', '')}-${String(items.length + 1).padStart(2, '0')}`, students: Number(form.students), progress: 0, status: '待开始' }
    setItems([...items, item]); setModal(false); notify('测试计划已创建')
  }

  function advance(id) {
    setItems(items.map((item) => item.id === id ? { ...item, status: item.status === '待开始' ? '进行中' : '已完成', progress: item.status === '待开始' ? 12 : 100 } : item))
    notify('计划状态已更新')
  }

  return (
    <>
      <PageHeader title="测试计划" subtitle="统一安排测试批次、场地、项目与执行进度" actions={<Button variant="primary" icon={Plus} onClick={() => setModal(true)}>新建计划</Button>} />
      <StatStrip items={[
        { label: '本周计划', value: items.length, unit: '场' },
        { label: '待测学生', value: 266, unit: '人', color: '#2563eb' },
        { label: '进行中', value: items.filter((item) => item.status === '进行中').length, unit: '场', color: '#f97316' },
        { label: '场地使用', value: 3, unit: '处', color: '#7c3aed' },
        { label: '本周完成率', value: 38, unit: '%', color: '#10b981' },
      ]} />
      <section className="panel calendar-strip"><div className="panel-heading"><h2>7 月 24 日 - 7 月 30 日</h2><div className="segmented">{['全部', '待开始', '进行中', '已完成'].map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div></div><div className="date-row">{dates.map((item, index) => <button className={index === 0 ? 'active' : ''} key={item.day}><span>{item.week}</span><strong>{item.day}</strong><small>{items.filter((schedule) => schedule.date.endsWith(`-${item.day}`)).length} 场</small></button>)}</div></section>
      <section className="panel schedule-list"><div className="panel-heading"><h2>计划列表</h2><Tag>{visible.length} 场测试</Tag></div>{visible.map((item) => <article key={item.id} className="schedule-item"><div className={`schedule-date status-${item.status}`}><strong>{item.date.slice(8)}</strong><span>{item.date.slice(5, 7)} 月</span></div><div className="schedule-main"><div><h3>{item.title}</h3><Tag color={item.status === '已完成' ? 'green' : item.status === '进行中' ? 'orange' : 'default'}>{item.status}</Tag></div><p>{item.school} · {item.venue} · {item.time}</p><div className="schedule-meta"><span><Users size={15} />{item.students} 人</span><span><Target size={15} />{item.projects}</span><span><BarChart3 size={15} />完成 {item.progress}%</span></div></div><div className="schedule-progress"><Progress value={item.progress} /><Button variant={item.status === '已完成' ? 'default' : 'primary'} onClick={() => item.status === '已完成' ? notify('该计划已归档') : advance(item.id)}>{item.status === '待开始' ? '开始测试' : item.status === '进行中' ? '完成测试' : '查看结果'}</Button></div></article>)}{!visible.length && <EmptyState icon={CalendarDays} title="暂无该状态的测试计划" />}</section>
      {modal && <Modal title="新建测试计划" onClose={() => setModal(false)} footer={<><Button onClick={() => setModal(false)}>取消</Button><Button variant="primary" onClick={createSchedule}>创建计划</Button></>}><div className="form-grid two-cols"><label>计划名称<input className="input" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></label><label>学校<Select value={form.school} onChange={(value) => setForm({ ...form, school: value })}>{schools.slice(1).map((item) => <option key={item}>{item}</option>)}</Select></label><label>测试日期<input className="input" type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} /></label><label>开始时间<input className="input" type="time" value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })} /></label><label>场地<input className="input" value={form.venue} onChange={(event) => setForm({ ...form, venue: event.target.value })} /></label><label>预计人数<input className="input" type="number" value={form.students} onChange={(event) => setForm({ ...form, students: event.target.value })} /></label><label className="full-span">测试项目<input className="input" value={form.projects} onChange={(event) => setForm({ ...form, projects: event.target.value })} /></label></div></Modal>}
    </>
  )
}

function Modal({ title, onClose, children, footer }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="modal" role="dialog" aria-modal="true" aria-label={title}><header><h2>{title}</h2><button className="icon-button" onClick={onClose} title="关闭"><X size={18} /></button></header><div className="modal-body">{children}</div>{footer && <footer>{footer}</footer>}</section></div>
}

export default App

import { useEffect, useMemo, useState } from 'react';
import './App.css';

const API_BASE = 'http://localhost:3000/api/v1';

const Icon = ({ children, className = '' }) => (
  <span className={`icon ${className}`} aria-hidden="true">{children}</span>
);

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [email, setEmail] = useState('manager@farm.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [crops, setCrops] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [cropName, setCropName] = useState('');
  const [plantingDate, setPlantingDate] = useState('2026-11-27');
  const [cropStatus, setCropStatus] = useState('Growing');
  const [activeSection, setActiveSection] = useState('overview');
  const [cropSearch, setCropSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      setToken(data.access_token);
      setUser(data.user);
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const loadDashboardData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [cropsRes, suppliesRes, notifRes] = await Promise.all([
        fetch(`${API_BASE}/crops`, { headers: authHeaders }),
        fetch(`${API_BASE}/supplies`, { headers: authHeaders }),
        fetch(`${API_BASE}/notifications`, { headers: authHeaders }),
      ]);
      if (cropsRes.ok) setCrops(await cropsRes.json());
      if (suppliesRes.ok) setSupplies(await suppliesRes.json());
      if (notifRes.ok) setNotifications(await notifRes.json());
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [token]);

  const handleCreateCrop = async (e) => {
    e.preventDefault();
    if (!cropName.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/crops`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          cropName,
          plantingDate,
          cropStatus,
          userId: user?.userId || 1,
        }),
      });
      if (res.ok) {
        setCropName('');
        await loadDashboardData();
      }
    } finally {
      setSaving(false);
    }
  };

  const filteredCrops = useMemo(() => crops.filter((crop) =>
    (crop.cropName || '').toLowerCase().includes(cropSearch.toLowerCase())
  ), [crops, cropSearch]);

  const healthyCount = crops.filter((crop) =>
    ['healthy', 'growing'].includes((crop.cropStatus || '').toLowerCase())
  ).length;
  const lowStockCount = notifications.length;

  if (!token) {
    return (
      <main className="login-screen">
        <div className="login-art">
          <div className="login-brand"><span className="brand-mark">✳</span><span>Greenfield<span className="brand-light"> Farm</span></span></div>
          <div className="login-message">
            <span className="eyebrow light-eyebrow">FARM OPERATIONS PLATFORM</span>
            <h1>Grow smarter.<br /><em>Harvest better.</em></h1>
            <p>A clear view of your crops, supplies, and day-to-day farm operations — all in one place.</p>
            <div className="login-stats">
              <div><strong>01</strong><span>Monitor crops</span></div>
              <div><strong>02</strong><span>Track inventory</span></div>
              <div><strong>03</strong><span>Stay informed</span></div>
            </div>
          </div>
          <div className="login-footer">A healthier way to manage your farm.</div>
        </div>
        <div className="login-panel">
          <form className="login-form" onSubmit={handleLogin}>
            <div className="mobile-brand"><span className="brand-mark">✳</span> Greenfield Farm</div>
            <span className="eyebrow">WELCOME BACK</span>
            <h2>Sign in to your farm</h2>
            <p className="muted">Enter your account details to continue to your dashboard.</p>
            {error && <div className="alert alert-error"><Icon>!</Icon>{error}</div>}
            <label className="field-label" htmlFor="email">Email address</label>
            <div className="input-wrap"><Icon>✉</Icon><input id="email" type="email" placeholder="you@yourfarm.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <label className="field-label" htmlFor="password">Password</label>
            <div className="input-wrap"><Icon>⌑</Icon><input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
            <button className="btn btn-primary login-submit" type="submit">Sign in <span>→</span></button>
            <div className="secure-note"><Icon>◈</Icon> Secure access to your farm workspace</div>
          </form>
          <div className="login-copyright">© {new Date().getFullYear()} Greenfield Farm Management</div>
        </div>
      </main>
    );
  }

  const navItems = [
    { id: 'overview', icon: '▦', label: 'Overview' },
    { id: 'crops', icon: '❋', label: 'Crop records', count: crops.length },
    { id: 'inventory', icon: '▤', label: 'Inventory', count: supplies.length },
    { id: 'alerts', icon: '♧', label: 'Notifications', count: notifications.length },
  ];

  const navigate = (section) => {
    setActiveSection(section);
    const target = document.getElementById(section === 'overview' ? 'overview' : section);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" onClick={() => navigate('overview')}>
          <span className="brand-mark">✳</span><span>Greenfield<span className="brand-light"> Farm</span></span>
        </a>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item.id} className={`nav-link ${activeSection === item.id ? 'active' : ''}`} onClick={() => navigate(item.id)}>
              <span className="nav-icon">{item.icon}</span><span>{item.label}</span>
              {item.count > 0 && <span className="nav-count">{item.count}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon">✦</div><strong>Growing together</strong><p>Your farm overview, made simple.</p></div>
          <div className="sidebar-user">
            <div className="avatar">{(user?.fullName || 'FM').split(' ').map(x => x[0]).slice(0, 2).join('').toUpperCase()}</div>
            <div className="user-meta"><strong>{user?.fullName || 'Farm Manager'}</strong><span>{user?.role || 'Farm account'}</span></div>
            <button className="icon-button logout-icon" title="Log out" onClick={handleLogout}>↗</button>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>{navItems.find(x => x.id === activeSection)?.label || 'Overview'}</strong></div>
          <div className="topbar-actions">
            <span className="live-indicator"><i /> System connected</span>
            <button className="icon-button refresh-button" onClick={loadDashboardData} title="Refresh data" disabled={loading}>{loading ? '◌' : '↻'}</button>
            <div className="top-user"><div className="avatar small-avatar">{(user?.fullName || 'FM').split(' ').map(x => x[0]).slice(0, 2).join('').toUpperCase()}</div><span>{user?.fullName || 'Farm Manager'}</span></div>
          </div>
        </header>

        <div className="content">
          <section className="welcome-row" id="overview">
            <div><span className="eyebrow">FARM MANAGEMENT</span><h1>Good day, {user?.fullName?.split(' ')[0] || 'there'} <span className="wave">✳</span></h1><p>Here’s what’s happening across your farm today.</p></div>
            <button className="btn btn-outline" onClick={loadDashboardData} disabled={loading}><span className={loading ? 'spin' : ''}>↻</span> {loading ? 'Refreshing…' : 'Refresh overview'}</button>
          </section>

          <section className="stats-grid" aria-label="Farm summary">
            <article className="stat-card"><div className="stat-top"><span className="stat-label">REGISTERED CROPS</span><span className="stat-icon green">❋</span></div><div className="stat-value">{crops.length}</div><div className="stat-foot">Total crop records</div></article>
            <article className="stat-card"><div className="stat-top"><span className="stat-label">ACTIVE CROPS</span><span className="stat-icon mint">⌁</span></div><div className="stat-value">{healthyCount}</div><div className="stat-foot">Growing or healthy</div></article>
            <article className="stat-card"><div className="stat-top"><span className="stat-label">INVENTORY ITEMS</span><span className="stat-icon sand">▤</span></div><div className="stat-value">{supplies.length}</div><div className="stat-foot">Tracked supply records</div></article>
            <article className="stat-card"><div className="stat-top"><span className="stat-label">NOTIFICATIONS</span><span className="stat-icon coral">♧</span></div><div className="stat-value">{lowStockCount}</div><div className="stat-foot">{lowStockCount ? 'Needs your attention' : 'You’re all caught up'}</div></article>
          </section>

          <section className="dashboard-grid">
            <article className="panel add-panel">
              <div className="panel-heading"><div><span className="eyebrow">CROP MANAGEMENT</span><h2>Add a new crop</h2><p>Record a crop in your farm inventory.</p></div><span className="panel-symbol">＋</span></div>
              <form className="crop-form" onSubmit={handleCreateCrop}>
                <label className="field-label" htmlFor="crop-name">Crop name</label>
                <input id="crop-name" className="control" type="text" placeholder="e.g. Sweet corn" value={cropName} onChange={(e) => setCropName(e.target.value)} required />
                <div className="form-row">
                  <div><label className="field-label" htmlFor="planting-date">Planting date</label><input id="planting-date" className="control" type="date" value={plantingDate} onChange={(e) => setPlantingDate(e.target.value)} required /></div>
                  <div><label className="field-label" htmlFor="crop-status">Current status</label><select id="crop-status" className="control" value={cropStatus} onChange={(e) => setCropStatus(e.target.value)}><option value="Growing">Growing</option><option value="Healthy">Healthy</option><option value="Harvested">Harvested</option></select></div>
                </div>
                <button className="btn btn-primary save-button" type="submit" disabled={saving}>{saving ? 'Saving crop…' : '＋  Save crop'}</button>
              </form>
              <div className="form-note"><Icon>ⓘ</Icon> Your crop record will be saved to the farm database.</div>
            </article>

            <article className="panel alerts-panel" id="alerts">
              <div className="panel-heading"><div><span className="eyebrow">STAY INFORMED</span><h2>Notifications <span className="heading-count">{notifications.length}</span></h2><p>Important updates from your farm.</p></div><span className="panel-symbol alert-symbol">♧</span></div>
              {notifications.length === 0 ? <div className="empty-state"><div className="empty-icon">✓</div><strong>All clear for now</strong><p>There are no notifications to review.</p></div> : <div className="alert-list">{notifications.map((n) => <div className="alert-item" key={n.notificationId}><span className="alert-dot" /><div><p>{n.message}</p><span>Farm notification</span></div></div>)}</div>}
            </article>
          </section>

          <section className="panel table-panel" id="crops">
            <div className="table-heading"><div><span className="eyebrow">FIELD OVERVIEW</span><h2>Crop records</h2><p>Review all crops registered in your farm.</p></div><div className="table-tools"><div className="search-box"><Icon>⌕</Icon><input aria-label="Search crops" placeholder="Search crops…" value={cropSearch} onChange={(e) => setCropSearch(e.target.value)} /></div><span className="record-count">{filteredCrops.length} records</span></div></div>
            <div className="table-scroll"><table><thead><tr><th>Crop ID</th><th>Crop name</th><th>Planting date</th><th>Status</th></tr></thead><tbody>
              {filteredCrops.length === 0 ? <tr><td colSpan="4"><div className="table-empty">{crops.length ? 'No crops match your search.' : 'No crop records yet. Add your first crop above.'}</div></td></tr> : filteredCrops.map((c) => <tr key={c.cropId}><td className="id-cell">#{c.cropId}</td><td><div className="crop-name-cell"><span className="crop-avatar">❋</span><strong>{c.cropName}</strong></div></td><td>{formatDate(c.plantingDate)}</td><td><span className={`status-pill ${String(c.cropStatus || '').toLowerCase()}`}>{c.cropStatus}</span></td></tr>)}
            </tbody></table></div>
          </section>

          <section className="panel table-panel inventory-panel" id="inventory">
            <div className="table-heading"><div><span className="eyebrow">SUPPLY MANAGEMENT</span><h2>Inventory overview</h2><p>Keep track of the supplies available on your farm.</p></div><span className="record-count">{supplies.length} items</span></div>
            <div className="table-scroll"><table><thead><tr><th>Supply ID</th><th>Supply name</th><th>Category</th><th>Available quantity</th><th>Minimum stock</th></tr></thead><tbody>
              {supplies.length === 0 ? <tr><td colSpan="5"><div className="table-empty">No inventory records available.</div></td></tr> : supplies.map((s) => <tr key={s.supplyId}><td className="id-cell">#{s.supplyId}</td><td><strong>{s.supplyName}</strong></td><td>{s.supplyType}</td><td><strong>{s.quantity}</strong> <span className="unit-text">{s.unit}</span></td><td>{s.minimumStock} <span className="unit-text">{s.unit}</span></td></tr>)}
            </tbody></table></div>
          </section>
          <footer className="page-footer"><span>✳ Greenfield Farm Management</span><span>Farm operations, in good hands.</span></footer>
        </div>
      </main>
    </div>
  );
}

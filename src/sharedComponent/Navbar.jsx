import React, { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import avatar from '../assets/avatar.png'

const Navbar = () => {
  const { userData } = useContext(UserContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [notifications] = useState(3) 
  const profileRef = useRef(null)
  const navigate = useNavigate()

  
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const avatarSrc = userData?.imagePath
    ? `https://upskilling-egypt.com:3006/${userData.imagePath}`
    : avatar

  return (
    <>
      <style>{`
        .navbar-search-input::placeholder { color: #adb5bd; }
        .navbar-search-input:focus { outline: none; }
        .profile-menu-item:hover { background: #f8f9fa; }
        .notif-btn:hover { background: #f1f3f5; }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .profile-dropdown { animation: fadeDown 0.18s ease; }
      `}</style>

      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 24px',
          background: '#fff',
          borderBottom: '1px solid #f0f2f5',
          gap: 16,
          position: 'sticky',
          top: 0,
          zIndex: 999,
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}
      >
        {/* ── Search Bar ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            maxWidth: 480,
            background: searchFocused ? '#fff' : '#f7f8fa',
            border: `1.5px solid ${searchFocused ? '#198754' : '#eaecef'}`,
            borderRadius: 12,
            padding: '9px 16px',
            gap: 10,
            transition: 'all 0.2s ease',
            boxShadow: searchFocused ? '0 0 0 3px rgba(25,135,84,0.10)' : 'none',
          }}
        >
          {/* Search icon */}
          <svg
            width="16" height="16" fill="none" viewBox="0 0 24 24"
            stroke={searchFocused ? '#198754' : '#adb5bd'} strokeWidth="2.2"
            style={{ flexShrink: 0, transition: 'stroke 0.2s' }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>

          <input
            className="navbar-search-input"
            type="text"
            placeholder="Search recipes, categories, users..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              border: 'none',
              background: 'transparent',
              width: '100%',
              fontSize: '0.875rem',
              color: '#2d2d2d',
              fontFamily: 'inherit',
            }}
          />

          {/* Clear button */}
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                background: '#e9ecef',
                border: 'none',
                borderRadius: '50%',
                width: 20, height: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', flexShrink: 0, padding: 0,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6c757d" strokeWidth="3">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}

          {/* Keyboard shortcut hint */}
          {!searchTerm && !searchFocused && (
            <span style={{
              fontSize: '0.72rem', color: '#ced4da',
              background: '#f1f3f5', borderRadius: 4,
              padding: '2px 6px', flexShrink: 0, fontFamily: 'monospace',
            }}>
              /
            </span>
          )}
        </div>

        {/* ── Right Side ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>

          {/* Notification Bell */}
          <button
            className="notif-btn"
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              borderRadius: 10,
              width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#4b5563" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {notifications > 0 && (
              <span style={{
                position: 'absolute', top: 6, right: 6,
                background: '#ef4444', color: '#fff',
                borderRadius: '50%', width: 16, height: 16,
                fontSize: '0.65rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #fff',
              }}>
                {notifications}
              </span>
            )}
          </button>

          {/* Divider */}
          <div style={{ width: 1, height: 28, background: '#e9ecef', margin: '0 4px' }} />

          {/* Profile Dropdown */}
          <div ref={profileRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setShowProfileMenu(prev => !prev)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: showProfileMenu ? '#f8f9fa' : 'none',
                border: '1px solid',
                borderColor: showProfileMenu ? '#e9ecef' : 'transparent',
                borderRadius: 10, padding: '5px 10px 5px 5px',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              <img
                src={avatarSrc}
                alt="Avatar"
                style={{
                  width: 34, height: 34,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #198754',
                }}
              />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a1a2e', lineHeight: 1.2 }}>
                  {userData?.userName || 'User'}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#9198a1', lineHeight: 1.2 }}>
                  {userData?.userGroup || ''}
                </div>
              </div>
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="#9198a1" strokeWidth="2.5"
                style={{ transform: showProfileMenu ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Dropdown */}
            {showProfileMenu && (
              <div
                className="profile-dropdown"
                style={{
                  position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                  background: '#fff', border: '1px solid #e9ecef',
                  borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                  minWidth: 200, overflow: 'hidden', zIndex: 200,
                }}
              >
                {/* User Info Header */}
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f2f5' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1a1a2e' }}>
                    {userData?.userName}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#9198a1', marginTop: 2 }}>
                    {userData?.userEmail}
                  </div>
                </div>

                {/* Menu Items */}
                {[
                  { icon: 'fa-user', label: 'My Profile', action: () => navigate('/dashboard/profile') },
                  { icon: 'fa-key', label: 'Change Password', action: () => navigate('/dashboard/change-password') },
                ].map((item, i) => (
                  <button
                    key={i}
                    className="profile-menu-item"
                    onClick={() => { item.action(); setShowProfileMenu(false) }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      width: '100%', padding: '10px 16px',
                      background: 'none', border: 'none',
                      cursor: 'pointer', fontSize: '0.875rem', color: '#2d2d2d',
                      transition: 'background 0.1s',
                    }}
                  >
                    <i className={`fa ${item.icon} text-muted`} style={{ width: 16, fontSize: 13 }}></i>
                    {item.label}
                  </button>
                ))}

                <div style={{ height: 1, background: '#f0f2f5', margin: '4px 0' }} />

                {/* Logout */}
                <button
                  className="profile-menu-item"
                  onClick={logOut}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    width: '100%', padding: '10px 16px',
                    background: 'none', border: 'none',
                    cursor: 'pointer', fontSize: '0.875rem', color: '#ef4444',
                    transition: 'background 0.1s',
                  }}
                >
                  <i className="fa fa-sign-out-alt" style={{ width: 16, fontSize: 13 }}></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
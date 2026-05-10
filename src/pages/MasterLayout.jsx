import React, { useState, useEffect } from 'react'
import Navbar from '../sharedComponent/Navbar'
import { Outlet } from 'react-router-dom'
import SideBar from '../sharedComponent/SideBar'

const MasterLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [mobileOpen, setMobileOpen] = useState(false)

  // detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) setMobileOpen(false) // close drawer when going back to desktop
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // sidebar width logic
  const sidebarWidth = isMobile ? 0 : isCollapsed ? 80 : 250

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>

      {/* ── Mobile overlay backdrop ── */}
      {isMobile && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.45)',
            zIndex: 999,
          }}
        />
      )}

      {/* ── Sidebar ── */}
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          height: '100vh',
          zIndex: 1000,
          // on mobile: slide in/out; on desktop: always visible
          transform: isMobile
            ? mobileOpen ? 'translateX(0)' : 'translateX(-100%)'
            : 'translateX(0)',
          transition: 'transform 0.3s ease',
        }}
      >
        <SideBar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobile={isMobile}
          onClose={() => setMobileOpen(false)}
        />
      </div>

      {/* ── Main Content ── */}
      <div
        style={{
          marginLeft: sidebarWidth,
          width: '100%',
          minWidth: 0,
          transition: 'margin-left 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Navbar
          isMobile={isMobile}
          onMenuClick={() => setMobileOpen(prev => !prev)}
        />
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default MasterLayout
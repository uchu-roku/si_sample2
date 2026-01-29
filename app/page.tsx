'use client'

import { useState } from 'react'

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div id="app" className="flex flex-col h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Header */}
      <header className="border-b transition-colors duration-200" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              🌲
            </div>
            <div>
              <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>森林管理ツール</h1>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Forest Management System</p>
            </div>
          </div>
          <nav className="flex items-center gap-1">
            <button 
              className="px-3 py-2 text-sm rounded-lg transition-colors duration-200"
              style={{ color: 'var(--color-text-secondary)', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-secondary)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              ヘルプ
            </button>
            <button 
              className="px-3 py-2 text-sm rounded-lg transition-colors duration-200"
              style={{ color: 'var(--color-text-secondary)', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-secondary)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              設定
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden">
        {/* Map Container */}
        <div id="map" className="flex-1 relative overflow-hidden" style={{ backgroundColor: '#f0f0f0' }}>
          <div className="flex h-full items-center justify-center" style={{ color: 'var(--color-text-tertiary)' }}>
            <div className="text-center">
              <p className="text-lg font-medium mb-2">地図表示エリア</p>
              <p className="text-sm">GeoTIFF または Shapefile をインポートして表示</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside 
          id="side" 
          className="transition-all duration-300 overflow-hidden flex flex-col"
          style={{
            width: sidebarCollapsed ? '0' : '380px',
            borderLeft: `1px solid var(--color-border)`,
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Layer Import Section */}
            <section className="card p-5 space-y-4">
              <div className="border-b pb-3" style={{ borderColor: 'var(--color-border)' }}>
                <h3 className="text-sm font-semibold tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
                  データインポート
                </h3>
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                  地理空間データを読み込みます
                </p>
              </div>

              {/* GeoTIFF Dropzone */}
              <div
                id="dropGeo"
                className="cursor-pointer p-4 rounded-lg border-2 border-dashed transition-all duration-200"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-surface-secondary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)'
                  e.currentTarget.style.backgroundColor = '#f5f5f5'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  e.currentTarget.style.backgroundColor = 'var(--color-surface-secondary)'
                }}
              >
                <div className="space-y-3 text-center">
                  <div>
                    <p className="font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>
                      GeoTIFF
                    </p>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    .tif / .tiff ファイルをドロップまたはクリック
                  </p>
                  <input id="geotiffInput" type="file" accept=".tif,.tiff" hidden />
                  <button
                    className="btn-secondary w-full"
                    onClick={() => document.getElementById('geotiffInput')?.click()}
                  >
                    ファイルを選択
                  </button>
                </div>
                <div className="progress mt-3 h-1 w-full overflow-hidden rounded-full hidden" style={{ backgroundColor: 'var(--color-border)' }}>
                  <div 
                    className="bar h-full w-0 transition-all duration-300"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  ></div>
                </div>
              </div>

              {/* Shapefile Dropzone */}
              <div
                id="dropShp"
                className="cursor-pointer p-4 rounded-lg border-2 border-dashed transition-all duration-200"
                style={{
                  borderColor: 'var(--color-border)',
                  backgroundColor: 'var(--color-surface-secondary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)'
                  e.currentTarget.style.backgroundColor = '#f5f5f5'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  e.currentTarget.style.backgroundColor = 'var(--color-surface-secondary)'
                }}
              >
                <div className="space-y-3 text-center">
                  <div>
                    <p className="font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>
                      Shapefile
                    </p>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    .zip ファイルをドロップまたはクリック
                  </p>
                  <input id="shpZipInput" type="file" accept=".zip" hidden />
                  <button
                    className="btn-secondary w-full"
                    onClick={() => document.getElementById('shpZipInput')?.click()}
                  >
                    ファイルを選択
                  </button>
                </div>
                <div className="progress mt-3 h-1 w-full overflow-hidden rounded-full hidden" style={{ backgroundColor: 'var(--color-border)' }}>
                  <div 
                    className="bar h-full w-0 transition-all duration-300"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  ></div>
                </div>
              </div>
            </section>

            {/* Maintenance Section */}
            <section className="card p-5 space-y-3">
              <div className="border-b pb-3" style={{ borderColor: 'var(--color-border)' }}>
                <h3 className="text-sm font-semibold tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
                  メンテナンス
                </h3>
              </div>
              <button
                id="btnClearLocal"
                className="w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-white"
                style={{ backgroundColor: 'var(--color-error)' }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                ローカルデータをクリア
              </button>
            </section>
          </div>
        </aside>

        {/* Collapse Button */}
        <button
          id="btnCollapse"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute right-0 top-20 z-10 px-2 py-2 rounded-l-lg transition-all duration-300"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderLeft: `1px solid var(--color-border)`,
            borderTop: `1px solid var(--color-border)`,
            borderBottom: `1px solid var(--color-border)`,
            color: 'var(--color-text-secondary)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-secondary)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface)')}
          aria-label={sidebarCollapsed ? "パネルを展開" : "パネルを折りたたむ"}
        >
          <span className="text-lg">{sidebarCollapsed ? '⟨' : '⟩'}</span>
        </button>
      </main>

      {/* Status Bar */}
      <div 
        id="statusbar" 
        className="border-t flex items-center px-6 py-3 text-xs gap-6"
        style={{
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text-secondary)',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="font-medium">スケール:</span>
          <span id="st-scale" style={{ color: 'var(--color-text-primary)' }}>1:—</span>
        </div>
        <div className="h-4 w-px" style={{ backgroundColor: 'var(--color-border)' }}></div>
        <div className="flex items-center gap-2">
          <span className="font-medium">座標参照系:</span>
          <span id="st-crs" style={{ color: 'var(--color-text-primary)' }}>—</span>
        </div>
        <div className="h-4 w-px" style={{ backgroundColor: 'var(--color-border)' }}></div>
        <div className="flex items-center gap-2">
          <span className="font-medium">位置:</span>
          <span id="st-xy" style={{ color: 'var(--color-text-primary)' }}>X: —, Y: —</span>
        </div>
      </div>

      {/* Hotkey Help Toast */}
      <div 
        id="hotkeyHelp" 
        className="fixed bottom-6 left-6 hidden rounded-lg border p-3 shadow-lg text-xs"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          color: 'var(--color-text-secondary)',
        }}
      >
        <p className="font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>キーボードショートカット</p>
        <div className="space-y-1">
          <p><span className="font-semibold">O</span>: ファイルを開く</p>
          <p><span className="font-semibold">L</span>: レイヤ表示</p>
          <p><span className="font-semibold">E</span>: データ出力</p>
          <p><span className="font-semibold">Del</span>: 削除</p>
          <p><span className="font-semibold">?</span>: このヘルプ</p>
        </div>
      </div>

      {/* Loading Overlay */}
      <div
        id="busy"
        className="fixed inset-0 hidden place-items-center z-50"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        aria-live="polite"
        aria-busy="true"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 animate-spin" style={{ borderColor: 'rgba(255, 255, 255, 0.2)', borderTopColor: 'white' }}></div>
          <p className="text-sm font-medium text-white">データを処理中…</p>
        </div>
      </div>
    </div>
  )
}

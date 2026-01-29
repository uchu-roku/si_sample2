'use client'

export default function Home() {
  return (
    <div id="app" className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <h1 className="px-6 py-4 text-2xl font-bold text-gray-900">森林管理ツール</h1>
      </header>
      <main className="relative flex h-[calc(100vh-80px)]">
        {/* Map Container */}
        <div id="map" className="flex-1 bg-gray-50">
          <div className="flex h-full items-center justify-center text-gray-500">
            <p>地図を表示するエリア</p>
          </div>
        </div>

        {/* Collapse Button */}
        <div className="pointer-events-none absolute right-0 top-4">
          <button
            id="btnCollapse"
            className="pointer-events-auto rounded-l-lg border border-r-0 border-gray-300 bg-white p-2 text-gray-600 hover:bg-gray-50"
            aria-label="サイドパネルを折りたたむ"
          >
            ⟩
          </button>
        </div>

        {/* Right Sidebar */}
        <aside id="side" className="w-80 space-y-4 overflow-y-auto border-l border-gray-200 bg-white p-4">
          {/* Layer Import Section */}
          <section className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
            <div className="border-b border-gray-200 pb-3">
              <h3 className="font-semibold text-gray-900">レイヤ読込</h3>
            </div>

            {/* GeoTIFF Dropzone */}
            <div
              id="dropGeo"
              className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-blue-500 hover:bg-blue-50"
            >
              <div className="space-y-2">
                <strong className="block text-gray-900">GeoTIFF</strong>
                <small className="block text-gray-600">.tif / .tiff をドロップ or クリック</small>
                <input id="geotiffInput" type="file" accept=".tif,.tiff" hidden />
                <button
                  className="inline-block rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
                  onClick={() => document.getElementById('geotiffInput')?.click()}
                >
                  ファイルの選択
                </button>
              </div>
              <div className="progress mt-2 hidden h-1 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="bar h-full w-0 bg-blue-500" style={{ width: '0%' }}></div>
              </div>
            </div>

            {/* Shapefile Dropzone */}
            <div
              id="dropShp"
              className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-blue-500 hover:bg-blue-50"
            >
              <div className="space-y-2">
                <strong className="block text-gray-900">Shapefile (ZIP)</strong>
                <small className="block text-gray-600">.zip をドロップ or クリック</small>
                <input id="shpZipInput" type="file" accept=".zip" hidden />
                <button
                  className="inline-block rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
                  onClick={() => document.getElementById('shpZipInput')?.click()}
                >
                  ファイルの選択
                </button>
              </div>
              <div className="progress mt-2 hidden h-1 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="bar h-full w-0 bg-blue-500" style={{ width: '0%' }}></div>
              </div>
            </div>
          </section>

          {/* Maintenance Section */}
          <section className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
            <div className="border-b border-gray-200 pb-3">
              <h3 className="font-semibold text-gray-900">メンテナンス</h3>
            </div>
            <button
              id="btnClearLocal"
              className="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              ローカルデータをクリア
            </button>
          </section>
        </aside>
      </main>

      {/* Hotkey Help Toast */}
      <div id="hotkeyHelp" className="toast fixed bottom-20 left-6 hidden rounded-lg border border-gray-300 bg-white p-3 shadow-lg">
        O:開く / L:レイヤ / E:出力 / Delete:削除 / ?:このヘルプ
      </div>

      {/* Status Bar */}
      <div id="statusbar" className="status flex border-t border-gray-200 bg-white p-3 text-sm text-gray-700">
        <span id="st-scale" className="border-r border-gray-300 px-4">
          1:—
        </span>
        <span id="st-crs" className="border-r border-gray-300 px-4">
          CRS: —
        </span>
        <span id="st-xy" className="px-4">
          X: — , Y: —
        </span>
      </div>

      {/* Loading Overlay */}
      <div
        id="busy"
        className="fixed inset-0 hidden place-items-center bg-black/35 backdrop-blur-sm"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
          <p className="mt-3 text-sm text-white drop-shadow-lg">画像を処理中…</p>
        </div>
      </div>
    </div>
  )
}

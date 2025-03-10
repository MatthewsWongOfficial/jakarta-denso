export default function Loading() {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 z-50">
        <div className="relative w-24 h-24 mb-4">
          {/* Car silhouette */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-16 h-16 text-blue-600" fill="currentColor">
              <path d="M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z" />
            </svg>
          </div>
  
          {/* Water drops animation */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full flex justify-center">
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-[dropFall_1.5s_ease-in_infinite]"></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-[dropFall_1.5s_ease-in_infinite_0.3s]"></div>
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-[dropFall_1.5s_ease-in_infinite_0.6s]"></div>
          </div>
        </div>
  
        <h2 className="text-xl font-semibold text-blue-900">Memuat Halaman...</h2>
        <p className="mt-1 text-gray-600 text-sm">Jakarta Intl Denso Cirebon</p>
  
        {/* Progress bar */}
        <div className="w-48 h-1.5 bg-gray-200 rounded-full mt-4 overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full animate-[progress_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    )
  }
  
  
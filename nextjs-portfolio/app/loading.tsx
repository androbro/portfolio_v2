export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="h-16 w-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-white text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
} 
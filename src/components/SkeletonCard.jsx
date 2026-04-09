export default function SkeletonCard() {
  return (
    <div className="rounded-lg overflow-hidden bg-gray-900">
      {/* Poster placeholder */}
      <div className="w-full aspect-[2/3] skeleton" />
      {/* Info placeholder */}
      <div className="p-2 space-y-1.5">
        <div className="h-3 skeleton rounded w-4/5" />
        <div className="h-2.5 skeleton rounded w-2/5" />
      </div>
    </div>
  );
}

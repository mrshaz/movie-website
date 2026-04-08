export default function ErrorMessage({ message = 'Something went wrong.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-3 text-center px-4">
      <div className="text-5xl">⚠️</div>
      <p className="text-red-400 text-lg font-semibold">Oops!</p>
      <p className="text-gray-400 max-w-sm">{message}</p>
    </div>
  );
}

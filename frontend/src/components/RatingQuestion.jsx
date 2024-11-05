export function RatingQuestion({ field, value, onChange }) {
    return (
        <div className="space-y-2">
            <label className="text-lg font-medium text-white">{field}</label>
            <div className="flex gap-2">
                {[...Array(10)].map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => onChange(i + 1)}
                        className={`w-8 h-8 rounded-full ${value === i + 1
                            ? 'bg-blue-500 text-white'
                            : 'bg-white/20 hover:bg-white/30 text-white'
                            } transition-colors`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

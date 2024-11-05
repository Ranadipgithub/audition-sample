import { RatingQuestion } from './RatingQuestion';

export function QuestionRenderer({ question, value, onChange }) {
    switch (question.type) {
        case 'text':
            return (
                <div className="space-y-2">
                    <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 
                     focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="Your answer..."
                    />
                </div>
            );

        case 'textarea':
            return (
                <textarea
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 
                   focus:outline-none focus:border-blue-500 transition-colors min-h-[150px]"
                    placeholder="Your answer..."
                />
            );

        case 'radio':
            return (
                <div className="space-y-3">
                    {question.options?.map((option) => (
                        <label key={option} className="flex items-center space-x-3 cursor-pointer">
                            <div className="relative">
                                <input
                                    type="radio"
                                    value={option}
                                    checked={value === option}
                                    onChange={(e) => onChange(e.target.value)}
                                    className="appearance-none w-5 h-5 border-2 border-white/20 rounded-full 
                           checked:border-blue-500 checked:bg-blue-500 transition-colors"
                                />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                              w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100" />
                            </div>
                            <span className="text-white">{option}</span>
                        </label>
                    ))}
                </div>
            );

        case 'checkbox':
            return (
                <div className="space-y-3">
                    {question.options?.map((option) => (
                        <label key={option} className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={(value || []).includes(option)}
                                onChange={(e) => {
                                    const currentValue = value || [];
                                    onChange(
                                        e.target.checked
                                            ? [...currentValue, option]
                                            : currentValue.filter(v => v !== option)
                                    );
                                }}
                                className="w-5 h-5 rounded border-2 border-white/20 checked:bg-blue-500 
                         checked:border-blue-500 transition-colors"
                            />
                            <span className="text-white">{option}</span>
                        </label>
                    ))}
                </div>
            );

        case 'rating':
            return (
                <div className="space-y-4">
                    {question.fields?.map((field) => (
                        <RatingQuestion
                            key={field}
                            field={field}
                            value={
                                (value || []).find((v) => v.name === field)?.value || 0
                            }
                            onChange={(rating) => {
                                const currentValue = value || [];
                                const fieldIndex = currentValue.findIndex(
                                    (v) => v.name === field
                                );
                                if (fieldIndex >= 0) {
                                    const newValue = [...currentValue];
                                    newValue[fieldIndex] = { name: field, value: rating };
                                    onChange(newValue);
                                } else {
                                    onChange([...currentValue, { name: field, value: rating }]);
                                }
                            }}
                        />
                    ))}
                </div>
            );
        default:
            return null;
    }
}

interface Vocabulary {
  hanzi: string;
  pinyin: string;
  mongolian: string;
}

interface Props {
  vocabulary: Vocabulary[];
  title: string;
}

export default function VocabularyGrid({ vocabulary, title }: Props) {
  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
      <h3 className="font-semibold mb-3 text-lg">📝 {title} Vocabulary</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {vocabulary.map((word, idx) => (
          <div key={idx} className="bg-white p-3 rounded border border-gray-200 shadow-sm text-center">
            <div className="text-2xl font-bold mb-1">{word.hanzi}</div>
            <div className="text-sm text-blue-600 mb-1">{word.pinyin}</div>
            <div className="text-xs text-gray-700">{word.mongolian}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

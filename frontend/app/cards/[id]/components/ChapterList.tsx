interface Chapter {
  id: number;
  title: string;
  date: string;
  comments: number;
  video?: string;
}

interface Props {
  chapters: Chapter[];
  onChapterClick: (ch: Chapter) => void;
}

export default function ChapterList({ chapters, onChapterClick }: Props) {
  return (
    <div className="mt-6 bg-[#1c1c1c] rounded-xl overflow-hidden">
      {chapters.map((ch) => (
        <div
          key={ch.id}
          onClick={() => onChapterClick(ch)}
          className="px-5 py-4 border-b border-gray-700 hover:bg-[#2a2a2a] cursor-pointer"
        >
          <p className="text-gray-400 text-sm">#{ch.id} · {ch.date}</p>
          <p className="text-white">{ch.title}</p>
          <p className="text-gray-500 text-xs">💬 {ch.comments}</p>
        </div>
      ))}
    </div>
  );
}

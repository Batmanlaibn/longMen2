interface Props {
  icon: string;
  video: string | null;
}

export default function VideoSection({ icon, video }: Props) {
  return (
    <div className="bg-black rounded-xl overflow-hidden">
      {video ? (
        <video controls src={video} className="w-full" />
      ) : (
        <div className="bg-white p-12 flex justify-center">
          <span className="text-8xl">{icon}</span>
        </div>
      )}
    </div>
  );
}

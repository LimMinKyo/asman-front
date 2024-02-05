interface Props {
  year: string;
  onClickPrev: () => void;
  onClickNext: () => void;
}

export default function YearPicker({ year, onClickPrev, onClickNext }: Props) {
  return (
    <div className="font-bold text-xl flex items-center gap-4">
      <button onClick={onClickPrev}>&larr;</button>
      <div className="flex gap-2">
        <div>{year}년</div>
      </div>
      <button onClick={onClickNext}>&rarr;</button>
    </div>
  );
}

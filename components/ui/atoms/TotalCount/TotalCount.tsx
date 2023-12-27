export default function TotalCount({
  totalCount = 0,
}: {
  totalCount?: number;
}) {
  return (
    <div>
      총 <span className="font-bold text-lg px-1">{totalCount}</span> 개
    </div>
  );
}

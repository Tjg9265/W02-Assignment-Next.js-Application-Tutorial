export function Card({ title, value }: any) {
  return (
    <div className="border p-4 rounded">
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  );
}
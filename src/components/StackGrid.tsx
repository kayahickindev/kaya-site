import { BrandLogo } from "./BrandLogo";
type GroupedItem = {
  category: string;
  items: { name: string; category: string }[];
};
export function StackGrid({ grouped }: { grouped: GroupedItem[] }) {
  return (
    <div className="stack-grid">
      {grouped.map((g) => (
        <section className="stack-group" key={g.category}>
          <h2>{g.category}</h2>
          <ul>
            {g.items.map((item) => (
              <li key={item.name}>
                <BrandLogo name={item.name} size={24} />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

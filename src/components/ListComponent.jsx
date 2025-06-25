export default function ListComponent({ items, renderItem }) {
  if (!items.length) {
    return <p className="status-msg">😕 No users found.</p>;
  }

  return (
    <ul className="list-container">
      {items.map((item, index) => (
        <li key={item.id || index} className="list-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

import { Menu } from 'features/layout';
import { useWindowDimensions } from 'hooks';

export const Sidebar = () => {
  const { width } = useWindowDimensions();

  if (width <= 768) {
    return null;
  }

  return (
    <aside className="sidebar">
      <Menu />
    </aside>
  );
};
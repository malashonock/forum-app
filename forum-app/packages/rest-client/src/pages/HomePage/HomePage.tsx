import { DesktopSidebar, LeftMenu, Main, RightMenu } from './components';

import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="home-container">
      <DesktopSidebar />
      <LeftMenu />
      <Main />
      <RightMenu />
    </div>
  );
};

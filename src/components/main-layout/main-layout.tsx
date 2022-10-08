import { PropsWithChildren } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';

function MainLayout({children}: PropsWithChildren): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;

import s from './app.module.scss';
import { checkWebpSupport } from '@cv/helpers';
import MobileAppLanding from './pages/landings/mobile-app/mobile-app-landing';


checkWebpSupport();

export function App() {
  return (
    <>
      <MobileAppLanding />
    </>
  );
}

export default App;

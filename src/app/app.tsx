import s from './app.module.scss';
import { checkWebpSupport } from '@cv/helpers';


checkWebpSupport();

export function App() {
  return (
    <>
      <div className={s.app} />
    </>
  );
}

export default App;

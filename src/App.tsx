import { ArrowUpRight, FlaskConical, Heart } from 'lucide-react';
import Hero, { Header } from './components/Hero';
import Laboratory from './components/Laboratory';
import Experiments from './components/Experiments';
import Missions from './components/Missions';
import House from './components/House';
import Quiz from './components/Quiz';
import { useMissions } from './hooks/useMissions';

export default function App() {
  const { completed, complete, celebrate } = useMissions();
  return <><a className="skip-link" href="#labor">Direkt zum Experimentierlabor</a><Header completed={completed.length} /><main><Hero /><Laboratory completed={completed} onMission={complete} /><Experiments /><Missions completed={completed} celebrate={celebrate} /><House /><Quiz /></main>
    <footer className="site-footer"><div className="page-width footer-content"><div><a className="brand" href="#top"><span className="brand-mark"><FlaskConical size={19} /></span><span>Web<span className="brand-light">Lab</span><span className="brand-dot">.</span></span></a><p>Das Web verstehen. Eine Ebene nach der anderen.</p></div><span className="footer-note">Mit <Heart size={12} /> für neugierige Köpfe.</span><a href="#labor">Noch ein Experiment? <ArrowUpRight size={15} /></a></div></footer>
  </>;
}

import { Button, ButtonGroup } from '@mui/material';
import { useEffect } from 'react';
import Code from '../components/code';

const codes = [
  { title: '1. Installation', code: `npm install lesca-sensor-motion --save`, type: 'text' },
  {
    title: '2. create Motion class',
    code: `import Motion from 'lesca-sensor-motion'
	

const motion = new Motion();`,
    type: 'javascript',
  },
  {
    title: '3. add permission on click event',
    code: `motion
  .permission()
  .then(() => {
    // permission granted
  })
  .catch((e) => {
    // permission deined
  });`,
    type: 'javascript',
  },
  {
    title: '4. add event listener',
    code: `motion.addEventListener(20, (e) => {
  // get user shaking gravity value
});`,
    type: 'javascript',
  },
  {
    title: 'full demo in react component',
    code: `const Demo = () => {
  const [state, setState] = useState(false);	  
  const motion = useMemo(() => new Motion(), []);
	  
  const require_permission = () => {
    motion
      .permission()
      .then(() => {
        // permission granted
        setState(true);
      })
      .catch((e) => {
        // permission deined
      });
  };
	  
  useEffect(() => {
    // require permission
    if (state) {
      motion.addEventListener(20, (e) => {
        // get user shaking gravity value
      });
    }
    return () => {
      motion.destory();
    };
  }, [state]);
	  
  return (
    <button onClick={require_permission}>permission require</button>
  );
};`,
    type: 'javascript',
  },
];

const Usage = () => {
  useEffect(() => {}, []);
  return (
    <div className='Usage'>
      <h2>Usage</h2>

      {codes.map((e) => (
        <div key={e.title}>
          <h3>{e.title}</h3>
          <Code code={e.code} theme={e.type} />
        </div>
      ))}
    </div>
  );
};
export default Usage;

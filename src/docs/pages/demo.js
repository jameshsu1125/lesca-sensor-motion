import { Button, ButtonGroup } from '@mui/material';
import { useEffect, useMemo, useState, useRef } from 'react';
import Motion from '../../lib/index';
import Qrcode from 'lesca-react-qrcode';

const Demo = () => {
  const [state, setState] = useState(false);
  const [message, setMessage] = useState('waitting for permission...');

  const motion = useMemo(() => new Motion(), []);
  const ballRef = useRef();
  const [size, setSize] = useState(10);

  const require_permission = () => {
    motion
      .permission()
      .then(() => {
        // permission granted
        setMessage('permission granted');
        setState(true);
      })
      .catch((e) => {
        // permission deined
        console.log(e);
        setMessage('permission deined');
      });
  };

  const disable_switch = () => {
    motion.disable = !motion.disable;
    setMessage(motion.disable ? 'disable' : 'enable');
  };

  useEffect(() => {
    // require permission
    if (state) {
      motion.addEventListener(20, (e) => {
        // get user shaking gravity value
        setMessage(`detect motion = ${e}`);
        setSize((s) => s + e);
      });
    }
    return () => {
      motion.destory();
    };
  }, [state]);

  return (
    <>
      <h2>Demo</h2>
      <div className='stage'>
        <div ref={ballRef} className='ball' style={{ width: `${size}px`, height: `${size}px` }} />
      </div>
      <pre>
        <code>{message}</code>
      </pre>

      <ButtonGroup variant='contained'>
        <Button onClick={require_permission}>permission require</Button>
        {state && <Button onClick={disable_switch}>permission disable switch</Button>}
      </ButtonGroup>
    </>
  );
};
export default Demo;

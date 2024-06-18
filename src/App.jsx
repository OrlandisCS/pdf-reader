import { useEffect, useState } from 'react';
import PDFReader from './components/PDFReader';
import './css/App.css'

function App() {
const [document, setDocument] = useState(null);
const [visible, setVisible] = useState(false);

useEffect(() => {
  setDocument('/2.pdf');
}, []);
  return (
    <>
          <button className='border' onClick={()=>setVisible(!visible)}>{!visible ?'Ver pdf':'Cerrar pdf'}</button>
    <div className='flex items-center justify-center w-full'>
          {visible && document && <PDFReader document={document} />}
      </div>
    </>
  )
}

export default App

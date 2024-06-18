  import  { useState } from 'react';
  import Loader from './Loader';
  import { Document, Page, pdfjs } from 'react-pdf';
  import ControlPanel from './ControlPanel';
  import PropTypes from 'prop-types';
  
  
  pdfjs.GlobalWorkerOptions.workerSrc ='/pfd-lib-require.js'
  const PDFReader = ({document=null}) => {
   
    const [scale, setScale] = useState(1.0);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
      setIsLoading(false);
    }
  
    return (document&&
      <div>
        <Loader isLoading={isLoading} />

        <section
          id="pdf-section"
          className="d-flex flex-column align-items-center w-100"
        
        >
          <ControlPanel
            scale={scale}
            setScale={setScale}
            numPages={numPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            file={document}
            document={document}
          />
          <Document
          fullScreen={true}
            file={document}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} scale={scale} />
          </Document>
        </section>
      </div>
    );
  };
 PDFReader.propTypes = {
      document: PropTypes.string,
    };
  export default PDFReader;

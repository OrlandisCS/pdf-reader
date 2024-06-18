import PDFPrinter from './PDFPrinter';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { RiZoomInLine, RiZoomOutLine } from 'react-icons/ri';
import { IoMdDownload } from 'react-icons/io';
import PropTypes from 'prop-types';

const ControlPanel = ({file, pageNumber, numPages, setPageNumber, scale, setScale, document=null}) => {
  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;

  const goToFirstPage = () => {
    if (!isFirstPage) setPageNumber(1);
  };
  const goToPreviousPage = () => {
    if (!isFirstPage) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (!isLastPage) setPageNumber(pageNumber + 1);
  };
  const goToLastPage = () => {
    if (!isLastPage) setPageNumber(numPages);
  };

  const onPageChange = (e) => {
    const { value } = e.target;
    if(value > numPages|| value < 0|| value == '') return;
    setPageNumber(Number(value));
  };

  const isMinZoom = scale < 0.6;
  const isMaxZoom = scale >= 2.0;

  const zoomOutClass = isMinZoom ? 'disabled' : 'clickable';
  const zoomInClass = isMaxZoom ? 'disabled' : 'clickable';

  const zoomOut = () => {
    if (!isMinZoom) setScale(scale - 0.1);
  };

  const zoomIn = () => {
    if (!isMaxZoom) setScale(scale + 0.1);
  };

  return (
    <div className="bg-white rounded-md m-3 p-3 flex items-center justify-between" >
      <div className="flex items-center justify-between">
        <FaAngleDoubleLeft 
          className={`cursor-pointer mx-3 ${isFirstPage ? 'text-gray-300' : 'text-gray-800'}`}
          onClick={goToFirstPage}
        />
        <FaAngleLeft 
          className={`cursor-pointer mx-3 ${isFirstPage ? 'text-gray-300' : 'text-gray-800'}`}
          onClick={goToPreviousPage}
        />
        <span>
          Pagina{' '}
          <input
            name="pageNumber"
            type="number"
            min={1}
            max={numPages || 1}
            className="p-0 pl-1 mx-2 border"
            value={pageNumber}
            onChange={onPageChange}
          />{' '}
          de {numPages}
        </span>
        <FaAngleRight 
          className={`cursor-pointer mx-3 ${isLastPage ? 'text-gray-300' : 'text-gray-800'}`}
          onClick={goToNextPage}
        />
        <FaAngleDoubleRight 
          className={`cursor-pointer mx-3 $${isLastPage ? 'text-gray-300' : 'text-gray-800'}`}
          onClick={goToLastPage}
        />
      </div>
      <div className="flex justify-between items-center">
        <RiZoomOutLine
          className={`cursor-pointer mx-3 ${zoomOutClass}`}
          onClick={zoomOut}
        />
        <span>{(scale * 100).toFixed()}%</span>
        <RiZoomInLine 
          className={`cursor-pointer  mx-3 ${zoomInClass}`}
          onClick={zoomIn}
        />
      </div>
      {
        document && <div className="mx-3">
        <a href={document} download={true} title="Descargar">
          <IoMdDownload className="clickable text-xl" />
        </a>
      </div>
      }
     
      <div className="mx-3">
        <PDFPrinter file={file} />
      </div>
    </div>
  );
};

 ControlPanel.propTypes = {
    file: PropTypes.string.isRequired,
    pageNumber: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired,
    setPageNumber: PropTypes.func.isRequired,
    scale: PropTypes.number.isRequired,
    setScale: PropTypes.func.isRequired,
    document: PropTypes.string,
  };

export default ControlPanel;

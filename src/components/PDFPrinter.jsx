import { AiOutlinePrinter } from 'react-icons/ai';
import PropTypes from 'prop-types';

const PDFPrinter = ({ file }) => {
  const print = () => {
    const pdfFrame = document.createElement('iframe');
    pdfFrame.style.visibility = 'hidden';
    pdfFrame.src = file;

    document.body.appendChild(pdfFrame);

    pdfFrame.contentWindow.focus();
    pdfFrame.contentWindow.print();
  };
  return (
    <AiOutlinePrinter className="text-xl clickable cursor-pointer" onClick={print} title="Imprimir" />
  );
};

PDFPrinter.propTypes = {
  file: PropTypes.string.isRequired,
};

export default PDFPrinter;

import React from 'react';
import { FaInfo, FaWindowClose } from 'react-icons/fa';
import { useService } from '../../context/ServiceContext';

interface WindowProps {
  action?: () => void;
  button?: string;
  text?: string;
  description?: string;
  href?: string;
  icon?: React.ReactNode;
  tittle?: string;
  image?: string;
  onButtonClick?: () => void;
  showMoreInfo?: boolean;
  moreInfo?: boolean;
  setMoreInfo?: (value: boolean) => void;
}

export const Window: React.FC<WindowProps> = ({
  action,
  text,
  button,
  href,
  tittle,
  description,
  onButtonClick,
  showMoreInfo,
  icon,
  moreInfo,
  setMoreInfo,
}) => {
  const { changeService } = useService();

  const toggleMoreInfo = () => {
    if (setMoreInfo && typeof moreInfo === 'boolean') {
      setMoreInfo(!moreInfo);
    }
  };

  return (
    <div className='window'>
      <br />
      <FaWindowClose
        className='icon'
        style={{ float: 'right', paddingRight: '20px' }}
        onClick={() => changeService(0)}
      />
      <h1 className='title'>{tittle}</h1>

      {icon && (
        <span className='icon' onClick={() => changeService(0)}>
          {icon}
        </span>
      )}

      <p className='paragraph'>{text}</p>

      {showMoreInfo && (
        <a onClick={toggleMoreInfo} className='icon'>
          <FaInfo />
          <br />
          {moreInfo ? 'Menos Información' : 'Más Información'}
        </a>
      )}

      {showMoreInfo && moreInfo && (
        <p className='paragraph'>{description}</p>
      )}
    </div>
  );
};

import { title } from 'process'
import React from 'react'
import { useService } from '../../context/ServiceContext'
import { FaAppleAlt,  FaFutbol, FaHeart, FaMusic, FaPaintBrush, FaSpa, FaUser, FaUserMd, FaUsers, FaWindowClose } from 'react-icons/fa';

interface WindowProps {
  action?: () => void,
  button?: string,
  description?: string,
  href?: string,
  icon?: ()=>void,
  tittle?: string,
  image?: string,
}

export const Window: React.FC<WindowProps> = ({ action, button, href, tittle, description }) => {

  const { service, changeService } = useService();

  const Icons = () => {
    switch (service) {
      case 0:
        return null ;
      case 1:
        return  <FaSpa className='icon' onClick={() => changeService(0)} />;
      case 2:
        return  <FaUserMd className='icon' onClick={() => changeService(0)} />;
      case 3:
        return  <FaAppleAlt className='icon' onClick={() => changeService(0)} />;
      case 4:
        return  <FaUsers className='icon' onClick={() => changeService(0)} />;
      case 5:
        return  <FaHeart className='icon' onClick={() => changeService(0)} />;
      case 6:
        return  <FaUser className='icon' onClick={() => changeService(0)} />;
      case 7:
        return  <FaFutbol className='icon' onClick={() => changeService(0)} />;
      case 8:
        return  <FaPaintBrush className='icon' onClick={() => changeService(0)} />;
      case 9:
        return  <FaMusic className='icon' onClick={() => changeService(0)} />;
      default:
        return null;
    }
  };

  return (

      <div className='window'>
        <br />
        <FaWindowClose className='icon' style={{float:'right', paddingRight:'20px'}} onClick={() => changeService(0)} />
        <h1 className='title'>{tittle}</h1>
       <Icons/>
        <p className="paragraph">
          {description}
        </p>
        <a href={href} onClick={action} className="windowbutton">{button}</a>
        <br />
        <br />
      </div>

  )
}

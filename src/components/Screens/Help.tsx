import React from 'react'
import { FaInfoCircle, FaQuestionCircle } from 'react-icons/fa'
import { useFeed } from '../../context/FeedContext'

export const Help = () => {

    const {feed, changeFeed}=useFeed();

  return (
    <section className='section'>
    <div>

    <h1 className='title'>Ayuda</h1>

    <p className='paragraph'>¿Tienes alguna duda o sugerencia? </p>
    <p className='paragraph'>Contactános. </p>


    <a className='icon fade-in-element' title='Contacto' onClick={()=>changeFeed(6)}>
          <FaQuestionCircle className='icon' />,
            <p className='button'>Ayuda</p>
          </a>
          
    </div>
    </section>
  )
}

import React from 'react'
import { FaHeart } from 'react-icons/fa'

export const Help = () => {

  return (
    <section className='section'>
      <div>

        <h1 className='title'>Ayuda</h1>

        <br />

        <p className='paragraph'>Gracias por formar parte de   </p>

        <div className='item'>
          <img className='img' src={require('../../assets/logo-09.png')} />
          <p>24 horas</p>
        </div>


        <br />
        <p className='paragraph'>Tu ayuda contribuye a la recuperación de nuestros usuarios y de miles de familias{'\n'} que logran vivir una nueva vida .   </p>

        <br />
        <br />

        <a className='icon fade-in-element' href='https://wa.me/529624304734' title='Contacto' >
          <p className='paragraph'>Quiero Ayudar </p>
          <FaHeart className='button' />
          <br />
          <br />
        </a>

      </div>
    </section>
  )
}

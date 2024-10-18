import React from "react";
import '../../App.css';
import { useTheme } from "../../context/ThemeContext";

export const Offer=()=>{

    const {theme, changeTheme}=useTheme();

    return(

        <section>
            <div>
                
            <h1 className={theme==2?'titleRed':'title'}>Servicios</h1>
     
            </div>
        </section>
    )
}
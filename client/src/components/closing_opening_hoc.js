import React from 'react';

const ClosingOpening = (Component) => {
    const closeUserView2 = () => {
        document.querySelector('.userView1').classList.remove('viewHide');
        document.querySelector('.userView2').classList.remove('userView2Open');
    }
    const openUserView2= () => {
        document.querySelector('.userView1').classList.add('viewHide');
        document.querySelector('.userView2').classList.add('userView2Open');
    }
    const upgradedComponent = () => {
        return(
            <Component
                openUserView2={openUserView2}
                closeUserView2={closeUserView2}
             />
        )
        
    }
    return upgradedComponent;
}
 
export default ClosingOpening;
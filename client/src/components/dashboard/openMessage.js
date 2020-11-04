import React from 'react';

const OpenMessage = () => {
    const closeUserView2 = () => {
        document.querySelector('.userView1').classList.remove('viewHide');
        document.querySelector('.userView2').classList.remove('userView2Open');
    }
    return ( 
        <>
            <div className='chatHeader'>
                    <i className='fa fa-angle-left' onClick={closeUserView2}></i>

            </div>
        </>
     );
}
 
export default OpenMessage;
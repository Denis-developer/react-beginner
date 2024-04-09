import React from 'react';
import './index.scss';

function Modal({ toggleModal, children }) {
    return (
        <div className="modal">
            <svg height="200" viewBox="0 0 200 200" width="200" onClick={toggleModal}>
                <title />
                <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
            </svg>
            <img src="https://media2.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif" />
            {children}
        </div>
    )
}

function App() {

    const [modal, setModal] = React.useState(false);

    const toggleModal = () => {
        setModal(!modal);
    }

    return (
        <div className="App">
            <button className="open-modal-btn" onClick={toggleModal}>✨ Открыть окно</button>
            <div className={`overlay animated ${modal ? "show" : null}`}>
                <Modal toggleModal={toggleModal}>
                    {/* <h2>Hello World!!!</h2> */}
                </Modal>
            </div>
        </div >
    );
}

export default App;

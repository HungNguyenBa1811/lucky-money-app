import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import Gift from './Gift';

Modal.setAppElement('#root');
const customStyles = {
    content: {
        backgroundColor: '#09090b',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '900px',
        height: '700px',
        transform: 'translate(-50%, -50%)',
    },
};

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getRandomNumber(n) {
    return Math.floor(Math.random() * n);
}

function App() {
    const [currentPool, setCurrentPool] = useState(shuffleArray(['1st', '2nd', 'other', 'other', 'other']));
    const [currentPrize, setCurrentPrize] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);

    const buttonRef = useRef();

    function handleOpenModal() {
        setIsOpen(true);
        if (currentPool.length === 0) {
            setCurrentPrize('No Item :(');
            buttonRef.current.disabled = true;
            return;
        }
        const randIndex = getRandomNumber(currentPool.length);
        const ans = currentPool[randIndex];
        setCurrentPrize(ans);
        setCurrentPool((prev) => {
            prev.splice(randIndex, 1);
            console.log(prev);
            return shuffleArray(prev);
        });
        console.log(ans);
    }

    function handleCloseModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        if(currentPool.length === 0) buttonRef.current.disabled = true
    }, [currentPool])

    return (
        <div>
            <div className={'btn-wrapper'}>
                <button ref={buttonRef} onClick={handleOpenModal} className={'btn-roll'}>
                    Roll
                </button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                style={customStyles}
                overlayClassName={'Overlay'}
            >
                <div className={'modal-wrapper'}>
                    <button onClick={handleCloseModal} className={'close-btn'}>
                        <p>x</p>
                    </button>
                    <Gift labelText={currentPrize} />
                </div>
            </Modal>
        </div>
    );
}

export default App;

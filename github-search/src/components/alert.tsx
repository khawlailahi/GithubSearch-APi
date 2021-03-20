import React, { FC } from 'react';
import './Alert.css';
interface AlertProps {
    message: string;
    onClose: () => void
}

const Alert: FC<AlertProps> = ({ message, onClose }) => {
    return (
        <div className="container">
            <div className="background" onClick={onClose}></div>
            <div className="card">
                <header className="header">
                    <p className="message">{message}</p>
                </header>
                <footer className="footer" style={{ justifyContent: 'center' }}>
                    <button className="button" onClick={onClose}>Close</button>
                </footer>
            </div>
        </div>
    );
}

export default Alert;

import React, { useRef, useEffect, useState } from 'react';
import Icon from '../icons/Icon';

interface ApprovalModalProps {
    onClose: () => void;
    onApprove: (signatureDataUrl: string) => void;
}

const ApprovalModal: React.FC<ApprovalModalProps> = ({ onClose, onApprove }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasSigned, setHasSigned] = useState(false);

    const getCanvasContext = () => {
        return canvasRef.current?.getContext('2d');
    };

    useEffect(() => {
        const context = getCanvasContext();
        if (context) {
            context.strokeStyle = "#334155"; // slate-700
            context.lineWidth = 2;
            context.lineCap = "round";
            context.lineJoin = "round";
        }
    }, []);

    const startDrawing = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const context = getCanvasContext();
        if (context) {
            const { offsetX, offsetY } = getCoordinates(event);
            context.beginPath();
            context.moveTo(offsetX, offsetY);
            setIsDrawing(true);
            setHasSigned(true);
        }
    };

    const draw = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const context = getCanvasContext();
        if (context) {
            const { offsetX, offsetY } = getCoordinates(event);
            context.lineTo(offsetX, offsetY);
            context.stroke();
        }
    };

    const stopDrawing = () => {
        const context = getCanvasContext();
        if (context) {
            context.closePath();
            setIsDrawing(false);
        }
    };
    
    const getCoordinates = (event: any) => {
        const canvas = canvasRef.current;
        if (!canvas) return { offsetX: 0, offsetY: 0 };
        const rect = canvas.getBoundingClientRect();
        if (event.nativeEvent.touches) {
            return {
                offsetX: event.nativeEvent.touches[0].clientX - rect.left,
                offsetY: event.nativeEvent.touches[0].clientY - rect.top
            };
        }
        return { offsetX: event.nativeEvent.offsetX, offsetY: event.nativeEvent.offsetY };
    }

    const clearCanvas = () => {
        const context = getCanvasContext();
        if (context && canvasRef.current) {
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            setHasSigned(false);
        }
    };

    const handleApproveClick = () => {
        if (!hasSigned) {
            alert("Por favor, proporciona tu firma antes de aprobar.");
            return;
        }
        const signature = canvasRef.current?.toDataURL('image/png');
        if (signature) {
            onApprove(signature);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-slate-800">Aprobar Propuesta</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><Icon name="X" /></button>
                </div>
                <p className="text-slate-600 mb-6">Por favor, proporciona tus datos y firma para aprobar esta propuesta.</p>
                
                <div className="space-y-4">
                    <input type="text" placeholder="Tu Nombre" className="w-full p-2 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"/>
                    <input type="text" placeholder="Tu Cargo" className="w-full p-2 border border-slate-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"/>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Firma</label>
                        <canvas
                            ref={canvasRef}
                            width="400"
                            height="150"
                            className="border border-slate-300 rounded-md cursor-crosshair w-full"
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                        />
                        <button onClick={clearCanvas} className="text-sm text-slate-500 hover:text-slate-800 mt-1">Limpiar Firma</button>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button 
                        onClick={handleApproveClick} 
                        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors"
                    >
                        Apruebo esta Propuesta
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApprovalModal;
import React from 'react'
import { createPortal } from 'react-dom'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1050,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#1e1e2f',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal

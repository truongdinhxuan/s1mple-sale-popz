// useRenderBox.tsx
import React, {useState, useEffect} from 'react';

export const useRenderBox = (currentPosition = 'bottom-left') => {
  const [selectedPosition, setSelectedPosition] = useState();
  useEffect(() => {
    setSelectedPosition(currentPosition);
  }, [currentPosition]);
  const renderBox = (positionKey, style) => {
    const isSelected = selectedPosition === positionKey;
    const borderColor = isSelected ? '#5c6ac4' : '#dfe3e8';
    const blockColor = isSelected ? '#5c6ac4' : '#c4cdd5';

    return (
      <div
        key={positionKey}
        onClick={() => {
          setSelectedPosition(positionKey);
          if (style.onClick) {
            style.onClick();
          }
        }}
        style={{
          width: '110px',
          height: '60px',
          background: '#f4f6f8',
          borderRadius: '6px',
          border: `2px solid ${borderColor}`,
          position: 'relative',
          cursor: 'pointer',
          transition: 'border-color 0.2s'
        }}
      >
        <div
          style={{
            width: '40px',
            height: '25px',
            background: blockColor,
            position: 'absolute',
            ...style
          }}
        />
      </div>
    );
  };

  return {
    selectedPosition,
    renderBox,
    setSelectedPosition
  };
};

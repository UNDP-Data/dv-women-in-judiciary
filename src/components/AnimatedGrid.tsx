import React, { useState, useEffect } from 'react';

type ShapeType =
  | 'square'
  | 'circle'
  | 'quarterCircle1'
  | 'quarterCircle2'
  | 'quarterCircle3'
  | 'quarterCircle4'
  | 'halfCircle1'
  | 'halfCircle2'
  | 'halfCircle3'
  | 'halfCircle4'
  | 'twoCorners1'
  | 'twoCorners2'
  | 'twoCorners3'
  | 'twoCorners4';
interface Shape {
  id: number;
  type: ShapeType;
  color: string;
}

const AnimatedShapeGrid: React.FC = () => {
  const shapeTypes: ShapeType[] = [
    'square',
    'circle',
    'quarterCircle1',
    'quarterCircle2',
    'quarterCircle3',
    'quarterCircle4',
    'halfCircle1',
    'halfCircle2',
    'halfCircle3',
    'halfCircle4',
    'twoCorners1',
    'twoCorners2',
    'twoCorners3',
    'twoCorners4',
  ];

  const colors: string[] = [
    'bg-primary-gray-700',
    'bg-primary-gray-200',
    'bg-[#24B677]',
    'bg-[#296DDF]',
    'bg-[#8D8DFF]',
    'bg-[#F96445]',
  ];

  const [shapes, setShapes] = useState<Shape[]>(() =>
    Array(12)
      .fill(null)
      .map((_, i) => ({
        id: i,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      })),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setShapes(prev =>
        prev.map(shape => ({
          ...shape,
          type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        })),
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const getShapeClasses = (type: ShapeType): string => {
    switch (type) {
      case 'square':
        return 'rounded-none';
      case 'quarterCircle1':
        return 'rounded-tl-full';
      case 'circle':
        return 'rounded-full';
      case 'quarterCircle2':
        return 'rounded-tr-full';
      case 'quarterCircle3':
        return 'rounded-bl-full';
      case 'quarterCircle4':
        return 'rounded-br-full';
      case 'halfCircle1':
        return 'rounded-t-full';
      case 'halfCircle2':
        return 'rounded-b-full';
      case 'halfCircle3':
        return 'rounded-l-full';
      case 'halfCircle4':
        return 'rounded-r-full';
      case 'twoCorners1':
        return 'rounded-tl-full rounded-tr-full';
      case 'twoCorners2':
        return 'rounded-bl-full rounded-br-full';
      case 'twoCorners3':
        return 'rounded-tl-full rounded-bl-full';
      case 'twoCorners4':
        return 'rounded-tr-full rounded-br-full';
      default:
        return 'rounded-none';
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='grid grid-cols-4 grid-rows-3 gap-0 w-full max-w-4xl aspect-[4/3]'>
        {shapes.map(shape => (
          <div
            key={shape.id}
            className={`
              relative overflow-hidden transition-none
              ${shape.color}
              ${getShapeClasses(shape.type)}
            `}
            style={{
              aspectRatio: '1/1',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedShapeGrid;

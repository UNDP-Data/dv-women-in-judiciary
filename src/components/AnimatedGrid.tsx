import React, { useState, useEffect } from 'react';

type ShapeType =
  | 'circle'
  | 'circleInset'
  | 'quarterCircle1'
  | 'quarterCircle2'
  | 'quarterCircle3'
  | 'quarterCircle4'
  | 'halfCircle1';

type FillType = 'solid' | 'gradient';

interface Shape {
  id: number;
  type: ShapeType;
  color: string;
  fill: FillType;
}

const AnimatedShapeGrid: React.FC = () => {
  const shapeTypes: ShapeType[] = [
    'circleInset',
    'quarterCircle1',
    'quarterCircle2',
    'quarterCircle3',
    'quarterCircle4',
    'halfCircle1',
  ];

  const colors = [
    '#F7F7F7',
    '#F7F7F7',
    '#296DDF',
    '#082557',
    '#F96445',
    '#F8C2D2',
    '#F8C2D2',
  ];
  const randomFill = (): FillType => (Math.random() < 1 ? 'gradient' : 'solid');

  const [shapes, setShapes] = useState<Shape[]>(() =>
    Array(12)
      .fill(null)
      .map((_, i) => ({
        id: i,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        fill: randomFill(),
      })),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setShapes(prev =>
        prev.map(shape => ({
          ...shape,
          type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          fill: randomFill(),
        })),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getShapeClasses = (type: ShapeType): string => {
    switch (type) {
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
      default:
        return 'rounded-tr-full';
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='grid grid-cols-4 grid-rows-3 gap-0 w-full max-w-4xl aspect-[4/3] overflow-hidden'>
        {shapes.map(shape => (
          <div
            key={shape.id}
            className='relative flex items-center justify-center overflow-hidden'
            style={{ aspectRatio: '1 / 1' }}
          >
            {shape.type === 'circleInset' ? (
              <div
                className='rounded-full'
                style={{
                  width: '45%',
                  height: '45%',
                  background:
                    shape.fill === 'gradient'
                      ? `linear-gradient(
              135deg,
              ${shape.color} 0%,
              ${shape.color}00 100%
            )`
                      : shape.color,
                }}
              />
            ) : (
              <div
                className={`
      absolute inset-0
      ${getShapeClasses(shape.type)}
    `}
                style={{
                  background:
                    shape.fill === 'gradient'
                      ? `linear-gradient(
              135deg,
              ${shape.color} 0%,
              ${shape.color}00 100%
            )`
                      : shape.color,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedShapeGrid;

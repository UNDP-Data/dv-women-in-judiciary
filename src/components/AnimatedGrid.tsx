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

const SHAPE_TYPES: ShapeType[] = [
  'circleInset',
  'quarterCircle1',
  'quarterCircle2',
  'quarterCircle3',
  'quarterCircle4',
  'halfCircle1',
];

const COLORS = [
  '#F7F7F7',
  '#F7F7F7',
  '#F7F7F7',
  '#04BAAB',
  '#296DDF',
  '#F96445',
  '#934DB0',
];
const AnimatedShapeGrid = () => {
  const COLS = window.innerWidth > 1024 ? 8 : 4;
  const ROWS = window.innerWidth > 1024 ? 6 : 3;
  const CELL_COUNT = COLS * ROWS;

  const randomFill = (): FillType => (Math.random() < 1 ? 'gradient' : 'solid');

  const [shapes, setShapes] = useState<Shape[]>(() =>
    Array(CELL_COUNT)
      .fill(null)
      .map((_, i) => ({
        id: i,
        type: SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        fill: randomFill(),
      })),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setShapes(prev =>
        prev.map(shape => ({
          ...shape,
          type: SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)],
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          fill: randomFill(),
        })),
      );
    }, 1500);

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
      <div
        className='grid gap-0 w-full max-w-4xl aspect-[4/3] overflow-hidden'
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
        }}
      >
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
                      ? `linear-gradient(135deg, ${shape.color} 0%, ${shape.color}00 100%)`
                      : shape.color,
                }}
              />
            ) : (
              <div
                className={`absolute inset-0 ${getShapeClasses(shape.type)}`}
                style={{
                  background:
                    shape.fill === 'gradient'
                      ? `linear-gradient(135deg, ${shape.color} 0%, ${shape.color}00 100%)`
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

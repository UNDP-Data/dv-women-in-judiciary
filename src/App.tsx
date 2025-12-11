/* eslint-disable no-irregular-whitespace */
import { Link } from '@tanstack/react-router';
import { Button } from '@undp/design-system-react/Button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@undp/design-system-react/Card';
import { H1, H2, H4 } from '@undp/design-system-react/Typography';
import { ChevronDown } from 'lucide-react';
import { useEffect } from 'react';

const cards = [
  {
    id: 2,
    tag: 'Analytics',
    title: 'Worldwide Data',
    description:
      'Dive deep into data on gender representation in the judiciary worldwide.',
    link: 'Explore data',
    route: '/data-explorer',
    glowColor: 'glow-warm',
  },
  {
    id: 3,
    tag: 'Regional',
    title: 'Country Insights',
    description:
      'Explore trends and patterns on judicial gender representation across countries.',
    link: 'View insights',
    route: '/country-insights',
    glowColor: 'glow-purple',
  },
  {
    id: 4,
    tag: 'Resources',
    title: 'Resources',
    description:
      'Access reports, research papers, and additional materials about women in judiciary systems globally.',
    link: 'Access resources',
    route: '/resources',
    glowColor: 'glow-blue',
  },
];

function App() {
  useEffect(() => {
    const canvas = document.getElementById('canvas')! as HTMLCanvasElement;
    const noiseCanvas = document.getElementById('noise')! as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    const noiseCtx = noiseCanvas.getContext('2d')!;

    let w = (canvas.width = noiseCanvas.width = window.innerWidth);
    let h = (canvas.height = noiseCanvas.height = window.innerHeight);

    let mouseX = w / 2;
    let targetLeftScale = 1;
    let targetRightScale = 1;
    let currentLeftScale = 1;
    let currentRightScale = 1;

    const ease = 0.08;

    function createNoise() {
      const imageData = noiseCtx.createImageData(w, h);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        data[i] = noise;
        data[i + 1] = noise;
        data[i + 2] = noise;
        data[i + 3] = 255;
      }

      noiseCtx.putImageData(imageData, 0, 0);
    }

    function drawCircle(
      x: number,
      y: number,
      radius: number,
      gradient: string[],
    ) {
      ctx.filter = 'blur(40px)';
      const grd = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grd.addColorStop(0, gradient[0]);
      grd.addColorStop(1, gradient[1]);

      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    function animate() {
      currentLeftScale += (targetLeftScale - currentLeftScale) * ease;
      currentRightScale += (targetRightScale - currentRightScale) * ease;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);

      const baseRadius = Math.min(w, h) * 0.6;

      drawCircle(w * 0.3, h * 0.2, baseRadius * currentLeftScale, [
        'rgba(255, 122, 82, 1)',
        'rgba(255, 180, 100, 1)',
      ]);

      drawCircle(w * 0.7, h * 0.7, baseRadius * currentRightScale, [
        'rgba(140, 100, 220)',
        'rgba(220, 150, 200)',
      ]);

      requestAnimationFrame(animate);
    }

    const handleResize = () => {
      w = canvas.width = noiseCanvas.width = window.innerWidth;
      h = canvas.height = noiseCanvas.height = window.innerHeight;
      createNoise();
    };

    const handleMouseMove = (e: { clientX: number }) => {
      mouseX = e.clientX;
      const normalizedX = (mouseX / w) * 2 - 1;

      if (normalizedX < 0) {
        targetLeftScale = 1 + Math.abs(normalizedX) * 0.6;
        targetRightScale = 1 - Math.abs(normalizedX) * 0.5;
      } else {
        targetLeftScale = 1 - normalizedX * 0.5;
        targetRightScale = 1 + normalizedX * 0.6;
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);

    createNoise();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <div className='min-h-[calc(100vh-115px)] flex flex-col justify-between'>
        <div className='relative flex-1 flex flex-col justify-center min-h-[500px] sm:min-h-[500px]'>
          <canvas id='canvas' className='absolute top-0 left-0 h-full -z-10' />
          <canvas
            id='noise'
            className='absolute top-0 left-0 h-full -z-10 opacity-20'
          />
          <div className='px-6 sm:px-36 w-[70%]'>
            <H1 className='font-heading text-[1.8rem] sm:text-[4.25rem]! mb-10! leading-[1.1] text-primary-gray-700'>
              Women in Judiciary
            </H1>
            <H4 className='text-primary-gray-700 pb-16! mb-0! leading-[1.4]'>
              Explore comprehensive data on gender representation in judicial
              positions worldwide.
            </H4>
            <div className='rounded-full bg-[var(--gray-700)] p-2 w-fit'>
              <ChevronDown stroke='white' />
            </div>
          </div>
        </div>
      </div>
      <div className='py-16 px-4 sm:px-16 mx-auto max-w-[1980px]'>
        <div className='grid grid-cols-1 sm:grid-cols-4 gap-6'>
          <H2>Key Findings</H2>
          <div className='sm:col-span-3 rounded-[8px] h-[300px] bg-primary-gray-200 w-full flex items-center justify-center text-primary-gray-500'>
            Placeholder for content
          </div>
        </div>
      </div>
      <div className='py-16 px-4 sm:px-16 min-h-[400px] mx-auto max-w-[1980px]'>
        <div className='grid grid-cols-1 sm:grid-cols-4 gap-6 h-[400px]'>
          <H2>What You Can Explore</H2>
          {cards.map(card => (
            <div key={card.id} className='flex justify-between h-full'>
              <Card
                backgroundColor='gray'
                size='full'
                variant='without-image'
                className={`rounded-[8px] border-none hover:bg-primary-gray-200 h-full py-4 relative overflow-hidden glow-hover ${card.glowColor}`}
              >
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button padding='none' variant='link'>
                    <Link to={card.route}>{card.link}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

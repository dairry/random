import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
} from 'react';

const slotWidth = 103;
const results = [];
let number = [];
const calculateShift = (amount: number, index: number): string => {
  const isOdd = amount % 2 > 0;
  const slotsAverage = isOdd ? Math.ceil(amount / 2) : amount / 2;
  const shiftFactor = isOdd ? slotsAverage - index : slotsAverage - index + 0.5;
  return `${shiftFactor * slotWidth}px`;
};

export type SlotProps = {
  amount?: number;
  index?: number;
  num?: number | null; // 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;
  tick?: number; // 3 | 4 | 5 | 6;
  onSetResults: Function;
};

const Slot: FunctionComponent<SlotProps> = ({
  amount = 1,
  index = 1,
  num = null,
  tick = 3,
  onSetResults,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const radius = useRef<number>(0);
  const rotateSlot = useCallback(index => {
    const angle = -36 * index;
    if (ref?.current) {
      ref.current.style.transform = `translateZ(-${radius.current}px) rotateX(${angle}deg)`;
    }
  }, []);
  const style =
    amount > 1
      ? {
          style: {
            transform: `translateX(${calculateShift(amount, index)})`,
          },
        }
      : null;

  useEffect(() => {
    let check = num;
    if (ref?.current) {
      setTimeout(() => {
        if (ref?.current?.style) {
          ref.current.style.transition = `transform .${tick}s`;
        }

        if (num === null) {
          console.log(num + ' bye bye');
          rotateSlot(0);
        } else {
          const maxCount = num + 10;
          const speed = tick * 100 + 30;
          let selectedIndex = 0;
          const interval = setInterval(() => {
            // tslint:disable-next-line:no-increment-decrement
            rotateSlot(++selectedIndex);
            check = num + 10;
            if (selectedIndex === maxCount) {
              clearInterval(interval);
            }
          }, speed);
          number.push(check);

          if (number.length == amount) {
            let result = 0;
            number.forEach((value, index) => {
              result += value * Math.pow(10, amount - (index + 1));
            });
            results.push(result);
            number = [];
          }
        }
      }, 1200);
      onSetResults(results);
    }
  }, [num, rotateSlot, tick]);
  console.log('day la so:' + num);
  useEffect(() => {
    if (amount > 1 && ref?.current?.parentNode) {
      setTimeout(
        () =>
          (ref.current.parentNode as HTMLDivElement).removeAttribute('style'),
        100
      );
    }
  }, [amount]);

  useEffect(() => {
    radius.current = Math.round(
      ref?.current?.offsetHeight / 2 / Math.tan(Math.PI / 10)
    );
  }, []);

  return (
    <div>
      <div className="slot-wrapper" {...style}>
        <div className="slot" ref={ref}>
          {[...Array(10).keys()].map(key => (
            <div key={key} className="slot__cell">
              {key}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slot;

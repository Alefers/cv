import React, {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import s from './slider.module.scss';
import Swipe from 'react-easy-swipe';
import { cn } from '@repo/helpers';


export interface UISliderProps {
  children: ReactNode[];
  controlsType?: 'sides' | 'below' | 'none' | 'both';
  firstSlide?: number;
  items?: number;
  swipeBy?: number;
  offset?: number;
  updateOnResize?: boolean;
}

enum StepTypes {
  prev = 'prev',
  next = 'next',
}

const Slider = (
  {
    children,
    controlsType = 'sides',
    firstSlide = 0,
    items = 3,
    swipeBy = 1,
    offset = 0,
  }: UISliderProps
) => {
  const [sliderItems, setSliderItems] = useState<ReactNode[]>([]);
  const [stepSize, setStepSize] = useState(0);
  const [activeIndex, setActiveIndex] = useState(firstSlide);
  const [currentSize, setCurrentSize] = useState(0);
  const [maxMinStep, setSteps] = useState({ max: 0, min: 0 });
  const sliderContentWrapper = useRef<HTMLDivElement>(null);
  const sliderWrapper = useRef<HTMLDivElement>(null);

  const [sliderWidth, setWidth] = useState<number | null>(null);

  const runUpdate = () => {
    if (sliderWrapper.current) {
      setWidth(sliderWrapper.current.offsetWidth);
    }
  };

  useLayoutEffect(() => {
    runUpdate();

    const nawWrapperObserver = new ResizeObserver(runUpdate);
    if (sliderWrapper.current) {
      nawWrapperObserver.observe(sliderWrapper.current);
    }

    return () => {
      nawWrapperObserver.disconnect();
    };
  }, [sliderWrapper.current]);

  const positionSlide = (size: number, index: number) => {
    setCurrentSize(size * (- index + offset));
  }

  useMemo(() => {
    setSliderItems(React.Children.toArray(children));
  }, [children]);

  useEffect(() => {
    setActiveIndex(firstSlide);
    if (stepSize) {
      positionSlide(stepSize, firstSlide);
    }
  }, [firstSlide]);

  const stepDisabled = (type: StepTypes): boolean => {
    if (type === StepTypes.next) {
      return !(activeIndex < maxMinStep.max)
    }
    if (type === StepTypes.prev) {
      return !(activeIndex > maxMinStep.min);
    }
    return false;
  };

  const nextPage = useCallback(() => {
    if (activeIndex < maxMinStep.max) {
      const swipedSlides = (activeIndex + swipeBy) > maxMinStep.max ? maxMinStep.max : activeIndex + swipeBy;
      setActiveIndex(swipedSlides);
      positionSlide(stepSize, swipedSlides);
    }
  }, [activeIndex, swipeBy, maxMinStep]);

  const prevPage = useCallback(() => {
    if (activeIndex > maxMinStep.min) {
      const swipedSlides = (activeIndex - swipeBy) < maxMinStep.min ? maxMinStep.min : activeIndex - swipeBy;
      setActiveIndex(swipedSlides);
      positionSlide(stepSize, swipedSlides);
    }
  }, [activeIndex, swipeBy, maxMinStep]);

  const controlClick = (index: number) => {
    setActiveIndex(index);
    positionSlide(stepSize, index);
  }

  useEffect(() => {
    if (sliderContentWrapper.current) {
      sliderContentWrapper.current.style.transform = `translateX(${currentSize}px)`;
    }
  }, [currentSize]);

  const itemsCount = sliderItems.length;

  useLayoutEffect(() => {
    if (itemsCount && sliderContentWrapper.current) {
      const sections = sliderContentWrapper.current.querySelectorAll('[data-slider]');
      let clientSize = 0;
      if (sections.length) {
        clientSize = sections[0].clientWidth;
        setStepSize(clientSize);
        setSteps({
          min: 0,
          max: sections.length - 1,
        });
      }
      positionSlide(clientSize, activeIndex);
    }
  }, [sliderContentWrapper.current, itemsCount, sliderWidth]);

  const calcSlideVisibility = (index: number) =>
    index >= activeIndex - offset && index < (activeIndex + items - offset);

  return (
    <div className={cn([
      'slider',
      s.slider,
    ])}>
      <div className={s.wrapper} ref={sliderWrapper}>
        <Swipe
          onSwipeLeft={nextPage}
          onSwipeRight={prevPage}
          tolerance={15}
          allowMouseEvents
          style={{maxWidth: stepSize * items}}
        >
          <div className={s.content} ref={sliderContentWrapper}>
            {sliderItems.map((child, index) =>
              <div
                data-slider={index}
                className={cn([
                  s.item,
                  'slider__slide',
                  activeIndex === index && 'slider__slide--slide',
                  calcSlideVisibility(index) && s.visible,
                ])}
                key={index}>
                {child}
              </div>
            )}
          </div>
        </Swipe>
      </div>
      {(controlsType === 'sides' || controlsType === 'both') &&
        <>
          <button
            onClick={nextPage}
            className={cn([
              s.sideControl,
              s.next,
            ])}
            disabled={stepDisabled(StepTypes.next)}
          >
            next
          </button>
          <button
            onClick={prevPage}
            className={cn([
              s.sideControl,
              s.prev,
            ])}
            disabled={stepDisabled(StepTypes.prev)}
          >
            prev
          </button>
        </>
      }
      {(controlsType === 'below' || controlsType === 'both') &&
        <div className={s.bottomControls}>
          {sliderItems.map((sliderItem, sIdx) =>
            <button
              key={sIdx}
              type="button"
              className={cn([
                s.bottomControlsItem,
                sIdx === activeIndex && s.active,
              ])}
              onClick={() => controlClick(sIdx)}
            />
          )}
        </div>
      }
    </div>
  );
};

const _Slider = memo(Slider);

export {
  _Slider as Slider,
}

import React, { useEffect, useState } from 'react';
import './mobile-app-landing-slider.styl';
import { __, cn } from '@nxplatform/helpers';
import { MobileAppSvg } from '../common/mobile-app-svg';
import { Subscription, timer } from 'rxjs';
import MobileAppLandingSliderItem from './app-landing-slide';
import AppLandingSliderDots from './app-landing-slider-dots';


const slides = [
  {
    id: 1,
    name: 'tournaments',
    title: __('App landing_._Slide_._Tournaments'),
    text: __('App landing_._Slide tournaments_._text'),
    sub: ['1', '2', '3'],
  },
  {
    id: 2,
    name: 'forecasts',
    title: __('App landing_._Slide_._Forecasts'),
    text: __('App landing_._Slide forecasts_._text'),
    sub: ['1'],
  },
  {
    id: 3,
    name: 'bonuses',
    title: __('App landing_._Slide_._Bonuses'),
    text: __('App landing_._Slide bonuses_._text'),
    sub: ['1', '2'],
  },
  {
    id: 4,
    name: 'events',
    title: __('App landing_._Slide_._Events'),
    text: __('App landing_._Slide events_._text'),
    sub: ['1', '2'],
  },
  {
    id: 5,
    name: 'vip',
    title: __('App landing_._Slide_._VIP'),
    text: __('App landing_._Slide vip_._text'),
    sub: ['1', '2'],
  },
]

const MobileAppLandingSlider: React.FC = () => {
  const [slide, goToSlide] = useState(slides[0].id);
  const [prevSlide, setPrevSlide] = useState(-1);
  const [switchInterval, setSwitchInterval] = useState(5000);

  const changeSlide = () => {
    setSwitchInterval(5000);
    setPrevSlide(slide);
    if (slide >= slides.length) {
      goToSlide(1);
    } else {
      goToSlide(slide + 1);
    }
  };

  const onControlClick = (id: number) => {
    setSwitchInterval(10000);
    setPrevSlide(slide);
    goToSlide(id);
  }

  useEffect(() => {
    const subscription = new Subscription();

    subscription.add(
      timer(switchInterval)
      .subscribe(changeSlide),
    );

    return () => subscription.unsubscribe();
  }, [slide]);

  const getState = (id: number): number => {
    if (id === slide) {
      return 1;
    }
    if (id === prevSlide) {
      return 2;
    }
    return 0;
  };

  return (
    <div className="app-land-slider">
      <div className="app-land-slider__inner">
        <h2>
          {__('App landing_._Title_._Extra features')}
        </h2>
        <div className="app-land-slider__slide-text">
          <span>
            {slides[slide - 1].text}
          </span>
        </div>
        <div className="app-land-slider__controls">
          {slides.map((item) => (
            <div
              className={cn([
                'app-land-slider__control',
                item.id === slide && 'app-land-slider__control--active',
              ])}
              key={item.id}
              onClick={() => onControlClick(item.id)}
            >
              <div className="app-land-slider__control-inner">
                <div className="app-land-slider__control-icon">
                  <MobileAppSvg name={item.name} />
                </div>
                <div className="app-land-slider__control-title">
                  <span>
                    {item.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {slides.map((item) => (
          <MobileAppLandingSliderItem
            key={item.id}
            state={getState(item.id)}
            id={item.id}
            name={item.name}
            subImages={item.sub}
          />
        ))}
        <AppLandingSliderDots current={slide} />
      </div>
    </div>
  );
}

export default MobileAppLandingSlider;
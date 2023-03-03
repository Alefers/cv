import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './app-landing-sections.scss';
import { MobAppSection, mobAppSectionsMap } from '../common/mobile-app-common';
import { AppLandingDecorSet } from '../common/app-landing-decor-set';
import AppLandingSectionPhone from './app-landing-section-phone';
import AppLandingSectionIcon from './app-landing-section-icon';
import { cn } from '@repo/helpers';


const AppLandingSections: React.FC = () => {
  const sectionWrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentSection, changeCurrentSection] = useState(MobAppSection.none);
  const [previousSection, changePreviousSection] = useState(MobAppSection.none);
  const [showPreviousFlag, updatePreviousFlag] = useState(false);
  const [changeTo, changeSection] = useState(MobAppSection.none);
  const [sizeCoefficient, updateSizeCoefficient] = useState('1');

  const changeSet = (to: MobAppSection) => {
    changeSection(to);
  }

  const handleScroll = () => {
    if (sectionWrapperRef.current) {
      const { top } = sectionWrapperRef.current.getBoundingClientRect();
      const winHeight = window.innerHeight;
      if (top > (winHeight * 0.7) && currentSection !== MobAppSection.none) {
        changeSet(MobAppSection.none);
        return;
      }
      if (top <= (winHeight * 0.7) && top > (winHeight * (-0.75)) && currentSection !== MobAppSection.coupon) {
        changeSet(MobAppSection.coupon);
        return;
      }
      if (top <= (winHeight * (-0.75)) && top > (winHeight * (-1.5)) && currentSection !== MobAppSection.vip) {
        changeSet(MobAppSection.vip);
        return;
      }
      if (top <= (winHeight * (-1.5)) && currentSection !== MobAppSection.sport) {
        changeSet(MobAppSection.sport);
      }
    }
  };

  useEffect(() => {
    changeCurrentSection(changeTo);
    changePreviousSection(currentSection);

    if (changeTo !== MobAppSection.none) {
      updatePreviousFlag(true);
    }

    const flagTimer = setTimeout(() => updatePreviousFlag(false), 700);

    return () => {
      clearTimeout(flagTimer);
    };
  }, [changeTo])

  const updateSizes = () => {
    if (sectionWrapperRef.current && sectionRef.current) {
      const style = window.getComputedStyle(sectionWrapperRef.current, null).getPropertyValue('font-size');
      const fontSize = parseFloat(style);
      const phoneHeight = 41 * fontSize;

      const sectionHeight = sectionRef.current.clientHeight - 69;

      let coef = '1';

      if (phoneHeight * 1.15 > sectionHeight) {
        const allowedHeight = sectionHeight * 0.85;
        coef = (allowedHeight / phoneHeight).toFixed(2);
      }

      updateSizeCoefficient(coef);
    }
  }

  useLayoutEffect(() => {
    handleScroll();
    updateSizes();
    const sectionObserver = new ResizeObserver(updateSizes);
    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    return () => {
      sectionObserver.disconnect();
    }
  }, [sectionRef.current]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [currentSection]);

  return (
    <div
      className="app-sections"
      ref={sectionWrapperRef}
    >
      <div
        className="app-sections__inner"
        style={{
          fontSize: `${sizeCoefficient}em`,
        }}
      >
        <div
          ref={sectionRef}
          className={cn([
            'app-land-section',
            `app-land-section--current-${currentSection}`,
            showPreviousFlag && `app-land-section--previous-${previousSection}`,
          ])}
        >
          <div className="app-land-section__visual">
            <AppLandingDecorSet />
            {mobAppSectionsMap.map((item) => (
              <div
                key={item.id}
                className={cn([
                  'app-land-section__visual-phone',
                  item.id === currentSection && 'app-land-section__visual-phone--current',
                  showPreviousFlag && item.id === previousSection && 'app-land-section__visual-phone--previous',
                ])}
              >
                <AppLandingSectionPhone
                  name={item.id}
                  mainImage={item.phoneMain}
                  subImages={item.phoneImages}
                />
              </div>
            ))}
          </div>
          <div className="app-land-section__info">
            {mobAppSectionsMap.map((item) => (
              <div
                key={item.id}
                className={cn([
                  'app-land-section__info-inner',
                  item.id === currentSection && 'app-land-section__info-inner--current',
                  showPreviousFlag && item.id === previousSection && 'app-land-section__info-inner--previous',
                ])}
              >
                <h2>
                  {item.title}
                </h2>
                <div className="app-land-section__info-text">
                  <span>
                    {item.text}
                  </span>
                </div>
                <div className="app-land-section__info-icons">
                  {item.icons.map((item) => (
                    <AppLandingSectionIcon item={item} key={item.icon} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLandingSections;
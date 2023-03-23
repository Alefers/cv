import React, {
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { cn, UIModalPortalModifiers } from '@nxplatform/helpers';
import s from './ui-modal-portal.module.scss';
import { SvgIcon, SvgIconType } from '../elements/svg-icon';
import { useUIDHook } from '../hooks/uid.hook';
import { useHandleOnOutsideClickHook } from '../hooks/handle-on-outside-click.hook';
import { useHandleOnEscapeHook } from '../hooks/handle-on-escape.hook';
import { iconsMap } from '@nxplatform/icons';


const runningInstances = {
  count: 0,
};

export const portalActiveClass = 'portal-active';

export enum UIPortalType {
  base = 'base-portal',
  custom = 'custom-portal',
  notice = 'notice-portal',
}

const getContainer = (testId: string, uniqId: number) => {
  const id = `portal-${uniqId}`;
  let portal = document.getElementById(id);
  if (!portal) {
    portal = document.createElement('div');
    portal.setAttribute('id', id);
    portal.setAttribute('data-test', testId);
    document.body.appendChild(portal);
  }
  return portal;
};

const removePortalContainer = (uniqId: number) => {
  const portal = document.getElementById(`portal-${uniqId}`);
  if (portal) {
    portal.remove();
  }
};

interface UIModalPortalProps {
  identifier?: string;
  sectionView?: boolean;
  fullHeight?: boolean;
  offsetForTimeBlock?: boolean;
  children: any;
  portalType?: UIPortalType;
  withShadow?: boolean;
  customClass?: string;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  additionalLayer?: any;
  useAnimation?: boolean;
  isModern?: boolean;
  closeIcon?: SvgIconType;
  onClose?: () => void;
  isBlurModal?: boolean;
}

export const UIModalPortal: React.FC<UIModalPortalProps> = (
  {
    identifier,
    sectionView,
    fullHeight,
    offsetForTimeBlock,
    children,
    portalType = UIPortalType.base,
    withShadow,
    customClass,
    closeOnEscape,
    closeOnOutsideClick,
    additionalLayer = null,
    useAnimation = true,
    isModern,
    closeIcon,
    onClose,
    isBlurModal,
  },
) => {
  const uniqId = useUIDHook();
  const [container, setContainer] = useState(null);
  const [beforeCreate, setCreated] = useState(true);

  useEffect(() => {
    setContainer(getContainer(identifier, uniqId));

    return () => {
      removePortalContainer(uniqId);
    };
  }, [uniqId]);

  const { clickContainerRef } = useHandleOnOutsideClickHook({
    useHook: closeOnOutsideClick,
    onClick: onClose,
  });

  useHandleOnEscapeHook({
    useHook: closeOnEscape,
    onEscape: onClose,
  });

  useLayoutEffect(() => {
    window.dispatchEvent(new Event('scroll'));
    runningInstances.count += 1;
    setCreated(false);
    if (runningInstances.count === 1) {
      document.documentElement.classList.add(portalActiveClass);
    }
    return () => {
      runningInstances.count -= 1;
      if (runningInstances.count === 0) {
        document.documentElement.classList.remove(portalActiveClass);
      }
    };
  }, []);

  return (
    <>
      {!!container && ReactDOM.createPortal(
        <div
          className={cn([
            UIModalPortalModifiers.default,
            s.modal,
            beforeCreate && UIModalPortalModifiers.beforeCreate,
            useAnimation && !sectionView && UIModalPortalModifiers.useAnimation,
            sectionView && UIModalPortalModifiers.sectionView,
            fullHeight && UIModalPortalModifiers.fullHeight,
            offsetForTimeBlock && UIModalPortalModifiers.offsetForTimeBlock,
            withShadow && UIModalPortalModifiers.withShadow,
            isModern && UIModalPortalModifiers.isModern,
            isBlurModal && UIModalPortalModifiers.isBlurModal,
            portalType,
            customClass,
          ])}
        >
          <div className="ui-modal-portal__wrapper">
            <div
              className="ui-modal-portal__content"
              ref={clickContainerRef}
            >
              {!!onClose && (
                <button
                  className="ui-modal-portal__close-button"
                  type="button"
                  onClick={onClose}
                  data-test="modalCloseButton"
                >
                  <SvgIcon icon={closeIcon || iconsMap.SvgClose} />
                </button>
              )}
              {children}
            </div>
          </div>
          {additionalLayer}
        </div>,
        container,
      )}
    </>
  );
};

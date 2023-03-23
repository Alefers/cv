import React from 'react';
import {
  __, cn,
} from '@nxplatform/helpers';
import s from './ui-notification-modal.module.scss';
import { Button } from '../elements/button';
import { SvgIcon, SvgIconType } from '../elements/svg-icon';
import { UIModalPortal, UIPortalType } from './ui-modal-portal';
import { iconsMap } from '@nxplatform/icons';


export const wagerInfoMessage = __('Notification_._Wager Message_._Wager');

export interface UIConfirmationModalProps {
  message: string;
  closeIcon?: SvgIconType;
  noticeIcon?: SvgIconType;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const UIConfirmationModal: React.FC<UIConfirmationModalProps> = (
  {
    message,
    closeIcon,
    noticeIcon,
    onCancel,
    onSuccess,
  },
) => {
  return (
    <UIModalPortal
      identifier="confirmation"
      portalType={UIPortalType.custom}
      closeIcon={closeIcon}
      onClose={onCancel}
    >
      <div
        className={cn([
          s.modal,
          s.notice,
          s.confirmation,
        ])}
      >
        <div className={s.image}>
          <SvgIcon icon={noticeIcon || iconsMap.SvgNotice} />
        </div>
        <div className={s.message}>{__(message)}</div>
        <div className={s.actions}>
          <div className={s.col}>
            <Button
              clickHandler={onSuccess}
              buttonType={{ type: 'button' }}
              text={__('Notification_._Button_._Ok')}
              type={['full', 'default']}
              dataTest="modalSuccessOKButton"
            />
          </div>
          <div className={s.col}>
            <Button
              clickHandler={onCancel}
              buttonType={{ type: 'button' }}
              text={__('Notification_._Button_._Cancel')}
              type={['full', 'secondary']}
              dataTest="modalSuccessCancelButton"
            />
          </div>
        </div>
      </div>
    </UIModalPortal>
  );
};

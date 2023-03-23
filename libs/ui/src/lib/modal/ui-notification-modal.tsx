import React, { memo } from 'react';
import {
  __,
  cn,
  notificationHide,
  NotificationType,
  selectNotificationMessage,
  selectNotificationState,
  selectNotificationType,
  selectNotificationParam,
  NotificationParams,
} from '@nxplatform/helpers';
import { connect } from 'react-redux';
import s from './ui-notification-modal.module.scss';
import { Button, SvgIcon, SvgIconType } from '../elements';
import { UIModalPortal, UIPortalType } from './ui-modal-portal';
import { iconsMap } from '@nxplatform/icons';


const stateClassSet = {
  success: s.success,
  fail: s.fail,
  notice: s.notice,
};

export interface UINotificationModalProps {
  visible: boolean;
  message: string;
  state: NotificationType;
  params: NotificationParams;
  successIcon?: SvgIconType;
  failIcon?: SvgIconType;
  noticeIcon?: SvgIconType;
  closeModal: () => void;
}

const UINotificationModal: React.FC<UINotificationModalProps> = ({
  visible,
  message,
  state,
  params,
  successIcon,
  failIcon,
  noticeIcon,
  closeModal,
}) => {
  const stateIcons = {
    success: successIcon || iconsMap.SvgSuccessMark,
    fail: failIcon || iconsMap.SvgClose,
    notice: noticeIcon || iconsMap.SvgNotice,
  };

  return (
    <>
      {visible && (
        <UIModalPortal
          identifier="notification"
          portalType={UIPortalType.notice}
          onClose={closeModal}
        >
          <div
            className={cn([
              s.modal,
              stateClassSet[state],
            ])}
          >
            <div className={s.image}>
              <SvgIcon icon={stateIcons[state]} />
            </div>
            <div className={s.message}>{__(message, params)}</div>
            <div className={s.actions}>
              <Button
                clickHandler={closeModal}
                buttonType={{ type: 'button' }}
                text={__('Notification_._Button_._Ok')}
                type={['full', 'default']}
                dataTest="modalSuccessOKButton"
              />
            </div>
          </div>
        </UIModalPortal>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  visible: selectNotificationState(state),
  message: selectNotificationMessage(state),
  state: selectNotificationType(state),
  params: selectNotificationParam(state),
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => {
    dispatch(notificationHide());
  },
});

const _UINotificationModal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(UINotificationModal));

export {
  _UINotificationModal as UINotificationModal,
};

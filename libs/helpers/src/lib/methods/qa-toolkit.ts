export const getCookie = (name: string): string | null => {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : null;
};

export interface CookieOptionProps {
  expires?: any;
  path: string;
}

export const setCookie = (name: string, value: string, options = {}) => {
  const cookieOptions: CookieOptionProps = { path: '/', ...options };
  if (cookieOptions.expires && cookieOptions.expires.toUTCString) {
    cookieOptions.expires = cookieOptions.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  )}`;

  for (const optionKey in cookieOptions) {
    if (cookieOptions.hasOwnProperty(optionKey)) {
      updatedCookie += `; ${optionKey}`;
      const optionValue = cookieOptions[optionKey];
      if (optionValue !== true) {
        updatedCookie += `=${optionValue}`;
      }
    }
  }

  document.cookie = updatedCookie;
};

export const deleteCookie = (name: string) => {
  setCookie(name, '', { 'max-age': -1 });
};

export const expireCookie = (value?: number) => {
  const time = value || 15 * 60 * 1000 * 100000;
  return new Date(new Date().getTime() + time);
};

export interface QaToolkit {
  clearAll: () => void;
  activatePgw: () => void;
  removePgw: () => void;
  addBettorsWidget: () => void;
  removeBettorsWidget: () => void;
  switchBetTournamentTo: (id: number) => void;
  switchBetTournamentToNormal: () => void;
  addCPResetAt: (dateToCheck: string) => void;
  enableCentrifuge: () => void;
  disableCentrifuge: () => void;
  enablePaymentMethodsHook: () => void;
  disablePaymentMethodsHook: () => void;
  removeCPResetAt: () => void;
  setCustomerCountry: (userCountry: string) => void;
  removeCustomerCountry: () => void;
  activateNewCoupon: () => void;
  disableNewCoupon: () => void;
  enableSmartId: () => void;
  removeSmartId: () => void;
  crash:() => void;
  enablePaymentIQPage:() => void;
  disablePaymentIQPage:() => void;
}

declare global {
  interface Window {
    qaToolkit: QaToolkit;
  }
}

export enum QaToolkitOption {
  pgw = 'pgw',
  paymentMethodsHook = 'paymentMethodsHook',
  bettors = 'bettors',
  betTournament = 'betTournament',
  webSocket = 'websocket',
  cpResetTime = 'cpResetTime',
  activeCustomerCookie = 'activeCustomerCookie',
  newBetslip = 'newBetslip',
  smartId = 'smartId',
  paymentIQPage = 'paymentIQPage',
}

const optionsToClear = [
  QaToolkitOption.pgw,
  QaToolkitOption.bettors,
  QaToolkitOption.betTournament,
  QaToolkitOption.cpResetTime,
  QaToolkitOption.newBetslip,
  QaToolkitOption.smartId,
  QaToolkitOption.paymentIQPage,
];

const optionLoad = {
  [QaToolkitOption.cpResetTime]: (resetDate, props: SelectByQAToolkitProps) =>
    resetDate || props.realValue,
};

interface SelectByQAToolkitProps {
  option: QaToolkitOption;
  realValue?: any;
}

export const selectByQAToolkit = (props: SelectByQAToolkitProps) => {
  const optionValue = getCookie(props.option);
  if (optionValue) {
    return optionLoad[props.option]
      ? optionLoad[props.option](optionValue, props)
      : optionValue;
  }
  return props.realValue;
};

export const initQAToolKit = (): void => {
  console.groupCollapsed(
    'QA Toolkit: use window.qaToolkit to get next options:',
  );
  console.info('clearAll(): Clear all changed options');
  console.info('activatePgw(): Activate Pgw');
  console.info('removePgw(): Remove Pgw');
  console.info('addBettorsWidget(): Add bettors widget');
  console.info('removeBettorsWidget(): Remove bettors widget');
  console.info(
    'switchBetTournamentTo(id: number): Switch to current bet tournament, if it exists',
  );
  console.info(
    'switchBetTournamentToNormal(): Remove lock on selected tournament',
  );
  console.info(
    'addCPResetAt(date: string): change CP reset time to entered date',
  );
  console.info('removeCPResetAt(): Clear fixed CP reset time');
  console.info('enableCentrifuge(): enable WebSockets');
  console.info('disableCentrifuge(): disable WebSockets');
  console.info('activateNewCoupon(): Enable new betslip/coupon');
  console.info('disableNewCoupon(): Disable new betslip/coupon');
  console.info('enableSmartId(): Enable SmartID/MobileID authentification');
  console.info('removeSmartId(): Remove SmartID/MobileID authentification');
  console.info('enablePaymentIQPage(): Enable PaymentIQ deposit page');
  console.info('disablePaymentIQPage(): Remove PaymentIQ deposit page');
  console.groupEnd();

  window.qaToolkit = {
    clearAll: () => {
      optionsToClear.forEach((option) => deleteCookie(option));
    },


    crash: () => {
      // @ts-ignore
      window.crashActivates = true;
    },

    enableCentrifuge: () => {
      setCookie(QaToolkitOption.webSocket, 'true', { expires: expireCookie() });
    },

    disableCentrifuge: () => {
      setCookie(QaToolkitOption.webSocket, 'false', { expires: expireCookie() });
    },

    activatePgw: () => {
      setCookie(QaToolkitOption.pgw, 'true', { expires: expireCookie() });
    },
    removePgw: () => {
      setCookie(QaToolkitOption.pgw, 'false', { expires: expireCookie() });
    },

    enablePaymentMethodsHook: () => {
      setCookie(QaToolkitOption.paymentMethodsHook, 'true', { expires: expireCookie() });
    },
    disablePaymentMethodsHook: () => {
      deleteCookie(QaToolkitOption.paymentMethodsHook);
    },

    addBettorsWidget: () => {
      setCookie(QaToolkitOption.bettors, 'true', { expires: expireCookie() });
    },
    removeBettorsWidget: () => {
      deleteCookie(QaToolkitOption.bettors);
    },

    switchBetTournamentTo: (id) => {
      setCookie(QaToolkitOption.betTournament, `${id}`, {
        expires: expireCookie(),
      });
    },
    switchBetTournamentToNormal: () => {
      deleteCookie(QaToolkitOption.betTournament);
    },

    addCPResetAt: (dateToCheck: string) => {
      setCookie(QaToolkitOption.cpResetTime, dateToCheck, {
        expires: expireCookie(),
      });
    },
    removeCPResetAt: () => {
      deleteCookie(QaToolkitOption.cpResetTime);
    },
    setCustomerCountry: (userCountry: string) => {
      setCookie(
        QaToolkitOption.activeCustomerCookie,
        JSON.stringify({
          country: userCountry,
        }),
      );
      console.info('Reload webpage to proceed');
    },
    removeCustomerCountry: () => {
      deleteCookie(QaToolkitOption.activeCustomerCookie);
      console.info('Reload webpage to proceed');
    },
    activateNewCoupon: () => {
      setCookie(QaToolkitOption.newBetslip, 'true', { expires: expireCookie() });
    },
    disableNewCoupon: () => {
      deleteCookie(QaToolkitOption.newBetslip);
    },
    enableSmartId: () => {
      setCookie(QaToolkitOption.smartId, 'true', { expires: expireCookie() });
    },
    removeSmartId: () => {
      deleteCookie(QaToolkitOption.smartId);
    },
    enablePaymentIQPage: () => {
      setCookie(QaToolkitOption.paymentIQPage, 'true', { expires: expireCookie() });
    },
    disablePaymentIQPage: () => {
      deleteCookie(QaToolkitOption.paymentIQPage);
    }
  };
};

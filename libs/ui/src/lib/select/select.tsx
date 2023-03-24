import React, {
  memo, ReactNode, useEffect, useRef, useState,
} from 'react';
import {
  __,
  cn,
  getIsMobile,
  searchByString,
  SVGIcons,
} from '@nxplatform/helpers';
import { fromEvent, of, Subscription } from 'rxjs';
import {
  distinctUntilChanged, filter, mapTo, switchMap,
} from 'rxjs/operators';
import { selectImageCdn } from '@nxplatform/platform-settings';
import { connect } from 'react-redux';
import { bodyClassToggler } from '../hooks/body-class.hook';
import { NotFound } from './not-found';
import { SvgIcon, SvgIconType } from './svg-icon';
import { UIModalPortal, UIPortalType } from '../modals/ui-modal-portal';
import { SelectSearchInput } from './select-search-input';
import { iconsMap } from '@nxplatform/icons';


export const flagUISelectTemplate = ({ item, imageCdn }) => {
  const countryName = item.flagId.toString().toLowerCase();
  return (
    <>
      <div className="ui-select__list-item-icon ui-select__list-item-icon--flag">
        <div
          className="ui-select__flag"
        >
          <img src={`${imageCdn}/flags/${countryName}.svg`} alt={item.flagId} />
        </div>
      </div>
      <div className="ui-select__list-item-text">{item.text}</div>
    </>
  );
};

export const currencyUISelectTemplate = ({ item }) => (
  <>
    <div className="ui-select__list-item-icon ui-select__list-item-icon--currency">
      {item.id}
    </div>
    <div className="ui-select__list-item-text">{item.name || item.text}</div>
  </>
);

export const provinceUISelectTemplate = ({ item }) => (
  <div className="ui-select__list-item-text">{item.name || item.text}</div>
);

export const desktopCurrencyUISelectTemplate = ({ item }) => (
  <div className="ui-select__currency-item">
    <div className="ui-select__currency-item-name">
      {item.name}
      &nbsp;(
      {item.icon}
      )
    </div>
    <div className="ui-select__currency-item-code">{item.id}</div>
  </div>
);

interface DropdownWrapperProps {
  children: any;
  closeIcon?: SvgIconType;
}

const DropdownWrapper: React.FC<DropdownWrapperProps> = (
  {
    children,
    closeIcon,
  },
) => {
  const isMobile = getIsMobile();

  return (
    <>
      {isMobile && (
        <UIModalPortal
          identifier="ui-select"
          sectionView
          portalType={UIPortalType.custom}
          closeIcon={closeIcon}
        >
          {children}
        </UIModalPortal>
      )}
      {!isMobile && children}
    </>
  );
};

const bodyClassOpen = 'ui-select-open';

/**
 * UISelect item
 * @param id unique identifier of the item
 * @param valueText value of the returned item
 * @param text displayed text of the item
 * @param name displayed text of the item
 * @param disabled specifies if this item is disabled and cannot be selected
 * @param icon the icon to display for this item
 */

export type UISelectModifiers = 'small';

export interface UiSelectItem {
  id?: string | number;
  valueText?: string;
  text?: string;
  name?: string;
  disabled?: boolean;
  icon?: string | ReactNode;
}

export interface UISelectProps {
  selected?: string | number;
  items: UiSelectItem[];
  searchable?: boolean;
  strict?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  error?: boolean;
  icon?: SVGIcons;
  closeIcon?: SvgIconType;
  arrowIcon?: SvgIconType;
  template?: React.ComponentType<any>;
  useTemplateForSelected?: boolean;
  disabled?: boolean;
  dataTest?: string;
  searchDataTest?: string;
  imageCdn: string;
  modifiers?: UISelectModifiers[];
  onChange: (item: UiSelectItem) => void;
  openedChanged?: (state: boolean) => void;
  notFoundHandler?: (state: boolean) => void;
  onSearch?: (search: string) => void;
  isModern?: boolean,
}

// P.S - This is form select, not a swiss knife.
// Do not extend this component until it becomes useless!

const Select = ({
  selected,
  items,
  searchable,
  strict,
  placeholder = '',
  searchPlaceholder = '',
  error,
  icon = null,
  closeIcon,
  arrowIcon,
  template = null,
  useTemplateForSelected,
  disabled,
  dataTest,
  searchDataTest = '',
  imageCdn,
  modifiers = [],
  onChange,
  openedChanged,
  notFoundHandler,
  onSearch,
  isModern,
}: UISelectProps) => {
  const selectRef = useRef(null);
  const [isOpen, toggleOpen] = useState(null);
  const [hasError, setError] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [itemsList, updateList] = useState([]);

  const isMobile = getIsMobile();

  bodyClassToggler({
    triggerer: [isOpen],
    className: bodyClassOpen,
    htmlClassName: bodyClassOpen,
  });

  const activeItem = (items || [])
    .find((item) => `${item.id}`.toLowerCase() === `${selected}`.toLowerCase());

  useEffect(() => updateList(items), [items]);

  useEffect(() => {
    const subscription = new Subscription();
    subscription.add(
      of(search)
        .pipe(
          distinctUntilChanged(),
          switchMap((inputValue: string) => (inputValue
            ? of(
              updateList(
                items.filter((item) => searchByString(
                  [item.text || item.name, item.name || item.text],
                  inputValue,
                  !!strict,
                )),
              ),
            ).pipe(mapTo(inputValue))
            : of(updateList(items)).pipe(mapTo(inputValue)))),
        )
        .subscribe((data) => {
          if (onSearch) {
            onSearch(data);
          }
        }),
    );
    return () => subscription.unsubscribe();
  }, [search, onSearch]);

  useEffect(() => {
    const subscription = new Subscription();
    if (!isMobile && isOpen && selectRef.current) {
      subscription.add(
        fromEvent(document, 'click')
          .pipe(filter((event) => !selectRef.current.contains(event.target)))
          .subscribe(() => toggleOpen(false)),
      );
      subscription.add(
        fromEvent(document, 'keydown')
          .pipe(
            filter(
              (event: KeyboardEvent) => event.key === 'Enter' || event.key === 'Escape',
            ),
          )
          .subscribe((event) => (event.key === 'Enter' ? setActiveItem(event) : toggleOpen(false))),
      );
    }
    return () => subscription.unsubscribe();
  }, [isOpen, itemsList, selectRef.current]);

  useEffect(() => {
    if (!itemsList.length && notFoundHandler && search.length) {
      notFoundHandler(true);
    }
    return () => {
      if (notFoundHandler) {
        notFoundHandler(false);
      }
    };
  }, [itemsList, searchable, notFoundHandler, search]);

  const changeItem = (item) => {
    if (!disabled && item) {
      onChange(item);
      toggleOpen(false);
    }
  };

  const setActiveItem = (event: KeyboardEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    changeItem(itemsList[0]);
  };

  useEffect(() => {
    if (openedChanged) {
      openedChanged(isOpen);
    }
    if (!isOpen) {
      setSearch('');
    }
  }, [isOpen]);

  useEffect(() => {
    setError(typeof error === 'boolean' ? error : false);
  }, [error]);

  const onOuterClick = () => {
    if (disabled) {
      return;
    }
    toggleOpen(searchable ? true : !isOpen);
  };

  const placeholderForSearch = searchPlaceholder
    || placeholder
    || __('Default_._Form_._Search')
    || '';

  const useActiveTemplate = template && activeItem && useTemplateForSelected;

  return (
    <div
      className={cn([
        'ui-select',
        isOpen && 'ui-select--open',
        disabled && 'ui-select--disabled',
        hasError && 'ui-select--error',
        searchable && 'ui-select--searchable',
        modifiers.includes('small') && 'ui-select--small',
      ])}
      ref={selectRef}
    >
      <div
        className={cn([
          'ui-select__outer',
          icon && 'ui-select__outer--icon',
          activeItem && 'ui-select__outer--selected',
          isModern && 'ui-select__outer--modern',
        ])}
        onClick={onOuterClick}
        data-test={dataTest}
      >
        {!!useActiveTemplate && React.createElement(template, { item: activeItem, imageCdn })}
        {!useActiveTemplate && (
          <>
            {icon && (
              <div className="ui-select__outer-icon" data-test="select-icon">
                <SvgIcon name={icon} />
              </div>
            )}
            <div className="ui-select__outer-text" data-test="selected-item-text">
              {activeItem
                ? activeItem.valueText || activeItem.text || activeItem.name
                : placeholder}
            </div>
          </>
        )}
        {!disabled && (
          <div className="ui-select__outer-arrow">
            <SvgIcon icon={arrowIcon || iconsMap.BaseArrow} />
          </div>
        )}
      </div>

      {!disabled && isOpen && !isMobile && searchable && (
        <SelectSearchInput
          value={search}
          focusOnOpen
          placeholder={placeholderForSearch}
          setSearch={setSearch}
          searchDataTest={searchDataTest}
          isModern={isModern}
        />
      )}

      {!disabled && isOpen && (
        <DropdownWrapper
          closeIcon={closeIcon}
        >
          {isMobile && searchable && (
            <SelectSearchInput
              value={search}
              placeholder={placeholderForSearch}
              setSearch={setSearch}
              searchDataTest={searchDataTest}
              onToggle={() => toggleOpen(false)}
            />
          )}
          <div
            className={
            cn([
              'ui-select__inner',
              modifiers.includes('small') && 'ui-select__inner--small',
            ])
          }
            data-test="select-items"
          >
            {itemsList.length > 0 && (
              <div className="ui-select__list" role="list">
                {itemsList.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => changeItem(item)}
                    role="listitem"
                    className={cn([
                      'ui-select__list-item',
                      selected === item.id && 'ui-select__list-item--active',
                    ])}
                  >
                    {template
                      ? React.createElement(template, { item, imageCdn })
                      : item.name || item.text}
                  </div>
                ))}
              </div>
            )}
            {!itemsList.length && isMobile && (
              <NotFound
                text={__('Select_._Not Found_._No results for your search.')}
              />
            )}
          </div>
        </DropdownWrapper>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  imageCdn: selectImageCdn(state),
});

export const UISelect = connect(mapStateToProps)(memo(Select));

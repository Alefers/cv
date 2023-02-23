import React from 'react';


// While waiting for useId react hook, using this
type IdSourceType = {
  value: number,
}

const createSource = (): IdSourceType => ({
  value: 1,
});

const counter = createSource();

const source = React.createContext(createSource());

const getId = (source: IdSourceType) => source.value++;

const generateUID = (context: IdSourceType) => {
  const quartz = context || counter;
  return getId(quartz);
};

const useUIDState = () => {
  return React.useState(generateUID(React.useContext(source)))
};

export const useUIDHook = (): number => {
  const [uid] = useUIDState();
  return uid;
};
